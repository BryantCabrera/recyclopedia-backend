const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, default: 'Buyer' },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    img: { type: String, default: 'https://i.imgur.com/KbicDVh.jpg' },
    location: Number
});

const User = mongoose.model('User', userSchema);

module.exports = User;