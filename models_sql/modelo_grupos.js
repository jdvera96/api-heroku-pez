var sql=require('mssql');
var config=require('../config_api/sql_config');


let gruposModel={};
gruposModel.getGrupos=(callback)=>{
    sql.connect(config.db_config,function(err1,res){
        if(err1){
          callback(null,err1);
        }else{
            console.log('CONEXION EXITOSA');
            var request=new sql.Request();
            request.query(`select tipo,codigo,nombre from dbtablas where tipo = 'GRU' and accesorio=0;`,function(err2,result){
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

gruposModel.getGruposId=(campos,callback)=>{
    sql.connect(config.db_config,function(err1,res){
        if(err1){
          callback(null,err1);
        }else{
            console.log('CONEXION EXITOSA');
            var request=new sql.Request();
            request.query(`select tipo,codigo,nombre from dbtablas where tipo = 'GRU' and codigo='${campos.idGrupo}';`,function(err2,result){
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


module.exports=gruposModel;