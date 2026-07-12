const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 5000;


app.get('/',(req,res)=>{
    res.send('StandMark API is live and listening hot-reload');
});






mongoose.connect(process.env.MONGODB_URI).then(()=>{

    console.log("Connected to mongodb");
    app.listen(PORT,()=>{
    console.log(`StandMark API running on http://localhost:${PORT}`);
});

}).catch((error)=>{
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
});



