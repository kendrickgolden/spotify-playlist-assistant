const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
    {
        id: {type: String, required: true},
        playlists: [{type: String, reqiured: true}],
        creation_date: {type: Date, required: true, immutable: true, default: () => Date.now()}
    }
);

module.exports = mongoose.model('User', UserSchema);
