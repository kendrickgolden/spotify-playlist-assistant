const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var PlaylistSchema = new Schema(
    {
        id: {type: String, required:true},
        name: {type: String, required:true},
        artist_ids: {type: [String], required:true}
    }
);

module.exports = mongoose.model('Playlist', PlaylistSchema);