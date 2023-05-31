const User = require('../models/User');
const router = require('express').Router();
const bcrypt = require('bcrypt');



router.get('/', (req, res) => {
    res.render('index');
})
router.get('/register', (req, res) => {
    res.render('signup')
})

router.post('/register', async(req, res) => {
    try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 13)
    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    });

        const saveUser = await newUser.save();
        req.session.userId = newUser.username;
        res.status(200).send(saveUser);
    } catch (error) {
        console.log(error._message);
        res.status(500).send('Internal Server Error');
    }

});

router.post('/login', async(req, res) => {
    try {
        const { username, password } = req.body;
        if(!username || username === null || password === null){
            console.log('empty field');
            return
        }
        const user = await User.findOne({ username })
        if(!user){
            res.status(401).send({message: 'Invalid Credentials'});
            return
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if(!isPasswordCorrect){
            res.status(401).send({message: 'Invalid Credentials'});
            return
        }

        req.session.userId = user.username
        res.status(200).send('Login Successful');
        console.log(req.session);
    } catch (error) {
        res.status(500).send(error)
    }
});

router.post('/logout', (req, res) => {
    req.session.destroy();
    res.status(200).send('Logout Successful');
});

router.get('/dashboard', (req, res) => {
    if(!req.session.userId){
        res.status(401).send('Unauthorized...');
    }

    res.status(200).send(`welcome to your dashboard ${ req.session.userId }`)
})

module.exports = router;