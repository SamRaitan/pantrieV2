const express = require('express');
const router = express.Router();
const multer = require('multer');
const Recipe = require('../../models/recipe');
const { isLoggedIn } = require('../../middleware/Authmiddleware');
const User = require('../../models/user');
const cloudinary = require('../../utils/cloudinary');
const upload = require('../../utils/multer');
const jwt = require('jsonwebtoken');

// Create a recipe
router.post('/create', isLoggedIn, upload.single('image'), async (req, res) => {
  try {
    const { title, ingredient, steps, description, prepNumber, prepTime, cookNumber, cookTime, servings, type, cuisine, visibility } = req.body;
    const image = req.file;

    // Get user information
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, 'this is the secret hash code');
    const user = await User.findById(decodedToken.id);

    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    const cookingTime = `${cookNumber} ${cookTime}`;
    const prepingTime = `${prepNumber} ${prepTime}`;

    // Create recipe
    const post = new Recipe({
      uploader: user.username,
      title,
      image: result.secure_url,
      cloudinary_id: result.public_id,
      ingredients: ingredient,
      steps,
      description,
      prepTime: prepingTime,
      cookTime: cookingTime,
      servings,
      foodType: type,
      cuisine,
      visibility
    });

    // Increment user's postsCount
    await User.findByIdAndUpdate(user._id, { $inc: { postsCount: 1 } });

    // Save recipe
    await post.save();
    res.json({ 'data': 'recipe saved' });
  } catch (err) {
    res.status(500).json({ 'error': err.message });
  }
});

// Get all posts
router.get('/post', async (req, res) => {
  try {
    const result = await Recipe.find().sort({ createdAt: -1 });
    res.json({ 'data': result });
  } catch (err) {
    res.status(500).json({ 'error': err.message });
  }
});

// Get post details
router.get('/posts/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Recipe.findById(id);
    const userResult = await User.findOne({ username: result.uploader });
    res.json({ 'data': { 'post': result, 'visitedUser': userResult } });
  } catch (err) {
    res.status(500).json({ 'error': err.message });
  }
});

// Delete a post
router.delete('/posts/:postId/delete', async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Recipe.findById(postId);
    await cloudinary.uploader.destroy(post.cloudinary_id);
    await User.findByIdAndUpdate(post.uploader, { $inc: { postsCount: -1 } });
    await Recipe.deleteOne({ '_id': postId });
    res.json({ 'data': 'deleted' });
  } catch (err) {
    res.status(500).json({ 'error': err.message });
  }
});

// Like a post
router.post('/posts/:postId/like', async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;
    const post = await Recipe.findById(postId);
    if (!post.likes.includes(userId)) {
      await Recipe.findByIdAndUpdate(postId, { $push: { likes: userId }, $inc: { likesCount: 1 } });
      await User.findByIdAndUpdate(userId, { $push: { likedPosts: postId } });
    }
    res.json({ 'data': 'liked' });
  } catch (err) {
    res.status(500).json({ 'error': err.message });
  }
});

// Unlike a post
router.post('/posts/:postId/unlike', async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;
    await Recipe.findByIdAndUpdate(postId, { $pull: { likes: userId }, $inc: { likesCount: -1 } });
    await User.findByIdAndUpdate(userId, { $pull: { likedPosts: postId } });
    res.json({ 'data': 'unliked' });
  } catch (err) {
    res.status(500).json({ 'error': err.message });
  }
});

module.exports = router;
