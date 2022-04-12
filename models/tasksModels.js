const mongoose = require('mongoose');
const moment = require('moment');

const taskSchema = new mongoose.Schema({
    action: {
        type: String,
        required: true,
    },

    date: {
        type: String,
        default: moment().calendar(),
    },

    status: {
        type: String,
        default: "todo",
    }
})

module.exports = new mongoose.model("Task", taskSchema)