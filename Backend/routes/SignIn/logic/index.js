const User = require('../../../models/user');
const { createToken } = require('../../../utils/JWT')


const findUser = async (userOrEmail) => {
    return await User.findOne({ $or: [{ email: userOrEmail }, { username: userOrEmail }] });
};

const checkPassword = (providedPassword, storedPassword) => {
    return providedPassword === storedPassword;
};

const handleSignin = async (userOrEmail, password) => {
    try {
        const user = await findUser(userOrEmail);

        if (!user) {
            return { error: 'No user found' };
        }

        if (!checkPassword(password, user.password)) {
            return { error: 'Username or Password incorrect' };
        }

        // Log in successfully
        return { cookie: createToken(user.username), token: createToken(user._id), user: user.toJSON() };
    } catch (error) {
        console.error('signin error:', error);
        return { error: 'Internal server error' };
    }
};


module.exports = { handleSignin };
