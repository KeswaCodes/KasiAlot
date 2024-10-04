const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    taskName: { type: String, required: true },
    compensation: { type: Number, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    isAccepted: { type: Boolean, default: false },
    acceptedBy: { type: String, default: null },
    userEmail: { type: String, required: true }
});

module.exports = mongoose.model('Task', taskSchema);
