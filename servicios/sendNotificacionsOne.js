var modelo = require('../models_sql/modelo_notificacion');

console.log("Prueba individual")

var FCM = require('fcm-node');


exports.servicioNotificacionFCM= function(campos){

    var serverKey = 'AIzaSyCDJ18xBiGj0zmEx0c3w3Y-uLc_89LQ85g'; //put your server key here
    var fcm = new FCM(serverKey);
    
    let token = campos.token;
    //obtengo la fecha y hora actual
    var hoy = new Date();
    let ano=hoy.getFullYear();
    let mes=hoy.getMonth()+1;
    let dia=hoy.getDay()

    let hora=hoy.getHours();
    let minutos=hoy.getMinutes();

    let fecha=ano+'-'+mes+'-'+dia+' || '+hora+':'+minutos

    console.log("fecha actual")
    console.log(fecha)

    var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)

        to: token, 
        //collapse_key: arraytokens,
        
        notification: {
            title: fecha+' ### '+campos.titulo, 
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
            console.log(err)
        } else {
            console.log("Successfully sent with response: ", response);
        }
    });

};
