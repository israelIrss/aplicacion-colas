//comando para establecer la comunicacion o conexion
var socket = io();
var label = $('#lblNuevoTicket'); // JQUERY busca dentro del html una variable con ese nombre 
socket.on('connect', function() { //esta funcion muestra si esta conectado 
    console.log('Conectado al servidor ');
});
socket.on('disconect', function() { //esta funcion muestra si esta conectado 
    console.log('desconectado al servidor ');
});
socket.on('estadoActual', function(resp) {
    console.log(resp);
    label.text(resp.actual);
});

$('button').on('click', function() { // todos los clicks en la pagina activan eta funcion 
    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        label.text(siguienteTicket);

    }); //llama a la funcion que manda los nuevos tickets 
});