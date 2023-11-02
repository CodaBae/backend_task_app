const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    name: String,
    date: String,
    isDone: Boolean
})

module.exports = taskSchema