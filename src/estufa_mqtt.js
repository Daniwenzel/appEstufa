const hostname = '192.168.1.7';
const port = 1884;
let clientId = "estufa";
clientId += new Date().getUTCMilliseconds();
const subscribe1 = "sensor/umidade";
const subscribe2 = "sensor/temperatura";
const subscribe3 = "sensor/agua/temperatura";
const subscribe4 = "sensor/agua/condutividade";

mqttClient = new Paho.MQTT.Client(hostname, port, clientId);
mqttClient.onMessageArrived =  MessageArrived;
mqttClient.onConnectionLost = ConnectionLost;
Connect();

function Connect(){
	mqttClient.connect({
		onSuccess: Connected,
		onFailure: ConnectionFailed,
		keepAliveInterval: 10,
		useSSL: false,
	});
}

function Connected() {
  console.log("Connected");
  console.log(mqttClient);

  mqttClient.subscribe(subscribe1);
  mqttClient.subscribe(subscribe2);
  mqttClient.subscribe(subscribe3);
  mqttClient.subscribe(subscribe4);
}

function ConnectionFailed(res) {
	console.log("Connect failed:" + res.errorMessage);
}

function ConnectionLost(res) {
  if (res.errorCode != 0) {
	console.log("Connection lost:" + res.errorMessage);
	Connect();
  }
}

function MessageArrived(message) {
	console.log(message.destinationName +" : " + message.payloadString);
	addData(message.destinationName, message.payloadString);
	//switch(message.destinationName){
		/*case "light1st":
			switch(message.payloadString){



			case "1":
				document.getElementById('led1st').innerHTML = "Turned on";
				document.getElementById('led1btn').innerHTML = "Turn off";
				document.getElementById("led1btn").classList.remove('btn-success');
				document.getElementById("led1btn").classList.add('btn-danger');
				break;
			case "0":
				document.getElementById('led1st').innerHTML = "Turned off";
				document.getElementById('led1btn').innerHTML = "Turn on";
				document.getElementById("led1btn").classList.remove('btn-danger');
				document.getElementById("led1btn").classList.add('btn-success');
				break;
			}
			break;
		case "light2st":
			switch(message.payloadString){
				case "1":
					document.getElementById('led2st').innerHTML = "Turned on";
					document.getElementById('led2btn').innerHTML = "Turn off";
					document.getElementById("led2btn").classList.remove('btn-success');
					document.getElementById("led2btn").classList.add('btn-danger');
					break;
				case "0":
					document.getElementById('led2st').innerHTML = "Turned off";
					document.getElementById('led2btn').innerHTML = "Turn on";
					document.getElementById("led2btn").classList.remove('btn-danger');
					document.getElementById("led2btn").classList.add('btn-success');
					break;
			}
			break;
		case "temp":
			document.getElementById('tempdata').innerHTML = message.payloadString;
			break;*/
	//}
}

function addData(label, data) {
    console.log('chamou a funcao');
    this.lineCanvas.data.labels.push(label);
    this.lineCanvas.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    this.lineCanvas.update();
}