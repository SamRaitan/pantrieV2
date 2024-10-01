const User = require('../../../models/user');
const { createToken, maxAge } = require('../../../utils/JWT');
const cloudinary = require("../../../utils/cloudinary");

const checkExistingUser = async (username, email) => {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    return existingUser;
};

const checkPasswordCriteria = (password, username) => {
    const errors = {};
    if (password.length <= 7) {
        errors.password = 'Password must contain 8 characters or more';
    }
    if (!username.match(/^[a-zA-Z0-9_]+$/)) {
        errors.username = 'Username must consist of letters, numbers, and underscores only';
    }
    return errors;
};

const uploadImageToCloudinary = async (file) => {
    if (!file) return { avatar: null, cloudinary_id: null };

    const result = await cloudinary.uploader.upload(file.path);
    return { avatar: result.secure_url, cloudinary_id: result.public_id };
};

const signup = async (req, res) => {
    try {
        const { username, email, password, image, fullName, bio, region, dateOfBirth } = req.body;
        const file = req.file;

        const existingUser = await checkExistingUser(username, email);
        if (existingUser) {
            return res.status(400).json({ errors: { username: 'Username or email already exists' } });
        }

        const passwordErrors = checkPasswordCriteria(password, username);
        if (Object.keys(passwordErrors).length !== 0) {
            return res.status(400).json({ errors: passwordErrors });
        }

        const { avatar, cloudinary_id } = await uploadImageToCloudinary(file);

        const user = new User({
            username,
            email,
            password,
            fullName,
            bio,
            region,
            dateOfBirth,
            image,
            avatar,
            cloudinary_id
        });
        await user.save();

        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.json({ message: 'Sign-Up Successful' });
    } catch (err) {
        console.error(err);
        if (err.code === 11000 && err.keyPattern && err.keyPattern.username) {
            return res.status(400).json({ errors: { username: 'Username already taken' } });
        }

        res.cookie('STAGE', cookie, { maxAge: maxAge * 1000 });
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(500).json({ message: 'Internal server error' });
    }
};



module.exports = signup;
