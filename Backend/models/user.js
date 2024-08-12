const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')

const userSchema = new Schema({

  username: {
    type: String,
    required: true,
    unique: [true, 'this username has already been  taken'],
    match: /^[a-zA-Z0-9_]+$/
  },
  email: {
    type: String,
    required: true,
    unique: [true, 'this email is already in use'],
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [8, 'password must contain at least 8 chracters']
  },
  fullName: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  cloudinary_id: {
    type: String,
  },
  likedRecipes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe'
  }],
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  followingCount: {
    type: Number,
    default: 0
  },
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  followersCount: {
    type: Number,
    default: 0
  },
  RecipeCount: {
    type: Number,
    default: 0
  },
  blockedUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdRecipes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe'
  }],


}, { timestamps: true });

// blogSchemaUser.pre('save', async function (next) {
//   const salt = await bcrypt.genSalt()
//   this.password = await bcrypt.hash(this.password, salt)
//   next();
// });

// userSchema.pre('save', function(next) {
//   this.username = `@${this.username}`; 
//   next();
// });

// this saves the user with @ 
userSchema.pre('save', function (next) {
  if (this.username.charAt(0) != '@') {
    this.username = `@${this.username}`;
  }
  next();
});

const User = mongoose.model('user', userSchema);
module.exports = User;