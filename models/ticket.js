const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    secondName: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    store: {
        type: String,
        required: true
    },
    urgency: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Ticket', ticketSchema);