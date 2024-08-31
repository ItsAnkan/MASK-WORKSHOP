const mongoose = require('mongoose');

const TodoItemSchema = new mongoose.Schema({
    text : {type: String, required: true},
    checked : {type: Boolean, default: false},
}, {collection: 'todo-list'});

module.exports = mongoose.models.TodoItem || mongoose.model('TodoItem', TodoItemSchema);