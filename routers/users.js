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


//Show Route


//Update Route


//Delete Route


module.exports = router;