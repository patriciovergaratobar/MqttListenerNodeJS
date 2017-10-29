var ws = new WebSocket("ws://127.0.0.1:8282/");

ws.onopen = function() {
    ws.send("Hola Servidor");
};

ws.onmessage = function(evt) {
    console.info("Mensaje entregado");
    console.dir(evt);
    var lista = document.getElementById("listadoId").innerHTML;
    document.getElementById("listadoId").innerHTML = "<p>" + evt.data.toString() + "</p>" + lista

};

ws.onclose = function() {
    alert("Cerrar");
};

ws.onerror = function(err) {
    alert("Error: " + err);
};


var enviar = function(obj) {
    ws.send(obj);
};