var http = require("http");
var port = 8686;

function randomInt (low, high) {
  return Math.floor(Math.random() * (high - low) + low);
}

http.createServer(function(req,res){
  res.writeHeader(200, {"Content-Type":"text/event-stream"
   , "Cache-Control":"no-cache"
   , "Connection":"keep-alive"
   , "Access-Control-Allow-Origin": "*"});
  //res.writeHeader(200, {'Content-Type': 'plain/text'});
  switch(req.url) {
  	case '/actuators':
        res.write('data: {"actuators" : /leds}' + '\n\n');
        break;
  	case '/actuators/leds':
        res.write('data: {"leds" : /led#}' + '\n\n');
        break;
      case '/actuators/leds/led#':
        res.write('data: {"led#" : Vermelho}' + '\n\n');
        break;
  	case '/sensors':
        res.write('data: {"sensors" : ["/temperature","/light","/buttons","/acce1","/tilt"]}' + '\n\n');
        break;
  	case '/sensors/temperature':
        var interval = setInterval( function() {
          res.write('data: {"temperature" :' + randomInt(1, 40) + '}' + '\n\n');
        },2000);
        break;
    case '/sensors/light':
        var interval = setInterval( function() {
          res.write('data: {"light" :' + randomInt(1, 100) + '}' + '\n\n');
        },2000);
        break;
  	case '/sensors/buttons':
        res.write('data: {"buttons" : /1},' + '{"buttons" : /2}' + '\n\n');
        break;
  	case '/sensors/buttons/1':
        res.write('data: {"1" : button 1}' + '\n\n');
        break;
    case '/sensors/buttons/2':
        res.write('data: {"2" : button 2}' + '\n\n');
        break;
  	case '/sensors/acce1':
  	  res.write('data: {"acce1" : ["/x","/y","/z"]}' + '\n\n');
        break;
  	case '/sensors/acce1/x':
        res.write('data: {"Acceleration" : "value X"}' + '\n\n');
        break;
    case '/sensors/acce1/y':
        res.write('data: {"Acceleration" : "value Y"}' + '\n\n');
        break;
  	case '/sensors/acce1/z':
        res.write('data: {"Acceleration" : "value Z"}' + '\n\n');
        break;
  	case '/sensors/tilt':
        res.write('data: {"tilt" : ["/x","/y","/z"]}' + '\n\n');
        break;
    case '/sensors/tilt/x':
        res.write('data: {"Gyroscope" : "value X"}' + '\n\n');
        break;
  	case '/sensors/tilt/y':
        res.write('data: {"Gyroscope" : "value Y"}' + '\n\n');
        break;
  	case '/sensors/tilt/z':
        res.write('data: {"Gyroscope" : "value Z"}' + '\n\n');
        break;
    default:
        res.write('data: "not found"}' + '\n\n');
  }
}).listen(port);
console.log('Server listening on http://localhost:' + port);
