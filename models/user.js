const mongoose = require('mongoose');
const { Schema } = mongoose;

const signupSchema = new Schema({
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    email: { type: String, required: true, index: {unique: true, dropDups: true}}, // String is shorthand for {type: String}
    password: { type: String, required: true}
    // confirm_password: { type: String, required: true},
},{strict: true});

module.exports = mongoose.model('user', signupSchema);