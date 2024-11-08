const express = require('express');
const router = express.Router();
const multer = require('multer');
const Recipe = require('../../models/recipe');
const { isLoggedIn } = require('../../middleware/Authmiddleware');
const getSearchQuery = require('./discover')
const User = require('../../models/user');
const cloudinary = require('../../utils/cloudinary');
const upload = require('../../utils/multer');
const jwt = require('jsonwebtoken');

router.post('/create', isLoggedIn, upload.single('image'), async (req, res) => {
  try {
    const { title, ingredients, steps, description, image, prepTime, cookTime, servings, dishType, cuisine, visibility } = req.body;

    const parsedIngredients = JSON.parse(ingredients);
    const parsedSteps = JSON.parse(steps);

    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, process.env.COOKIE_SALT);
    const user = await User.findById(decodedToken.id);

    const result = await cloudinary.uploader.upload(req.file.path);
    const recipe = new Recipe({
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
    await User.findByIdAndUpdate(user._id, { $push: { createdRecipes: recipe }, $inc: { RecipeCount: 1 } }, { new: true });
    await recipe.save();

    res.status(200).json({ 'data': 'success' });
  } catch (err) {
    res.status(500).json({ 'error': err.message });
  }
});

router.get('/posts', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const recipes = await Recipe.find().limit(limit);
    res.json({ data: recipes });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching posts', error: err });
  }
});

router.get('/discover', getSearchQuery)

router.get('/posts/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Recipe.findById(id);
    res.json({ 'data': result });
  } catch (err) {
    res.status(500).json({ 'error': err.message });
    console.log(err);
  }
});

router.put('/posts/:id/edit', isLoggedIn, upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, ingredients, steps, cookTime, prepTime, visibility } = req.body;

    console.log(title);

    const parsedIngredients = JSON.parse(ingredients);
    const parsedSteps = JSON.parse(steps);

    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    let updatedRecipeData = {
      title,
      description,
      ingredients: parsedIngredients,
      steps: parsedSteps,
      cookTime,
      prepTime,
      visibility
    };

    if (req.file) {
      // Delete old image from Cloudinary
      if (recipe.cloudinary_id) {
        await cloudinary.uploader.destroy(recipe.cloudinary_id);
      }
      const result = await cloudinary.uploader.upload(req.file.path);

      updatedRecipeData.cloudinary_image = result.secure_url;
      updatedRecipeData.cloudinary_id = result.public_id;
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      id,
      { $set: updatedRecipeData },
      { new: true }
    );

    res.status(200).json({ data: 'Recipe updated successfully', updatedRecipe });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/posts/:postId/delete', async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Recipe.findById(postId);
    await cloudinary.uploader.destroy(post.cloudinary_id);
    await User.findByIdAndUpdate(post.uploader, { $inc: { postsCount: -1 } });
    await Recipe.deleteOne({ '_id': postId });
    res.status(200).json({ 'data': 'deleted' });
  } catch (err) {
    res.status(500).json({ 'error': err.message });
  }
});

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

router.post('/posts/:postId/rating', async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId, rating } = req.body;

    const post = await Recipe.findById(postId);
    const hasRated = post.ratings.some(rating => rating.userId.equals(userId));

    if (!hasRated) {
      await Recipe.findByIdAndUpdate(postId, { $push: { ratings: { userId, rating: rating } }, $inc: { ratingCount: 1 } }, { new: true });
      await User.findByIdAndUpdate(userId, { $push: { ratings: { postId, rating: rating } } }, { new: true });
    } else {
      await Recipe.findOneAndUpdate({ _id: postId, "ratings.userId": userId }, { $set: { "ratings.$.rating": rating }, }, { new: true });
      await User.findOneAndUpdate({ _id: userId, "ratings.postId": postId }, { $set: { "ratings.$.rating": rating }, }, { new: true });
    }

    const recipe = await Recipe.findById(postId);
    const totalRating = recipe.ratings.reduce((sumOfRatings, currentRate) =>
      sumOfRatings + currentRate.rating, 0
    );
    const averageRating = totalRating / recipe.ratings.length;
    console.log(totalRating, averageRating);

    await Recipe.findByIdAndUpdate(
      postId,
      { $set: { averageRating: averageRating } },
      { new: true }
    );

    res.json({ 'data': 'rated' });
  } catch (err) {
    res.status(500).json({ 'error': err.message });
  }
});


module.exports = router;
