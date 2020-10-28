const fs = require('fs');

class Ticket {

    constructor(numero, escritorio) {

            this.numero = numero;
            this.escritorio = escritorio;

        } // end constructor

} // end the class Ticket

class TicketControl {

    constructor() {

            this.ultimo = 0;
            this.hoy = new Date().getDate();
            this.tickets = [];
            this.ultimos4 = [];

            let data = require('../data/data.json');

            if (data.hoy === this.hoy) {

                this.ultimo = data.ultimo;
                this.tickets = data.tickets;
                this.ultimos4 = data.ultimos4;

            } else {
                this.reiniciarConteo();
            }

        } // end constructor

    siguiente() {

            this.ultimo += 1;

            let ticket = new Ticket(this.ultimo, null);

            this.tickets.push(ticket);

            this.grabarArchivo();

            return `Ticket ${ this.ultimo }`;

        } // End siguiente    

    getUltimoTicket() {
            return `Ticket ${this.ultimo}`;
        } // end getUltmoTicket

    getUltimos4() {
            return this.ultimos4;
        } // end getUltmos4

    atenderTicket(escritorio) {

            if (this.tickets.length === 0) {
                return 'No hay tickets';
            }

            let numeroTicket = this.tickets[0].numero;
            this.tickets.shift(); // shift borra ese elemento del arreglo

            let atenderTicket = new Ticket(numeroTicket, escritorio);

            this.ultimos4.unshift(atenderTicket); // Agrega al inicio de un arreglo

            if (this.ultimos4.length > 4) {
                this.ultimos4.splice(-1, 1); // borra el ultimo elem¿nto del array
            }

            console.log('ultimos 4');
            console.log(this.ultimos4);

            this.grabarArchivo();

            return atenderTicket;

        } // end atenderTicket

    reiniciarConteo() {

            this.ultimo = 0;
            this.tickets = [];
            this.ultimos4 = [];

            console.log('Se ha iniicalizado el sistema');
            this.grabarArchivo();

        } // End reiniciaConteo


    grabarArchivo() {

            let jsonData = {
                ultimo: this.ultimo,
                hoy: this.hoy,
                tickets: this.tickets,
                ultimos4: this.ultimos4
            };

            let jsonDataString = JSON.stringify(jsonData);

            fs.writeFileSync('./server/data/data.json', jsonDataString);


        } // End grabarArchivo


} // End Classe


module.exports = {
    TicketControl
}