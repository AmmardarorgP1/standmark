const express = require('express');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middleware/errorHandler');



const app = express();


app.use(express.json());


app.get('/',(req,res)=>{
         res.send("API StandMark is running ");
});




app.use('/auth',authRoutes);

app.use(errorHandler);

module.exports = app;