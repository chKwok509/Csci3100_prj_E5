const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/loginsystem")
.then(()=>{
    console.log("Connection Successful");
})
.catch(()=>{
    console.log("Failed Connection");
});

const LoginSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    rankingmark:{
        type:Number,
        required:true,
        default:0
    },
    gold:{
        type:Number,
        required:true,
        default:1000
    }
});



const collection = new mongoose.model('collection1',LoginSchema);


module.exports = collection;
