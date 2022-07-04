const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var cookieParser = require("cookie-parser");
var path = require("path");
var Usuario = require("./model/usuario.js");
var upload = require("./config/configMulter.js");

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.set("view engine", "ejs"); 

app.use(express.static(path.join(__dirname, "public")));

app.get('/', function(req, res){
    Usuario.find({}).exec(function(err, docs){
    res.render("index.ejs", {Usuarios:docs});
    });
});

app.get('/add', function(req, res){
    res.render('add.ejs');
});

app.post('/add', upload.single("foto"), function(req, res){
    var usuario = new Usuario({
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha,
        exp_trabalho: req.body.exp_trabalho,
        datanasc: req.body.datanasc,
        foto: req.file.filename
    });
    usuario.save(function(err){
        if(err){
            console.log("ERR");
        }else{
            res.redirect('/');
        }
    });
});

app.get('/del/:id', function(req, res){
    Usuario.findByIdAndDelete(req.params.id, function(err){
        if(err){
            console.log(err);
        }else {
           res.redirect('/');
        }
    });
    console.log(req.params.id);
});

app.get('/edt/:id', function(req, res){
    Usuario.findById(req.params.id, function(err, docs){
        if(err){
            console.log(err);
        }else {
            res.render('edt.ejs', {Usuario: docs});  
        }  
    });
});

app.post('/edt/:id', upload.single("foto"),function(req, res){
    Usuario.findByIdAndUpdate(req.params.id, 
        {nome: req.body.nome, 
         email: req.body.email, 
         senha: req.body.senha, 
         exp_trabalho: req.body.exp_trabalho,
         datanasc: req.body.datanasc,
         foto:req.file.filename
        }, function(err, docs){
            res.redirect('/');
        });
});

app.post('/', function(req, res){
    Usuario.find({nome: new RegExp(req.body.pesquisa, 'gi')}).exec(function(err, docs){
        res.render('index.ejs', {Usuarios: docs});
    });
});

app.listen(3000, function(){
    console.log("Conexão inicializada.");
});