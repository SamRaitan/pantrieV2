const jwt = require('jsonwebtoken');

// max age for the cookie and token
const maxAge = process.env.COOKIE_MAX_AGE * 24 * 60 * 60;

// creating jwt tokens 
const createToken = (id) => {
    return jwt.sign({ id }, process.env.COOKIE_SALT, {
        expiresIn: maxAge
    });
};

module.exports = {
    createToken,
    maxAge
};
