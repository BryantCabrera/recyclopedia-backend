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
router.get('/:id', async (req, res) => {
    try {
        const foundUser = await User.findById(req.params.id);
        res.json({
            status: 200,
            data: foundUser
        });
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

//Update Route
router.put('/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({
            status: 200,
            data: updatedUser
        });
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

//Delete Route


module.exports = router;