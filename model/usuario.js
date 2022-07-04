var conexao = require('../config/conexao.js');

var UsuarioSchema = conexao.Schema({
    nome:{type:"String"},
    email:{type:"String"},
    senha:{type:"String"},
    exp_trabalho:{type:"Number"},
    datanasc:{type: "Date"},
    foto:{type:"String"}
});

module.exports = conexao.model("Usuario", UsuarioSchema);