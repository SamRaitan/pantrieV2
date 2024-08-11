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
    const { title, ingredients, steps, description, image, prepTime, cookTime, servings, dishType, cuisine, visibility } = req.body;
    const image2 = req.file;

    // Parse ingredients and steps back into arrays
    const parsedIngredients = JSON.parse(ingredients);
    const parsedSteps = JSON.parse(steps);

    console.log(parsedIngredients);

    // Get user information
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, process.env.COOKIE_SALT);
    const user = await User.findById(decodedToken.id);

    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // Create recipe
    const post = new Recipe({
      uploader_id: user._id,
      uploader_un: user.username,
      title,
      image,
      cloudinary_image: result.secure_url,
      cloudinary_id: result.public_id,
      ingredients: parsedIngredients,
      steps: parsedSteps,
      description,
      prepTime,
      cookTime,
      servings,
      dishType,
      cuisine,
      visibility
    });

    console.log(post);

    // Increment user's postsCount
    await User.findByIdAndUpdate(user._id, { $inc: { postsCount: 1 } });

    // Save recipe
    await post.save();
    res.status(200).json({ 'data': 'success' });
  } catch (err) {
    res.status(500).json({ 'error': err.message });
  }
});

// Get all posts
router.get('/posts', async (req, res) => {
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
    res.json({ 'data': result });
  } catch (err) {
    res.status(500).json({ 'error': err.message });
    console.log(err);
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
    const post = await Recipe.findById(postId);

    if (post.likes.includes(userId)) {
      await Recipe.findByIdAndUpdate(postId, { $pull: { likes: userId }, $inc: { likesCount: -1 } });
      await User.findByIdAndUpdate(userId, { $pull: { likedPosts: postId } });
    }
    res.json({ 'data': 'unliked' });
  } catch (err) {
    res.status(500).json({ 'error': err.message });
  }
});

module.exports = router;
