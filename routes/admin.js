require('dotenv').config() 
const express = require('express');
const router = express.Router();
const path = require('path');
const publicPath = path.join(__dirname, '../');
const Ticket = require('../models/ticket');

router.get('/getStoresList', (req, res) => {
    storesList = JSON.parse(process.env.STORES);
    console.log(storesList);
    res.send(storesList);
});

router.get('/getSubjectsList', (req, res) => {
    subjectsList = JSON.parse(process.env.SUBJECTS);
    console.log(subjectsList);
    res.send(subjectsList);
});

// show dashbord
router.get('/', (req, res) => {
    res.sendFile(path.join(publicPath + '/public/admin.html'));
});

// get all tickets
router.get('/getTicketList', async (req, res) => {
    try {
        const tickets = await Ticket.find();
        res.json(tickets);
    } catch (err) {
        res.status(500).json({ message: err.message }); // 500: error on server
    }
})

// get one ticket
router.get('/:id', getTicket, (req, res) => {
    res.json(res.ticket);
});

// add ticket
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

// edit ticket
router.patch('/:id', getTicket, async (req, res) => {
    if(req.body.name != null){
        res.ticket.name = req.body.name;
    }
    if(req.body.lastName != null){
        res.ticket.lastName = req.body.lastName;
    }
    if(req.body.subject != null){
        res.ticket.subject = req.body.subject;
    }
    if(req.body.store != null){
        res.ticket.store = req.body.store;
    }
    if(req.body.priority != null){
        res.ticket.priority = req.body.priority;
    }
    if(req.body.title != null){
        res.ticket.title = req.body.title;
    }
    if(req.body.description != ""){
        res.ticket.description = req.body.description;
    }
    try {
        const updatedTicket = await res.ticket.save();
        res.json(updatedTicket);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// delete ticket
router.delete('/:id', getTicket, async (req, res) => {
    try {
        await res.ticket.remove();
        res.json({ message: `Deleted ticket ${res.ticket.name}`});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// 'middleweare', to get a ticket in particular
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