const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    task: {
        type: String,
        required: true
    }, 
    date: {
        type: String,
        default: Date.now()
    }
});

const Task = mongoose.model("tasks", TodoSchema);

module.exports = Task;