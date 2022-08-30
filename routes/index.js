const express = require('express');
const router = express.Router();
const path = require('path');
const publicPath = path.join(__dirname, '../');

const Ticket = require('../models/ticket');

router.get('/', (req, res) => {
    res.sendFile(path.join(publicPath + '/public/index.html'));
});

router.get('/addTicket', (req, res) => {
    res.sendFile(path.join(publicPath + '/public/addTicket.html'));
});


module.exports = router;