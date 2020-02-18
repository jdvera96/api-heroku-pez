var sql=require('mssql');
var config=require('../config_api/sql_config');


let platosModel={};
platosModel.getPlatos=(campos,callback)=>{
    sql.connect(config.db_config,function(err1,res){
        if(err1){
          callback(null,err1);
        }else{
            console.log('CONEXION EXITOSA');
            var request=new sql.Request();
            request.query(`select codigo,nombre,precio from fcproduc where grupo = '${campos.idGrupo}';`,function(err2,result){
                if(err2){
                  callback(err2,null);
                }
                let data={};
                data=result.recordset;
                callback(null,data);
            });
        }
      });
}


platosModel.getPlatosId=(campos,callback)=>{
    sql.connect(config.db_config,function(err1,res){
        if(err1){
          callback(null,err1);
        }else{
            console.log('CONEXION EXITOSA');
            var request=new sql.Request();
            request.query(`select codigo,nombre,precio from fcproduc where grupo = '${campos.idGrupo}' and codigo='${campos.idPlato}';`,function(err2,result){
                if(err2){
                  callback(err2,null);
                }
                let data={};
                data=result.recordset;
                callback(null,data);
            });
        }
      });
}

module.exports=platosModel;