const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    username: { type: String, required: true },
    title: { type: String, required: true },
    query: { type: String, required: true },
    insertedAt: { type: Date, required: true, default: Date.now},
    role : {type : String ,required : true}
});

module.exports = mongoose.model('Contact', ContactSchema);