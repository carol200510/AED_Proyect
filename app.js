import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import pg from "pg";

const port = 3000;
const app = express();

const db = new pg.Client({
    user: "postgres", 
    host: "localhost",
    database: "Ferreteria",
    password: "26032015",
    port: 5432
});
db.connect();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

const admin = "user@gmail.com";

app.get("/", (req,res) =>{
    res.render("index.ejs");
    console.log(db.query("SELECT * FROM cliente"));
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

app.get("/home_admin", (req,res) =>{
    res.render("home_admin.ejs");
});

app.get("/articulos", (req,res) =>{
    res.render("articulos.ejs");
})

app.post("/register", async (req, res) =>{
    const nombre=req.body.nombre;
    const apellido=req.body.apellido;
    const correo=req.body.correo;
    const contra=req.body.contra;

    if(req.body.correo === admin){
        res.render("home_admin");  
    }

    else{
        try {
            await db.query("INSERT INTO cliente(nombres) VALUES($1)", [nombre]);
        } catch (err) {
            console.log(err);
        }
        res.render("home.ejs");
    }
   
});

app.listen(port, ()=>{
    console.log("connected");
});

