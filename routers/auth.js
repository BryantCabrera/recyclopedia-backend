/********** REQUIRES **********/
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require('../models/user');

/********** MIDDLEWARE **********/

/********** ROUTES **********/
// Log-In
router.post('/login', async (req, res) => {
    try {
        //finds logged in user 
        //gets email from req.body (username was attached via form and kept in req.body)
        const loggedUser = await User.findOne({ email: req.body.email });
        console.log(loggedUser, ' this is loggedUser');
        //if User exists
        if (loggedUser) {
            //checks if the passwords match, if they do, redirect to page, if not, keep on splash page with message
            //compares password from req.body to User's hashedpassword in database
            if (bcrypt.compareSync(req.body.password, loggedUser.password) && req.body.email === loggedUser.email) {
                //once User is found, create a session
                req.session.user = loggedUser;
                req.session.message = '';
                req.session.logged = true;

                const { _id, name, email, img, location } = loggedUser
                const responseLoggedUser = {
                    _id: _id,
                    name: name,
                    email: email,
                    img: img, 
                    location: location
                }
                // res.json({ loggedUser, isLoggedIn: true });
                res.json({
                    status: 200,
                    message: 'login successful',
                    data: responseLoggedUser
                })
            } else {
                // res.json({ isLoggedIn: false });
                res.json({
                    message: 'The password you entered is incorrect!'
                })
            }
        } else {
            res.json({
                status: 200,
                message: 'That User doesn\'t exist!'
            });
        }
    } catch (err) {
        res.json({
            status: 200,
            message: 'Couldn\'t connect to database.'
        });
    }
});

// Log-Out
router.get('/logout', (req, res) => {
    console.log('User successfully logged out.');
    // req.session.destroy((err) => err ? res.json({error: err}) : res.json({data: 'User successfully logged out.'}));

    req.session.destroy((err) => {
        if (err) return console.log('error', err);
        console.log('Log out was successful.');
        res.json({ message: 'User successfully logged out.' })
    });
});

module.exports = router;