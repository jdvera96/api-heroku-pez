console.log("Prueba prueba")

var FCM = require('fcm-node');

exports.servicioNotificacionFCM=function(){
    var serverKey = 'AIzaSyCDJ18xBiGj0zmEx0c3w3Y-uLc_89LQ85g'; //put your server key here
    var fcm = new FCM(serverKey);

    var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
        to: 'dbcv_ilMG58:APA91bEIPWhLrOyy6dv3xJJM6oCS-KZ1KD5vcH4cx9cl6WwFfivRfNEgECdW0GgW_zV0GPPq12lji07e1E9T6QC5rXB3wkMN9e3nHpt8tBYHCf-QAbcmU-x7FR15GUTvN9aQX1iAeiw1', 
        collapse_key: 'dbcv_ilMG58:APA91bEIPWhLrOyy6dv3xJJM6oCS-KZ1KD5vcH4cx9cl6WwFfivRfNEgECdW0GgW_zV0GPPq12lji07e1E9T6QC5rXB3wkMN9e3nHpt8tBYHCf-QAbcmU-x7FR15GUTvN9aQX1iAeiw1',
        
        notification: {
            title: 'Probando 4', 
            body: 'Prueba en api' 
        },
        
        data: {  //you can send only notification or only data(or include both)
            my_key: 'my value',
            my_another_key: 'my another value'
        }
    };

    fcm.send(message, function(err, response){
        if (err) {
            console.log("Something has gone wrong!");
        } else {
            console.log("Successfully sent with response: ", response);
        }
    });


};
