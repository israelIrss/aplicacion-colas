const fs = require('fs');
const { runInThisContext } = require('vm');
class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}
class TicketControl {
    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.ultimos4 = [];
        this.tickets = []; //incluye los tickets que no han sido atendidos
        let data = require('../data/data.json'); //se importa el json de donde se estan obteniendo los datos 
        console.log(data);
        if (data.hoy === this.hoy) { //verifica si es del dia actual o cambio de dia 
            this.ultimo = data.ultimo; //se coloca la data como ultimo
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        } else {
            this.reiniciarConteo();
        }
    }
    siguiente() {
        this.ultimo += 1;
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);
        this.grabararchivo();
        return `Ticket ${this.ultimo}`; //va a regresar ticket 

    }
    getUltimoTicket() {
        return `Ticket ${this.ultimo}`; // regresa el ultimo ticket 
    }
    getUltimos4() {
        return this.ultimos4; // regresa solo los ultimos 4 
    }
    atenderTicket(escritorio) {
        if (this.tickets.length === 0) {
            return 'No hay mas tickets';
        }
        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift();

        let atenderTicket = new Ticket(numeroTicket, escritorio);
        this.ultimos4.unshift(atenderTicket); //lo agrega al inicio del arreglo
        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1); //borra el ultimo elemento de un arreglo
        }
        console.log('ultimos 4');
        console.log(this.ultimos4);
        this.grabararchivo();
        return atenderTicket;
    }
    reiniciarConteo() {
        this.tickets = [];
        this.ultimos4 = [];
        this.ultimo = 0;
        console.log('se ha inicializado el sistema');
        this.grabararchivo();
        return `Ticket ${this.ultimo}`;

    }
    grabararchivo() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        }
        let jsonDataString = JSON.stringify(jsonData); //transforma a string para poder grabarlo en el archivo 
        fs.writeFileSync('./server/data/data.json', jsonDataString); //escribe en json 
        console.log('se ha inicializado el sistema');
    }


}

module.exports = {
    TicketControl
}