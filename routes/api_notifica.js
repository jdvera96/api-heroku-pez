var express = require('express');
var router = express.Router();
var send=require('../servicios/sendNotifications');
var sendIndividual=require('../servicios/sendNotificacionsOne');


//importo el driver mssql para realizar consultas a la base de datoss
var sql=require('mssql');
//importo el modelo notificaciones
var modeloNotificacion=require('../models_sql/modelo_notificacion');

/* GET notificaciones listing. */
router.get('/', function(req, res, next) {
    modeloNotificacion.getnotificaciones(function(err,data){
        if(err){
            res.send([{'respuesta':err}]);
        }
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

    let campos={'titulo': req.body.titulo,'mensaje':req.body.mensaje,'tipo':req.body.tipo}

    modeloNotificacion.postNotificaciones(campos,function(err,data){
        if(err){
            res.send([{'respuesta':err}]);
        }else{
            send.servicioNotificacionFCM(campos);
            res.send(data);
        }
    });

});


router.post('/individual',function(req,res,next){

    let campos={'token': req.body.token,'titulo': req.body.titulo,'mensaje':req.body.mensaje,'usuario':req.body.usuario,'tipo':req.body.tipo}

    modeloNotificacion.postNotificaciones(campos,function(err,data){
        if(err){
            res.send([{'respuesta':err}]);
        }else{
            sendIndividual.servicioNotificacionFCM(campos);
            res.send(data);
        }
    });

});

module.exports = router;