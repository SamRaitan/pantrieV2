const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cuisines = require('../utils/cuisineList')
const foodTypes = require('../utils/foodType')

const recipeSchema = new Schema({

  uploader_id: {
    type: String,
    require: true,
  },
  uploader_un: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  cloudinary_image: {
    type: String,
  },
  cloudinary_id: {
    type: String,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  steps: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  prepTime: {
    type: String,
    required: true
  },
  cookTime: {
    type: String,
    required: true
  },
  servings: {
    type: String,
    required: true
  },
  dishType: {
    type: String,
    enum: foodTypes,
    required: true
  },
  cuisine: {
    type: String,
    enum: cuisines,
    required: true
  },
  visibility: {
    type: String,
    enum: ['Public', 'Private', 'Unlisted'],
    required: true
  },
  likesCount: {
    type: Number,
    default: 0
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],

}, { timestamps: true });

const Recipe = mongoose.model('recipe', recipeSchema);
module.exports = Recipe;