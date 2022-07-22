const mongoose = require('mongoose');
const Playlist = require('../models/playlist');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
    {
        id: {type: String, required: true},
        playlists: {type: [String], id: false},
        creation_date: {type: Date, required: true, immutable: true, default: () => Date.now()}
    }
);

module.exports = mongoose.model('User', UserSchema);
