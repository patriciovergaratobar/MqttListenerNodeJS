const mqtt = require('mqtt');
const http = require('http');
const WebSocketServer = require('websocket').server;
const mongoose = require('mongoose');

//connection Mongo
mongoose.connect('mongodb://127.0.0.1:27017/monitorNode', { useMongoClient: true });
let db = mongoose.connection;
let Evento = mongoose.model('Evento', { datos: Object });
let insertEventos = (eventBus) => {
    let coleccion = new Evento({ datos: transformarMsg(eventBus), done: false });
    coleccion.save((err) => { if (err) return handleError(err); });
};
/** Function Parse message Mqtt to JSON. */
let transformarMsg = (msg) => JSON.parse(msg.toString());

//CLIENT MQTT
let clienteMqtt = mqtt.connect('mqtt://localhost:1883')
let topicos = ['cl/topicoA', 'com/topicoA', 'com/topicoB'];
clienteMqtt.on('connect', () => topicos.forEach((t) => clienteMqtt.subscribe(t)));
clienteMqtt.on('message', (topic, message) => console.log("\nMessage MQTT:\n".concat(message.toString())));
clienteMqtt.on('message', (topic, message) => insertEventos(message));

// SERVER WEB SOCKET
const server = http.createServer((request, response) => {});
server.listen(8282, () => {});
wsServer = new WebSocketServer({ httpServer: server });
wsServer.on('request', (request) => {
    let connection = request.accept(null, request.origin);
    let transformarMsg = (msg) => JSON.parse(msg.toString());
    connection.on('message', (msg) => {
        console.log("MSG WS");
        Evento.find(function(err, todos) {
            if (err) {
                connection.send(JSON.stringify(err));
            }
            connection.send(JSON.stringify(todos));
        });
    });
    connection.on('close', (connection) => console.log("End WebSocket"));
    clienteMqtt.on('message', (topic, message) => connection.send(JSON.stringify([{ tipo: "mqtt", fuente: "topic", datos: transformarMsg(message) }])));
});
