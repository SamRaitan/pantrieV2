const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const SignUp = require('./routes/SignUp/endpoints/signUp');
const SignIn = require('./routes/SignIn/endpoints/signIn');
const Profile = require('./routes/Profile/profile');
const Recipes = require('./routes/Recipes/recipes')
const RecipePost = require('./models/recipe');
const User = require('./models/user');
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const { isLoggedIn, userInfo } = require('./middleware/Authmiddleware');
const cloudinary = require("./utils/cloudinary");
const upload = require("./utils/multer");

// express app
const app = express();

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser())

// connect to mongodb & listen for requests
const dbURL = process.env.DB_URL;
const PORT = process.env.BACKEND_PORT

mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    app.listen(PORT)
    console.log(`--------------> http://localhost:${PORT}/ <---------------`);
  })
  .catch(err => console.log(err));

// register view engine
app.set('view engine', 'ejs');

app.get('*', userInfo)

app.post('*', userInfo)

app.delete('*', userInfo)

app.put('*', userInfo)

// app.get('/', async (req, res) => {
//   res.redirect('/post');
// });

app.get('/', (req, res) => {
  RecipePost.find().sort({ createdAt: -1 })
    .then(result => {
      res.json({ 'data': result });
    })
    .catch(err => {
      res.json({ 'data': err })
      console.log(err);
    });
})

app.get('/about', (req, res) => {
  res.json({ 'data': 'this is the about page' })
})

app.use(SignUp)

app.use(SignIn)

app.use(Profile)

app.use(Recipes)

// // 404 page
// app.use((req, res) => {
//   res.status(404).render('404', { title: '404' });
// });














