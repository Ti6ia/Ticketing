const express = require('express');
const router = express.Router();
const path = require('path');
const publicPath = path.join(__dirname, '../');

const Ticket = require('../models/ticket');

router.get('/', (req, res) => {
    res.sendFile(path.join(publicPath + '/public/index.html'));
});

router.post('/addTicket', async (req, res) => {
    const ticket = new Ticket({
        name: req.body.name,
        secondName: req.body.secondName,
        subject: req.body.subject,
        store: req.body.store,
        urgency: req.body.urgency,
        title: req.body.title,
        description: req.body.description
    });
    try {
        const newTicket = await ticket.save();
        console.log("newTicket created:");
        console.log(newTicket);
        res.status(201).json(newTicket); // 201: successfully created an object
    } catch (err) {
        res.status(400).json({ message: err.message }); // 400: bad data from client
    }
});

module.exports = router;