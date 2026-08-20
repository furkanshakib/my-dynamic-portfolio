const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    profilePicture: { type: String, required: false }, // Legacy Base64 string
    profileImages: { type: [String], default: [] }, // Array of Base64 strings for carousel
    name: { type: String, default: "Furkan Shakib" },
    bio: { type: String },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Profile', ProfileSchema);
