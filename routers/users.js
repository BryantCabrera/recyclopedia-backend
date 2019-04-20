/********** REQUIRES **********/
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/user');

/********** MIDDLEWARE **********/

/********** ROUTES **********/
//Index Route
router.get('/', async (req, res) => {
    try {
        const allUsers = await User.find({});

        res.json({
            status: 200,
            data: allUsers
        });
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

//Create Route
router.post('/', async (req, res) => {
    let hashedPassword = await bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    req.body.password = hashedPassword;

    console.log(req.body, 'hitting create User');
    try {
        const createdUser = await User.create(req.body);
        res.json({
            status: 200,
            message: 'Registration successful.',
            data: createdUser
        });
        
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

//Show Route


//Update Route


//Delete Route


module.exports = router;