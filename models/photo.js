const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    imageName: { type: String, default: "non", required: true },
    imageData: { type: String, required: true}
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;