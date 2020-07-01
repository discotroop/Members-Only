let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// Define Message Schema
let MessageSchema = new Schema ({
    title: {type: String, required: true},
    time: {type: Date, required: true},
    text: {type: String, required: true},
    Author: [{type: Schema.Types.ObjectId, ref: "Member"}]
})

// Will need virtual(s) for formatting time

// Export Message Schema
module.exports = mongoose.model('Message', MessageSchema);