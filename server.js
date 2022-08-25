require('dotenv').config() 
const express = require('express'); 
const router = express.Router();
const mongoose = require('mongoose');

const app = express();
app.use(express.static('./public'));

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database'));

app.use(express.json()); //imposto il tipo di file che voglio passare nel middleweare

router.get('/getStoresList', (req, res) => {
    res.send('getStoresList');
});

const indexRouter = require('./routes/index');
app.use('/', indexRouter);

const adminRouter = require('./routes/admin');
app.use('/admin', adminRouter);

app.listen(process.env.DATABASE_PORT, () => console.log(`Server listening on port ${process.env.DATABASE_PORT}`));
