var modelo = require('../models_sql/modelo_notificacion');

console.log("Prueba prueba")

var FCM = require('fcm-node');

function obtenerTodoslosTokens(){
    let arraytokens = [];
    modelo.getAllTokens((err,data)=>{
        if(err){
            console.log(err);
        }else{
            for (let index = 0; index < data.length; index++) {
                let token = data[index]["token"];
                //console.log(token);
                arraytokens.push(token);
            }
            
        
        }
        console.log("listo222",arraytokens);
        return arraytokens;
    }) 
    console.log("listo333",arraytokens);

}

exports.servicioNotificacionFCM= function(campos){

    var serverKey = 'AIzaSyCDJ18xBiGj0zmEx0c3w3Y-uLc_89LQ85g'; //put your server key here
    var fcm = new FCM(serverKey);
    var arraytokens = [];

    modelo.getAllTokens((err,data)=>{
        if(err){
            console.log(err);
        }else{
            for (let index = 0; index < data.length; index++) {
                let token = data[index]["token"];
                var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)

                    to: token, 
                    //collapse_key: arraytokens,
                    
                    notification: {
                        title: campos.titulo, 
                        body: campos.mensaje 
                    },
                    
                    data: {  //you can send only notification or only data(or include both)
                        my_key: 'my value',
                        my_another_key: 'my another value'
                    }/*,
                    token: arraytokens[arraytokens.length-1]*/
                };
            
                fcm.send(message, function(err, response){
                    if (err) {
                        console.log("Something has gone wrong!");
                    } else {
                        console.log("Successfully sent with response: ", response);
                    }
                });
                //arraytokens.push(token);
            }
           
            
            
        
        }
    }) 

    /*var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)

        //to: 'eXKLBpVDD_c:APA91bF0XcF2FFzo93mUYD8dXQ3aK0oSp1cKhxDhVMAlpJ31yIOBCtQ-AOpJBruBvXIiATsP7pEgRuoJt9wT3KqyBKgrykXhErOPjXdcvfTNmlmxBr4VjEGIBvvPYrkjCfUUIeokEzxY', 
        //collapse_key: 'eXKLBpVDD_c:APA91bF0XcF2FFzo93mUYD8dXQ3aK0oSp1cKhxDhVMAlpJ31yIOBCtQ-AOpJBruBvXIiATsP7pEgRuoJt9wT3KqyBKgrykXhErOPjXdcvfTNmlmxBr4VjEGIBvvPYrkjCfUUIeokEzxY',
        
        notification: {
            title: 'Probando 4', 
            body: 'Prueba en api' 
        },
        
        data: {  //you can send only notification or only data(or include both)
            my_key: 'my value',
            my_another_key: 'my another value'
        },
        token: arraytokens[arraytokens.length-1]
    };

    fcm.send(message, function(err, response){
        if (err) {
            console.log("Something has gone wrong!");
        } else {
            console.log("Successfully sent with response: ", response);
        }
    });*/


};
