const express = require('express');
const router = express.Router();
const validateInput = require('../validation/checkSignUp');
const signUp = require('../logic/index');
const upload = require("../../../utils/multer");


router.get('/signup', (req, res) => {
  res.json({ 'data': 'changed successfully' })
});

router.post("/signup", upload.single("image"), validateInput, signUp);


module.exports = router;


















