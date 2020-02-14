const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://wtavares:wii220562iiw@cluster0-9vcgq.mongodb.net/week10w?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(cors()); 
app.use(express.json());
app.use(routes);

app.listen(1205);
