const mongoose = require('mongoose');
const Playlist = require('../models/playlist');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        id: {type: String, required: true},
        playlists: {type: [Schema.Types.ObjectId], ref: 'Playlist', req: true},
        creation_date: {type: Date, required: true, immutable: true, default: () => Date.now()}
    }
);

module.exports = mongoose.model('User', UserSchema);
