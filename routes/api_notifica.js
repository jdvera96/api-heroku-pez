var express = require('express');
var router = express.Router();

//importo el driver mssql para realizar consultas a la base de datoss
var sql=require('mssql');
//importo el modelo notificaciones
var modeloNotificacion=require('../models_sql/modelo_notificacion');

/* GET notificaciones listing. */
router.get('/', function(req, res, next) {
    modeloNotificacion.getnotificaciones(function(err,data){
        console.log(data);
        res.send(data);
    });
    
});

router.get('/top10', function(req, res, next) {
    modeloNotificacion.getnotificaciones(function(err,data){
        console.log(data);
        res.send(data);
    });
    
});

router.post('/',function(req,res,next){
    let id=req.body.id
    let titulo=req.body.titulo
    let texto=req.body.mensaje;
    let tipo=req.body.tipo;

    let campos={'titulo': req.body.titulo,'mensaje':req.body.mensaje,'usuario':req.body.usuario,'tipo':req.body.tipo}

    modeloNotificacion.postNotificaciones(campos,function(err,data){
        if(err){
            res.send([{'respuesta':err}])
        }else{
            res.send({'respuesta':'notificacion agregada correctamente'});
        }
    });
});

module.exports = router;