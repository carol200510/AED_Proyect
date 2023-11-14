import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";

const port = 3000;
const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req,res) =>{
    res.render("index.ejs");
});

app.get("/register", (req,res) =>{
    res.render("register.ejs");
});

app.get("/login", (req,res) =>{
    res.render("login.ejs");
});

app.get("/home", (req, res) =>{
    res.render("home.ejs");
});

app.get("/factura", (req, res) =>{
    res.render("factura.ejs");
});

app.get("/compra", (req, res) =>{
    res.render("compra.ejs");
});

app.get("/carrito", (req, res) =>{
    res.render("carrito.ejs");
});

app.post("/register", (req, res) =>{
    res.render("home.ejs");
});

app.listen(port, ()=>{
    console.log("connected");
});

