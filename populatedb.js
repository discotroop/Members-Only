#! /usr/bin/env node

// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
// to run:
// node populatedb "mongodb+srv://Admin:Admin@cluster0-bkvrt.mongodb.net/produce_stand?retryWrites=true&w=majority"


console.log('This script populates some members and messages to the db for testing');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/

// get models
var async = require('async')
var Member = require('./models/member')
var Message = require('./models/message')

// set up mongoDB
var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// members and types arrays
var members = []
var messages = []


// Create Produce Types
function messageCreate(title, text, author, cb) {
  // define object
  let message = new Message({
      title: title,
      time: new Date(),
      text: text,
      Author: author,
  });
  
  // save
  message.save(function (err) {
      // if err send err
      if (err) {
          cb(err, null);
          return;
      }
      // console to show and push to messages array
      console.log('New Message: ' + message)
      messages.push(message)
      cb(null, message);
  }   );
}

// Create Vegetable member
function memberCreate(firstname, lastname, password, isMember, email, cb) {
    let memberdetail = {
        firstName: firstname,
        lastName: lastname,
        password: password,
        isMember: isMember,
        email: email,
    }
    let member = new Member(memberdetail);
    member.save(function (err) {
        console.log(cb)
        if(err) {
            cb(err, null)
            return
        }
        console.log('New member: ', + member);
        members.push(member)
        cb(null, member)
    });
}
// create multiple store members
function createmembers(cb) {
    async.series([
        function(callback) {
            memberCreate(
                'Bob', 
                'Testing.',
                'safepassword',
                true,
                'test@test.com',
                callback,
                );
        },
        function(callback) {
            memberCreate(
                'Bob2', 
                'Testing.',
                'safepassword',
                true,
                'test@test.com',
                callback,
                );
        },
    ],
    cb);
}

// Create multiple produce types
function createmessages(cb) {
    async.series([
        function(callback) {
          messageCreate('Test', 'Testing Messages', members[0], callback)
        },
        function(callback) {
          messageCreate('Test', 'Testing Messages', members[1], callback)
        },
        ],
        // optional callback
        cb);
}


async.series([
    createmembers,
    createmessages,
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('members: '+members);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});