const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
    {
        username: {type: String, required:true, maxLength: 16, minLength: 4},
        password: {type: String, required:true, maxLength: 100, minLength:8},
        creation_date: {type: Date}
    }
);

module.exports = mongoose.model('User', UserSchema);