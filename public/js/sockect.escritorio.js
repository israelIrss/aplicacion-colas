var socket = io(); //establece la conexion
var searchParamas = new URLSearchParams(window.location.search);
if (!searchParamas.has('escritorio')) {
    window.location = 'index.html'; // te saca de la pantalla o cambia a donde le pongas
    throw new Error('El escritorio es necesario');
} //busca el escritorio del URL
var escritorio = searchParamas.get('escritorio');
var label = $('small'); //eticketa creada por si vasa a modificar mucho un parametro del html
console.log(escritorio);
$('h1').text('Escritorio: ' + escritorio); //codigo para colocar en los label etc
$('button').on('click', function(resp) {
    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {
        if (resp === 'No hay mas tickets') {
            label.text(resp); //muestra que ya no hay tickets
            alert(resp);
            return;

        }
        label.text('Ticket: ' + resp.numero); //coloca la respuesta en el label
    });
})