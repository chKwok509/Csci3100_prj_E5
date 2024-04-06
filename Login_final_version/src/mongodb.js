const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://jerryngai223:20030223@cluster0.nvtdjc5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
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
