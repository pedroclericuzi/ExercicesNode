const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://broker.hivemq.com');

client.on('connect', () => {
    console.log('connected');
    client.subscribe("temperatura");
})
client.on('message', (topic, message) => {
  console.log('received message %s %s', topic, message)
})
