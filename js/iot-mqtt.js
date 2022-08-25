var clientId = "iot" + Math.random();
// Create a client instance
var client = new Paho.MQTT.Client("192.168.1.13", 9001, clientId);

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client
client.connect({onSuccess:onConnect});


// called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("Nos conectamos a websocket");
  //aqui nos subscribimos a los topicos
    client.subscribe("casa/puerta");
    client.subscribe("casa/fuente");
  
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
  }
}

// Cuando los mensajes a lo que estamos subscritos llegan
function onMessageArrived(message) {
  console.log(message.destinationName +":"+ message.payloadString);
  var elemento = document.getElementById("puerta");
  if(message.destinationName == "casa/puerta")
  {
    if(message.payloadString == "abierto")
    {
      elemento.src = "imagenes/pabierta.jpg";
    }
    else
    {
      elemento.src = "imagenes/pcerrada.jpg";
    }
    document.getElementById("estatusA").textContent = message.payloadString;
    
  }

}