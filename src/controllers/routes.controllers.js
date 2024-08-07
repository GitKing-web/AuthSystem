const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/users.model");
const Posts = require('../models/posts.models');

const helloWorld = (req, res) => {
    res.status(200).send('Hello, world!');
}

//render ejs get req
const renderEJS = (req, res) => {
    try {
        res.status(200).render('index', {title: 'Home page'});
    } catch (error) {
        console.log(error);
    }
}

const signUp = (req, res) => {
    res.status(200).render('signup', {title: 'SignUp Page'});
}

const login = (req, res) => {
    res.status(200).render('login', {title: 'Login Page'});
}

//post request

const handleSignup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        if(!username || username == null || !email || email == null || !password || password == null) return;
        //existing user
    const existingEmail = await User.findOne({ email });
    const existingUsername = await User.findOne({ username });
    if(existingUsername) return res.status(400).json({ message: 'username already in use, pick another' });
    if (existingEmail) return res.status(400).json({ message:'email already in use' });

    // const existingUser = await User.findOne({ username });
    // if(!existingUser) return res.status(400).send('userrname already in use, pick another');
    //hash password
    const hashedPassword = await bcrypt.hash(password, 13);

    //create new user
    const newUser = new User({ username, email, password: hashedPassword})
    const savedUser = await newUser.save();

res.status(201).send(savedUser);

    } catch (error) {
        return res.status(500).json({ message:'Server Error', error: error.message });
        // console.log(error);
    }
}

const handleLogin = async (req, res) => {
    try {
        const { username, email, password: pass} = req.body;
        const user = await User.findOne({
            $or: [{ username }, { email }]
        })
        if (!user) return res.status(400).json({ message: 'Invalid Credentials' });

        const isPasswordCorrect = await bcrypt.compare(pass, user.password)
        if(!isPasswordCorrect) return res.status(400).json({ message:'Invalid Credentials' });
           
        //jwt
        const payload = { id : user._id}
        const token = jwt.sign({payload, isAdmin: user.isAdmin}, process.env.jwt_secret, { expiresIn : "1h"})

        const { password, ...others } = user._doc;
    return res.status(200).send({...others, token})
    } catch (error) {
        return res.status(500).json({ message: 'Server Error', error: error.message })
    }
}

// render Dashboard

const renderDashboard =  async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if(!user){
            res.status(200).redirect('/login');
            return;
        }else{
            return res.status(200).render('dashboard', {title: 'Dashboard'}, user);
        }
    } catch (error) {
        return res.status(500).json({ message: 'Server error: ' + error.message });
    }
}

// update a user

const handleUpdate = async (req, res) => {
    // let { password } = req.body;
    const { id } = req.params;
    // if(password) {
    //     password = bcrypt.hash(password, 13)
    // }

    try {
        const updatedUser = await User.findByIdAndUpdate(id, {
            $set: req.body
        }, {
            new: true,
        })
        
    res.status(200).send(updatedUser);
    } catch (error) {
        return res.status(500).send('Server Error');
    }
}

// get request

const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
    res.status(200).send(user);
    } catch (error) {
        return res.status(500).send('Server Error' + error.message);
    }
}

const getAllUsers = async (req, res) => {
    try {
        const query = req.query.new;

        const users = query ?  await User.find().sort({ _id: -1 }).limit(10) :  await User.find();
    res.status(200).send(users);
    } catch (error) {
        return res.status(500).send('Server Error' + error.message);
    }
}

const deleteUser = async(req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
    res.status(200).send('User deleted successfully');
    } catch (error) {
        res.status(500).send('Server Error' + error.message);
    }
}

// handling users posts
const handlePost = async (req, res) => {
    try {
        const post = new Posts(req.body);

        const savedPost = await post.save();

    return res.status(200).send(savedPost);
    } catch (error) {
        return res.status(500).send('Server Error' + error.message);
    }
}

const postUpdate = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedPost = await Posts.findByIdAndUpdate(
            id ,
            { $set: req.body},
            { new: true }
        )
    return res.status(200).send(updatedPost);
    } catch (error) {
        return res.status(500).send('Server Error' + error.message)
    }
}

const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        await Posts.findByIdAndDelete(id)

    return res.status(200).send('post deleted successfully')
    } catch (error) {
        return res.status(500).send('Server Error' + error.message);
    }
}

const getPost = async (req, res) => {
    try {
        const { postId } =  req.params;
        const post = await Posts.findOne(postId);
    return res.status(200).send(post)
    } catch (error) {
        return res.status(500).send('Server Error' + error.message);
    }
}

const getAllPosts = async (req, res) => {
    try {
        const posts = await Posts.find();

    return res.status(200).send(posts);
    } catch (error) {
        return res.status(500).send('Server Error' + error.message);
    }
}

module.exports = {
    helloWorld,
    handleSignup,
    handleLogin,
    handleUpdate,
    getUser,
    getAllUsers,
    deleteUser,
    handlePost,
    postUpdate,
    deletePost, getPost, getAllPosts,
    renderEJS,
    signUp,
    login,
    renderDashboard
}