const mongoose = require('mongoose');
const { Schema } = mongoose;

const voteSchema = new Schema({
    // id: mongoose.Schema.Types.ObjectId,
    userId: String,
    pollId: String, 
    option: String,
});

module.exports = mongoose.model('vote', voteSchema);