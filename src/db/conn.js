const e = require("express");
const mongoose = require("mongoose");

mongoose.connect("mongodb://anithav:anithav@ac-jpcphw9-shard-00-00.msc5chm.mongodb.net:27017,ac-jpcphw9-shard-00-01.msc5chm.mongodb.net:27017,ac-jpcphw9-shard-00-02.msc5chm.mongodb.net:27017/?ssl=true&replicaSet=atlas-7tblg2-shard-0&authSource=admin&retryWrites=true&w=majority",{
    
}).then(()=>{
    console.log("connected successful");
}).catch((e)=>{
    console.log("No connection");
})