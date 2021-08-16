const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');

require('../db/conn');
const User = require("../");
const bcrypt = require('bcryptjs');


//homepage

router.get('/', (req, res) => {
    res.send('Hello world from server router');
});


//register

router.post('/register', jsonParser, verifyRole, upload.single('profileimage'), function(req, res) {
    var cipher = crypto.createCipher(algo, key);
    var encrypted = cipher.update(req.body.password, 'utf-8', 'hex') +
        cipher.final('hex');
    const data = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        class: req.body.class,
        email: req.body.email,
        password: encrypted,
        contact: req.body.contact,
        profileimage: req.file.path
    })
    const { error } = userValidation(req.body);
    if (error) {
        res.send(error.details[0].message);
    } else {
        res.json({ message: "Data Successfully Saved!" });
        data.save().then((result) => {
            res.json(result)
        }).catch((error) => console.log(error))
    }
})


//login

router.post('/signin', async (req, res) => {
    // console.log(req.body);
    // res.json({ message: "success" });
    try {
        let token;
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Invalid data" })
        }
        const userLogin = await User.findOne({ email: email });

        // console.log(userLogin);

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);

            token = await userLogin.generateAuthToken();
            console.log(token);

            res.cookie("jwtoken", token);


            if (!isMatch) {
                res.status(400).json({ error: "Invalid Credentials" });
            }
            else {
                res.json({ message: "login success" });
            }
        }
        else {
            res.status(400).json({ error: "Invalid Credentials" });
        }

    } catch (err) {
        console.log(err);
    }
});


//logout


router.get('/logout', (req, res) => {
    console.log('Logout Page');
    res.clearCookie('jwtoken', { path:'/' });
    res.status(200).json( {data : 'User Logout'});
});