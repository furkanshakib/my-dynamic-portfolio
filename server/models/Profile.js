const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    profilePicture: { type: String, required: true }, // Base64 string
    name: { type: String, default: "Furkan Shakib" },
    bio: { type: String },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Profile', ProfileSchema);
