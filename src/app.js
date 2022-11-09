const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const jwt = require("jsonwebtoken");
const e = require('express');
const bcrypt = require('bcryptjs');

 
require("./db/conn");
const Register = require("./models/registers");
const { json } = require("express");
const { log } = require("console");

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname,"../public");
const templates_path = path.join(__dirname,"../templates/views");
const partials_path = path.join(__dirname,"../templates/partials");


//console.log(path.join(__dirname,"../public"));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.set("view engine","hbs");
app.set("views",templates_path)
hbs.registerPartials(partials_path)

app.get("/",(req,res)=>{
    res.render("index")
});
app.get("/login",(req,res)=>{
    res.render("login")
});

app.post("/",async(req,res)=>{
    try {
        const password = req.body.password;
        const cpassword= req.body.cpassword;
        if (password === cpassword) {
            
            const registerEmployee = new Register({
                name:req.body.name,
                username:req.body.username,
                email:req.body.email,
                phonenumber:req.body.phonenumber,
                password:req.body.password,
                cpassword:req.body.cpassword,
                gender:req.body.gender

            })

            console.log("the success part" + registerEmployee);
            const token = await registerEmployee.generateAuthToken();
            console.log("the token part" + token);
            const registered = await registerEmployee.save();
            console.log("the page part" + registered);
            res.status(201).render("register");
          }else{
    
              res.send("password are not matching")
          }
        } catch (error) {
    
            res.status(400).send(error);
    
            console.log("the error part page ");
        }
    })

app.post('/login',async(req,res)=>{
try{
const email=req.body.email;
const password=req.body.password;
    const useremail = await Register.findOne({email:email});
    
    const isMatch = await bcrypt.compare(password, useremail.password);

const token=await useremail.generateAuthToken();
console.log("The token part "+token);

if(isMatch){
        res.status(201).render("dashboard");
    }
    else{
        res.send("Invalid login detail");
    }


}catch(error){
res.status(400).send("Invalid");
console.log(error);
}
})


app.listen(port,()=>{
    console.log(`server is running at port no ${port}`);
})