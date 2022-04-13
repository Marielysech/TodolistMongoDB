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
    },
    category: {
        type: String,
        enum: [ "Work", "Personal", "Urgent", null ],
        message: 'Category is not supported'    
    }
})

module.exports = new mongoose.model("Task", taskSchema)