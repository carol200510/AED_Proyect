import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import pg from "pg";

const port = 3000;
const app = express();

var nombre;
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

const db = new pg.Client({
    user: "postgres", 
    host: "localhost",
    database: "Fer3B",
    password: "123456",
    port: 5432
});
db.connect();

const admin = "user@gmail.com";

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
    res.render("home.ejs", {nombre:nombre});
});

app.get("/factura", (req, res) =>{
    res.render("factura.ejs");
});

app.get("/compra", async (req, res) =>{
    const listaProducto = await db.query("SELECT * from producto");
    
    let listaProducto2 = [];
    for(let i = 0; i < listaProducto.rowCount; i++){
        listaProducto2.push(listaProducto.rows[i]);
    }
    res.render("compra.ejs", {listaProducto2:listaProducto2});
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
     nombre=req.body.nombre;
    const apellido=req.body.apellido;
    const correo=req.body.correo;
    const contra=req.body.contra;

    if(req.body.correo === admin){
        res.render("home_admin.ejs");  
    }

    else{
        try {
            await db.query("INSERT INTO usuario(nombres, apellidos, correo, contra) VALUES($1, $2, $3, $4)", [nombre, apellido, correo, contra]);
        } catch (err) {
            console.log(err);
        }
        res.render("home.ejs", {nombre:nombre});
    }
   
});

app.post("/login", (req, res) =>{
   const correo=req.body.correo;
   const contra=req.body.contra;

   if(req.body.correo === admin){
       res.render("home_admin.ejs");  
   }

   else{
        res.redirect("/login");
   }
  
});

app.post("/articulos", async (req, res) =>{
    const nombreProducto=req.body.nombreProducto;
    const descripcion =req.body.descripcion;
    const precio =req.body.precio;
    const codigoEscaneo=req.body.codigoEscaneo;

    if(req.body.correo === admin){
        res.render("home_admin.ejs");  
    }

    else{
        try {
            await db.query("INSERT INTO producto(nombreProducto, descripcion, precio, codigoEscaneo) VALUES($1, $2, $3, $4)", [nombreProducto, descripcion, precio, codigoEscaneo]);
        } catch (err) {
            console.log(err);
        }
       res.redirect("/articulos");
    }
   
 });


app.listen(port, ()=>{
    console.log("connected");
});

