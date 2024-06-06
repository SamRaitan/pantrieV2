const express = require('express');
const { handleSignin } = require('../logic/index');
const router = express.Router();
const { maxAge } = require('../../../utils/JWT')


router.get('/signin', (req, res) => {
  res.status(318).json({ 'data': 'success' });
});

router.get('/logout', (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 })
  res.status(200).redirect('/');
})

router.post('/signin', async (req, res) => {
  const { userOrEmail, password } = req.body;
  const result = await handleSignin(userOrEmail, password);

  if (result.error) {
    return res.status(401).json({ error: result.error });
  }

  const { cookie, token, user } = result;

  res.cookie('STAGE', cookie, { maxAge: maxAge * 1000 })
  res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
  res.status(200).json({ cookie, user });
});


module.exports = router;
