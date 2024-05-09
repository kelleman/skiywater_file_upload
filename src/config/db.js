const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.MONGODB_URI
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>console.log('Connected to Database'))
.catch(err=>console.log('Unable to connect to database', err.message));
