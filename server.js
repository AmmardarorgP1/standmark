const express = require('express');
const app = express();
const PORT = 5000;


app.get('/',(req,res)=>{
    res.send('StandMark API is live and listening hot-reload');
});

app.listen(PORT,()=>{
    console.log(`StandMark API running on http://localhost:${PORT}`);
});