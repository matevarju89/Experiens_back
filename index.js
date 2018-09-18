

//requiring the necessary packages
const express=require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const passport=require("passport");

//bringing in express router
const users=require("./routes/api/users");
const profile=require("./routes/api/profile");
const events=require("./routes/api/events");

//express middleware
const app=express();

//Body Parser middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//DB config
const db=require("./config/keys").mongoURI;

//Connect to db through mongoose(promise returned)
mongoose.connect(db, {useNewUrlParser: true})
	.then(()=>console.log("MongoDB connected"))
	.catch(err=>console.log(err));

//testing backend

app.get("/", (req,res)=>{
	res.send("Szióka kedves Máté.")
});

//passport middleware
app.use(passport.initialize());

//passport config
require("./config/passport")(passport);

//Use routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/events", events);

//port setting
const port=process.env.PORT || 5000;

//set up server
app.listen(port, ()=>console.log(`Server running on port ${port}`));