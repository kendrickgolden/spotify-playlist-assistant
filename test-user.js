const userArgs = process.argv.slice(2);

if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}

const async = require('async');
const User = require('./models/user');


const mongoose = require('mongoose');
const mongoDB = "mongodb+srv://kendrickgolden:Coolkids883@cluster0.gi4l1.mongodb.net/spotify-project?retryWrites=true&w=majority";
mongoose.connect(mongoDB);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongDB connection error'));

const users = [];

function userCreate(username, password, creation_date, cb) {
    userdetail = {username:username , password: password , creation_date:creation_date}
    
    var user = new User(userdetail);
         
    user.save(function (err) {
      if (err) {
        cb(err, null)
        return
      }
      console.log('New User: ' + user);
      users.push(user)
      cb(null, user)
    }  );
  }

  function createUsers(cb) {
    async.series([
        function(callback) {
          userCreate('Quandale Dingle', 'youngboybetter', '1969-04-20', callback);
        },
        ],
        // optional callback
        cb);
}

async.series([
    createUsers
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('BOOKInstances: ');
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});