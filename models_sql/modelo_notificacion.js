var sql=require('mssql');
var config=require('../config_api/sql_config');


let notificacionModel={};

notificacionModel.getnotificaciones=(callback)=>{
    sql.connect(config.db_config,function(err1,res){
        if(err1){
          callback(null,err1);
        }else{
            console.log('CONEXION EXITOSA');
            var request=new sql.Request();
            request.query(`SELECT * FROM dbnotifica;`,function(err2,result){
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

notificacionModel.getTop20notificaciones=(callback)=>{
    sql.connect(config.db_config,function(err1,res){
        if(err1){
          callback(null,err1);
        }else{
            console.log('CONEXION EXITOSA');
            var request=new sql.Request();
            request.query(`SELECT TOP 10 * FROM dbnotifica;`,function(err2,result){
                if(err2){
                  callback(null,err2);
                }
                let data={};
                data=result.recordset;
                callback(data,null);
            });
        }
      });
}


notificacionModel.postNotificaciones=(data,callback)=>{
    sql.connect(config.db_config,function(err1,res){
        if(err1){
            callback(error1,null);
        }else{
            console.log('conexion exitosa');
            var request=new sql.Request();
            
            request.query(`insert into dbnotifica (titulo,mensaje,usuario) values ('${data.titulo}','${data.mensaje}','${data.usuario}');`,function(err2,result){
                if(err2){
                    console.log(err2);
                    callback(err2,null);
                }else{
                    let data={'respuesta':'agregacion exitosa'};
                
                    callback(null,data);
                }
                
            });
        }

    })
}


notificacionModel.requestIdDevice=(data,callback)=>{
    sql.connect(config.db_config,function(err1,res){
        if(err1){
          callback(null,err1);
        }else{
            console.log('CONEXION EXITOSA');
            var request=new sql.Request();
            request.query(`SELECT * FROM dbtoken where device='${data.idDevice}' ;`,function(err2,result){
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

notificacionModel.insertToken=(data,callback)=>{

    sql.connect(config.db_config,function(err1,res){
        if(err1){
            callback(error1,null);
        }else{
            console.log('conexion exitosa');
            var request=new sql.Request();
            
            request.query(`insert into dbtoken (device,token,telefono) values ('${data.device}','${data.token}','09999999999');`,function(err2,result){
                if(err2){
                    console.log(err2);
                    callback(err2,null);
                }else{
                    let data={'respuesta':'agregacion exitosa'};
                    callback(null,data);
                }
                
            });
        }

    })

}

notificacionModel.updateToke=(data,callback)=>{

    sql.connect(config.db_config,function(err1,res){
        if(err1){
            callback(error1,null);
        }else{
            console.log('conexion exitosa');
            var request=new sql.Request();
            
            request.query(`UPDATE dbtoken SET token = '${data.token}' WHERE device='${data.device}';`,function(err2,result){
                if(err2){
                    console.log(err2);
                    callback(err2,null);
                }else{
                    let data={'respuesta':'actualizacion exitosa'};
                    callback(null,data);
                }
                
            });
        }

    })

}

async function getAllNotificaciones(req,res){

    try{
        //establezco conexion con la base de datos
        let conexion=await sql.connect(config.db_config);
        let  request=new sql.Request();
        let respuesta=await request.query(`SELECT * FROM dbnotifica;`);
        console.log(respuesta);
        return respuesta;
        
    }catch(e){
        return {'respuesta':'error inesperado'}
    }
}

module.exports=notificacionModel;