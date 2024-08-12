const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const Recipe = require('../../models/recipe');
const cloudinary = require("../../utils/cloudinary");
const upload = require("../../utils/multer");

//the users profile only
router.get('/profile/:url', (req, res) => {

    //checking the cookie to see the user id of signed in user
    const token = req.cookies.jwt;
    jwt.verify(token, process.env.COOKIE_SALT, async (err, decodedToken) => {
        let user = await User.findById(decodedToken.id)
        // checking for all users posts 
        if (user) {
            Recipe.find({ 'uploader': user.username }).sort({ createdAt: -1 })
                .then(result => {
                    res.json({ 'data': result });
                })
        }
    })
})

// the profile of any other user
router.get('/userProfile/:username', (req, res) => {

    let { username } = req.params;
    console.log(username);
    // getting the user of the clicked post
    User.findOne({ 'username': username })
        .then(userResults => {
            // getting all the posts of the clickeed user
            Recipe.find({ 'uploader_un': username }).sort({ createdAt: -1 })
                .then(recipeResult => {
                    res.json({
                        'data': {
                            'Recipes': recipeResult,
                            'User': userResults
                        }
                    })
                })
        })
})

// deleteing profile image 
router.delete('/profile/:userId/delete-Profile-Image', async (req, res) => {
    const { userId } = req.params
    console.log({ userId });

    try {
        // getting the user 
        await User.findById(userId)
            .then(result => {
                currentUser = result
            })
        //checking if he has a image
        if (currentUser.cloudinary_id == null) {
            console.log('no image');
        } else {
            // getting the user
            let user = await User.findById(userId);
            // deleting the image from cloudinary
            await cloudinary.uploader.destroy(user.cloudinary_id)
                .then(async () => {
                    //updating the cloudinary properties in the user db to null
                    await User.findByIdAndUpdate(userId, { avatar: null, cloudinary_id: null });

                    res.json({ 'data': 'changed successfully' })
                })
        }
    } catch (err) {
        console.log(err);
        res.json({ 'data': err })
    }
})

// edit profile 
router.post('/profile/:userId/edit-profile', upload.single("image"), async (req, res) => {
    const { userId } = req.params
    const { username } = req.body
    const file = req.file;

    try {

        // get the current username before the change 
        await User.findById(userId)
            .then(result => {
                currentUsername = result
            })
        // check the new username input to see if it is the same as it was
        if (currentUsername.username == username) {
            console.log('no usernmae was cganfed nothing changed')

            //check the image file and add it 
            if (file !== undefined) {
                //checking if he has a image
                if (currentUsername.cloudinary_id == null) {
                    const result = await cloudinary.uploader.upload(req.file.path);
                    console.log(result.secure_url);
                    await User.findByIdAndUpdate(userId, { avatar: result.secure_url, cloudinary_id: result.public_id });
                    res.json({ 'data': 'changed successfully' })
                } else {
                    // getting the user
                    let user = await User.findById(userId);
                    // deleting the image from cloudinary
                    await cloudinary.uploader.destroy(user.cloudinary_id)
                        .then(async () => {
                            //updating the cloudinary properties in the user db to null
                            await User.findByIdAndUpdate(userId, { avatar: null, cloudinary_id: null });
                        })
                    const result = await cloudinary.uploader.upload(req.file.path);
                    console.log(result.secure_url);
                    await User.findByIdAndUpdate(userId, { avatar: result.secure_url, cloudinary_id: result.public_id });
                    res.json({ 'data': 'changed successfully' })
                }
            } else {
                console.log('file undifiinde');
                res.json({ 'data': 'changed successfully' })
            }

            // check to see if the username is already taken
        } else if (await User.findOne({ username: username }) || await User.findOne({ username: `@${username}` })) {
            console.log('user already taken');
            throw Error('Username already taken')

            // if the username isnt taken 
        } else {
            console.log('in the no username found');
            // if the username entered has a @ sign 
            if (username.charAt(0) == '@') {
                const usernameNoAsperand = username.substring(1)
                console.log('sliced user', usernameNoAsperand);
                // check that the username is only writen with numbers or letters
                if (usernameNoAsperand.match(/^[a-zA-Z0-9_]+$/)) {
                    // update the username and the posts
                    await User.findByIdAndUpdate(userId, { username: username });
                    let usersPosts = await Recipe.find({ userUploadId: currentUsername.username }).exec();
                    console.log(usersPosts);
                    usersPosts.forEach(post => {
                        post.userUploadId = username
                        post.save()
                    })

                    //check if the files/images changed
                    if (file !== undefined) {
                        //checking if he has a image
                        if (currentUsername.cloudinary_id == null) {
                            const result = await cloudinary.uploader.upload(req.file.path);
                            console.log(result.secure_url);
                            await User.findByIdAndUpdate(userId, { avatar: result.secure_url, cloudinary_id: result.public_id });
                            res.json({ 'data': 'changed successfully' })
                        } else {
                            // getting the user
                            let user = await User.findById(userId);
                            // deleting the image from cloudinary
                            await cloudinary.uploader.destroy(user.cloudinary_id)
                                .then(async () => {
                                    //updating the cloudinary properties in the user db to null
                                    await User.findByIdAndUpdate(userId, { avatar: null, cloudinary_id: null });
                                })
                            const result = await cloudinary.uploader.upload(req.file.path);
                            console.log(result.secure_url);
                            await User.findByIdAndUpdate(userId, { avatar: result.secure_url, cloudinary_id: result.public_id });
                            res.json({ 'data': 'changed successfully' })
                        }
                    } else {
                        console.log('file undifiinde');
                        res.json({ 'data': 'changed successfully' })
                    }
                    // if username contains forbiden characters
                } else {
                    throw Error('Username can contanin only A-Z, a-z, 0-9, and _ ')
                }
                // if inputed username doesnt have a @
            } else if (username.match(/^[a-zA-Z0-9_]+$/)) {
                // add a @ 
                const newUsername = `@${username}`;
                console.log(newUsername);
                // update the db with new username and update posts 
                await User.findByIdAndUpdate(userId, { username: newUsername });
                let usersPosts = await Recipe.find({ userUploadId: currentUsername.username }).exec();
                console.log(usersPosts);
                usersPosts.forEach(post => {
                    post.userUploadId = username
                    post.save()
                })
                // check file/image and save
                if (file !== undefined) {
                    const result = await cloudinary.uploader.upload(req.file.path);
                    console.log(result.secure_url);
                    const editImg = await User.findByIdAndUpdate(userId, { avatar: result.secure_url, cloudinary_id: result.public_id });
                    res.json({ 'data': 'changed successfully' })
                } else {
                    console.log('file undifiinde');
                    res.json({ 'data': 'changed successfully' })
                }
            } else {
                throw Error('Username can contanin only A-Z, a-z, 0-9, and _ ')
            }
        }


    } catch (err) {
        console.log(err.message)
        res.json({ 'data': err.message })
    }

})

router.post('/user/:visitedUserId/follow', async (req, res) => {
    const { visitedUserId } = req.params
    const { userId } = req.body

    //getting the visited user
    User.findOne({ '_id': userId })
        .then(async currentUserResult => {
            // verifying that the user isnt in follwers already
            if (!(currentUserResult.following.includes(visitedUserId) && currentUserResult.followers.includes(userId))) {
                console.log('in and adding follower');
                //adding the visited user to users following array and incrementing +1
                const currentUser = await User.findByIdAndUpdate(userId, { $push: { following: visitedUserId }, $inc: { followingCount: 1 } }, { new: true })
                //adding the visited user to the followers if the user and incrementing followers +1
                const visitedUser = await User.findByIdAndUpdate(visitedUserId, { $push: { followers: userId }, $inc: { followersCount: 1 } }, { new: true })
                const status = 'following'

                res.json({ 'data': { currentUser, visitedUser, status } });

            } else if ((currentUserResult.following.includes(visitedUserId) && visitedUserResult.followers.includes(userId))) {
                console.log('error hack alarm');
            }
        })
})


router.post('/user/:visitedUserId/unfollow', async (req, res) => {
    const { visitedUserId } = req.params
    const { userId } = req.body

    User.findOne({ '_id': userId })
        .then(async currentUserResult => {
            User.findOne({ '_id': visitedUserId })
                .then(async visitedUserResult => {
                    if ((currentUserResult.following.includes(visitedUserId) && visitedUserResult.followers.includes(userId))) {
                        console.log('in and removing follower');
                        const currentUser = await User.findByIdAndUpdate(userId, { $pull: { following: visitedUserId }, $inc: { followingCount: -1 } }, { new: true })
                        const visitedUser = await User.findByIdAndUpdate(visitedUserId, { $pull: { followers: userId }, $inc: { followersCount: -1 } }, { new: true })
                        const status = 'follow'

                        res.json({ 'data': { currentUser, visitedUser, status } });

                    } else if (!(currentUserResult.following.includes(visitedUserId) && visitedUserResult.followers.includes(userId))) {
                        console.log('error hack alarm');
                    }
                })
        })
})


module.exports = router;