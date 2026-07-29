const mongoose = require('mongoose');
require('dotenv').config();
const app = require('./src/app');



const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI).then(()=>{
    
        console.log('Connected to MongoDB');
        app.listen(PORT,()=>{
            console.log(`STANDMARK API running on http://localhost:${PORT}`);
        });
   

}).catch((error)=>{

    console.error('MONGODB connection failed:',error.message);
    process.exit(1);

});