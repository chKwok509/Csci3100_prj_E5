const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const collection = require("./mongodb");

app.use(express.urlencoded({extended:false}));

app.use(express.static('public'));
app.use(express.json());
app.set('view engine','hbs');
app.set('views',path.join(__dirname,'../temp'));

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.get('/', (req, res) => {
    res.render('login');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post("/signup",async(req,res)=>{
    const data ={
        name:req.body.name,
        password:req.body.password
    }
    await collection.insertMany([data]);
    const check = await collection.findOne({ name: req.body.name });
    res.render("home",{ name: req.body.name,ranking: check.rankingmark, gold: check.gold});
});

app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.name })

        if (check && check.password === req.body.password) {
            
            res.render("home",{ name: req.body.name ,ranking: check.rankingmark, gold: check.gold });
        }
        else {
            res.render('login', { message: "Wrong Name or Password" });
        }
    } 
    catch (e) {
        res.render('login', { message: "Wrong Name or Password" });
    }
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


