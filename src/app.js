const express = require("express");

const app = express();

const path = require("path");

const hbs = require("hbs");

const util=require('util');

const urlExists=util.promisify(require('url-exists'));

const {check,validationResult}=require('express-validator');

//Flash notification
var flash=require("connect-flash");

//db file
require("./db/config");

//host name

const hostname = "0.0.0.0";

//model
const Register = require("./models/register");
const Projectsubmission = require("./models/submit");
const Question = require("./models/question");

const async = require("hbs/lib/async");
const { resolve } = require("path");

//default port connection
const port = process.env.PORT || 3000

//routes
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../template/views");
const partials_path = path.join(__dirname, "../template/partials");

//parser
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(require("express-session")({
    secret:"my name is khan",
    resave:false,
    saveUninitialized:false,
    cookie:{maxAge:60*60*1000}
    }));


app.use(flash());
app.use(express.static(static_path))
app.set("view engine", "hbs");

//engine render
app.set("views",template_path);
hbs.registerPartials(partials_path);

app.use(function(req, res, next){
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
 });

//home page
app.get("/", (req, res) =>{
    res.render("index");
});

//register page
app.get("/register",(req, res) =>{
    res.render("register");
})

//sucessful page
app.get("/successful",(req, res) =>{
    res.render("successful");
})

//Guidline page
app.get("/guidline",(req, res) =>{
    res.render("guidline");
})

//Rank page
app.get("/ranklist",(req, res) =>{
    res.render("ranklist");
})

//download pdf
app.get("/download",(req,res) =>{
    res.download("theme.pdf")
})


//creating new user data
app.post("/register",[
    check('email',"Please include a valid email").isEmail(),
],
async(req,res) =>{
    try {
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            req.flash("error","Email must be valid");
            res.redirect("/register");
        }
       const registerParticiepent = new Register({
        fullname : req.body.fullname,
        email : req.body.email,
        college : req.body.Collegename,
        phonenumber : req.body.Phonenumber,
        teamname : req.body.teamname,
        othername : req.body.Othermembername
       })

    const registered = await registerParticiepent.save();
    // console.log(registered);
    req.flash("success","Registration successful");
    return res.redirect("/register");

    } catch (error) {
        req.flash("error","Records already registered or missing details");
        res.redirect("/register");
        // res.status(400).send(error);
    }
})



//for project submission
app.post("/submit", async (req,res) =>{
    try {
        const register=await Register.findOne({teamname:req.body.nameoftheteam});
        if(!register){
            req.flash("error","Team is not registered");
            return res.redirect("/register");
        }
        // var p=new Promise((resolve,reject) => {
        //     urlExists(req.body.projectlink,(err,exists) => {
        //         if(err){
        //             reject(err);
        //         }else{
        //             resolve(exists);
        //         }
        //     });
        // });

        // p.then((e) => {
        //     console.log(e);
        //     if(!e){
        //         req.flash("error","Project link is invalid");
        //         res.redirect("/register");
        //     }
        // }).catch((err) => {
        //     console.log(err);
        //     res.redirect("/register","Something went wrong");
        // });


        let isExists=await urlExists(req.body.projectlink);
        console.log(isExists);
        if(!isExists){
            req.flash("error","Project link is invalid");
            return res.redirect("/register");
        }
        
        const submittedproject = new Projectsubmission({
            name : req.body.nameoftheteam,
            email : req.body.email,
            link : req.body.projectlink
           })
    
        const submitted = await submittedproject.save();
        console.log(submittedproject);
        req.flash("success","Submission successful");
        res.redirect("/register");
    } catch (error) {
        console.log(error);
        req.flash("error","Something went wrong");
        res.redirect("/register");
    }
})



//for user query
app.post("/question", async (req,res) =>{
    try {
        const userQuestion = new Question({
            name : req.body.name,
            email : req.body.email,
            msg : req.body.msg
           })
    
        const questionSubmitted = await userQuestion.save();
        console.log(userQuestion);
        req.flash("success","Message sent Successfully");
        res.redirect("/");
    } catch (error) {
        console.log(error);
        req.flash("error","Something went wrong");
        res.redirect("/");
    }
})


// auto email responsec NodeMailer





//port listen
app.listen(port, hostname, () => {
    console.log(`Server is running at ${port}`);
})
