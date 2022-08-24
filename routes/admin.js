const express = require('express');
const router = express.Router();
const path = require('path');
const publicPath = path.join(__dirname, '../');
const Ticket = require('../models/ticket');

router.get('/', (req, res) => {
    res.sendFile(path.join(publicPath + '/public/admin.html'));
});

router.get('/getTicketList', async (req, res) => {
    try {
        const tickets = await Ticket.find();
        res.json(tickets);
    } catch (err) {
        res.status(500).json({ message: err.message }); // 500: error on server
    }
})

router.post('/addTicket', async (req, res) => {
    const ticket = new Ticket({
        name: req.body.name,
        lastName: req.body.lastName,
        subject: req.body.subject,
        store: req.body.store,
        priority: req.body.priority,
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

router.delete('/:id', getTicket, async (req, res) => {
    try {
        await res.ticket.remove();
        res.json({ message: `Deleted ticket ${res.ticket.name}`});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


async function getTicket(req, res, next){
    let ticket;
    try {
        ticket = await Ticket.findById(req.params.id);
        if(ticket == null){
            return res.status(404).json({ message: 'Cannot find ticket' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.ticket = ticket;
    next();
}


module.exports = router;