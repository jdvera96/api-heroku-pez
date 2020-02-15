var express = require('express');
var router = express.Router();


//importo el driver mssql para realizar consultas a la base de datoss
var sql=require('mssql');
//importo el modelo notificaciones
var modeloNotificacion=require('../models_sql/modelo_notificacion');

/* GET token listing. */
router.get('/:id',function(req,res,next){
    const id=req.params.id;
    console.log('id del dispositivo: '+id);

    campos={'idDevice':id}
    modeloNotificacion.requestIdDevice(campos,function(err,data){
        if(err){
            res.send([{'respuesta':err}]);
        }
        console.log("resultado de la consulta del idDevice: "+data.length);
        res.send([{'respuesta':data}]);
    });
});

router.post('/insert',function(req,res,next){

    console.log(req)
    campos={device:req.body.Device,
            token: req.body.Token
    }

    modeloNotificacion.insertToken(campos,function(err,data){
        if(err){
            res.send([{'respuesta':err}]);
        }
        res.send([{'respuesta':data}]);
    })
});

router.post('/update',function(req,res,next){

    console.log(req)
    campos={device:req.body.Device,
            token: req.body.Token
    }

    modeloNotificacion.updateToke(campos,function(err,data){
        if(err){
            res.send([{'respuesta':err}]);
        }
        res.send([{'respuesta':data}]);
    })
});

module.exports = router;