const jwt = require('jsonwebtoken')
const User = require('../models/user');


// check the users exist & check their tokens for private routes
const isLoggedIn = (req, res, next) => {

    const token = req.cookies.jwt;

    // check json web token if exists & verified
    if (token) {
        jwt.verify(token, process.env.COOKIE_SALT, (err, decodedToken) => {
            if (err) {
                console.log(err.message)
                res.redirect('signin')
            } else {
                console.log(decodedToken)
                next();
            }
        })
    } else {
        res.redirect('signin')
    }
}

// checking for user and getting user info
const userInfo = (req, res, next) => {

    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, process.env.COOKIE_SALT, async (err, decodedToken) => {
            if (err) {
                console.log(err.message)
                res.locals.user = null
                next()
            } else {
                let user = await User.findById(decodedToken.id)
                res.locals.user = user
                next();
            }
        })
    } else {
        res.locals.user = null
        next()
    }
}



module.exports = { isLoggedIn, userInfo }