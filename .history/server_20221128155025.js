import express from 'express';

const app = express();
app.get("/",(req,res)=>{
    res.send("API is runnning")
})
app.listen(3000,console.log("server running.."))
