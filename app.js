const express = require("express");

const users = require("./routes/user.js");
const products =require("./routes/products.js")
const details = require("./routes/details.js")
const bodyParser = require("body-parser");
const session = require("express-session");
//构建服务器
var app = express();
app.listen(3000,()=>{
    console.log("服务器创建成功");
});

const cors = require("cors")
app.use(cors({
    origin:["http://127.0.0.1:3001","http://localhost:3001"],
    credentials:true
}))

app.use(bodyParser.urlencoded({
    extended:false
}))

//托管静态资源
app.use(express.static('public'));

app.use(session({
    secret:"128位随机字符串",
    resave:false,
    saveUninitialized:true
}))


app.use("/users",users);
app.use("/products",products)
app.use("/details",details);