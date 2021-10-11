const express = require('express');
const userRouter = require('./routes/user.route');
const Authorization = require('./middleware/Authorization');
const app = express();
const port = 3333;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, token");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
    if(req.method == "OPTIONS" || (req.method == "POST" && (req.url == "/users/login" || req.url == "/users/")))
        next();
    else
        Authorization.authorize(req, res, next);    
})

app.use("/users", userRouter);

app.get("/", (req, res)=>{
    res.json({"message": "TechLearn api is running successfully"});
});

app.listen(port, ()=>{
    console.log("server is running at : http://localhost:3333");
});