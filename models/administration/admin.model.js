const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    firstName : String,
    lastName  : String,
    email     : String,
    password  : String,
    jobTitle  : String

},{
    timestamps: true
});

module.exports = mongoose.model('Admin', adminSchema);