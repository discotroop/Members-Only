let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let MemberSchema = new Schema ({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    password: {type: String, required: true},
    isMember: {type: Boolean, required: true, default: false},
    email: {type: String, required: true}
});

// Virtuals for MemberSchema
// come back to this

module.exports = mongoose.model('Member', MemberSchema);