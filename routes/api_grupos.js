var express = require('express');
var router = express.Router();
var modeloGruposPlatos=require('../models_sql/modelo_grupos');

//importo el driver mssql para realizar consultas a la base de datoss
var sql=require('mssql');
//importo el modelo notificaciones

/* GET users listing. */
router.get('/', function(req, res, next) {
    modeloGruposPlatos.getGrupos(function(err,data){
        if(err){
            res.send([{'respuesta':err}]);
        }
        console.log(data);
        res.send(data);
    });
    
});


router.get('/individual',function(req,res,next){
    //recupero el id del grupo y del plato especifico
    const idGrupo=req.body.idGrupo

    campos={'idGrupo':idGrupo}
    modeloGruposPlatos.getGruposId(campos,function(err,data){
        if(err){
            res.send([{'respuesta':err}]);
        }
        console.log("resultado de la consulta del plato: "+data);
        res.send([{'respuesta':data}]);
    });
});

module.exports = router;