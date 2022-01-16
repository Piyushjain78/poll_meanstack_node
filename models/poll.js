const mongoose = require('mongoose');
const { Schema } = mongoose;

const pollSchema = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    question: { type: String, required: true}, // String is shorthand for {type: String}
    userName: { type: String, required: true},
    start: { type: Date, required: true},
    expiry: { type: Date, required: true},
    options: {
        option_1: { type: String, required: true},
        option_2: { type: String, required: true},
        option_3: String,
        option_4: String,
        option_5: String,
    },
    optionsResult: {
        option_1: Number,
        option_2: Number,
        option_3: Number,
        option_4: Number,
        option_5: Number,
    },
    optionsResultTotal: {type: Number, default: 0},
    user_id : { type: String, required: true}
});

module.exports = mongoose.model('poll', pollSchema);