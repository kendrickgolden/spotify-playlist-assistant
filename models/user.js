const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
    {
        track: {type: String, required:true},
        artists: {type: String, required:true, maxLength: 100, minLength:8},
        creation_date: {type: Date}
    }
);

module.exports = mongoose.model('User', UserSchema);