const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({

  uploader: {
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
  foodType: {
    type: String,
    enum: ['Main', 'Appetizer', 'Side', 'Dessert', 'Beverage', 'Kids'],
    required: true
  },
  cuisine: {
    type: String,
    enum: ['Japanese', 'Italian', 'French', 'Israeli', 'American', 'Chinese', 'Moroccan'],
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