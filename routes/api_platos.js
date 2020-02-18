var express = require('express');
var router = express.Router();
var modeloPlatos=require('../models_sql/modelo_platos');

//importo el driver mssql para realizar consultas a la base de datoss
var sql=require('mssql');
//importo el modelo notificaciones

/* GET users listing. */
router.get('/:id', function(req, res, next) {

    let idGrupo=req.params.id
    console.log('grupo obtenido: ',idGrupo);
    campos={'idGrupo':idGrupo}
    modeloPlatos.getPlatos(campos,function(err,data){
        if(err){
            res.send([{'respuesta':err}]);
        }
        console.log(data);
        res.send(data);
    });
    
});

router.get('/individual',function(req,res,next){
    //recupero el id del grupo y del plato especifico
    const idPlato=req.body.idPlato;
    const idGrupo=req.body.idGrupo

    campos={'idPlato':idPlato, 'idGrupo':idGrupo}
    modeloPlatos.getPlatosId(campos,function(err,data){
        if(err){
            res.send([{'respuesta':err}]);
        }
        console.log("resultado de la consulta del plato: "+data);
        res.send([{'respuesta':data}]);
    });
});


module.exports = router;