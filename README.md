# MqttListenerNodeJS

Mqtt listener and Web Socket for the view from a client

To build this application, you must have the following in the development environment:

- ActiveMQ [on docker](https://hub.docker.com/r/webcenter/activemq/) and you can used script [installDockerActiveMQ.sh](https://github.com/patriciovergaratobar/MqttListenerNodeJS/blob/master/bashUtils/installDockerActiveMQ.sh) and script [initDockerActiveMQ.sh](https://github.com/patriciovergaratobar/MqttListenerNodeJS/blob/master/bashUtils/initDockerActiveMQ.sh) for server start. 
- MongoDB
- NodeJS> 7.0v

Install the necessary libraries:

```sh
npm install mqtt
npm install http
npm install websocket
npm install mongoose

#or you can use
sh npmInstall.sh
```

Start the application:

```sh
node main.js
```

To visualize what arrives in the topics and what is saved, you can open the client on a web browser.

```sh
clienteWeb/index.html
```
