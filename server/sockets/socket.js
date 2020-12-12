const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketcontrol = new TicketControl();

io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callback) => {
        let siguiente = ticketcontrol.siguiente(); //manda el nuevo tickeet 
        console.log(siguiente); //comando de node para que el servidor no se reinicie al guardar los JSON
        //nodemon server/server/ -e js,html
        callback(siguiente); //hace un callback para poder mandar el ticket a la funcion que lo muestra en el html 
    });

    client.emit('estadoActual', {
        actual: ticketcontrol.getUltimoTicket(), //obtieene el estado actual y corre la funcion de ultimo ticket
        ultimos4: ticketcontrol.getUltimos4() //obtiene los ultimos 4 tickets 

    });
    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            });
        }
        let atenderTicket = ticketcontrol.atenderTicket(data.escritorio);
        callback(atenderTicket);
        client.broadcast.emit('ultimos4', {
            ultimos4: ticketcontrol.getUltimos4()
        });
        //actua;lizar /notificar cambios en los ultimos 4 
    });

});