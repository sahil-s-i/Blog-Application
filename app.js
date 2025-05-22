const express = require("express");
const app = express();
const mongoose = require("mongoose");

// port 
const PORT = process.env.port || 3000;


// routes 
app.get("/",(req,res)=>{
    res.send("Hello")
})

// mongoose.connect(process.env.MONGODB_URL)

// start server 
app.listen(PORT, () => {
    console.log(`server is running on port http://localhost:${PORT}`);
})
