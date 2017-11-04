var http = require("http");
var port = 8686;

function randomInt (low, high) {
  return Math.floor(Math.random() * (high - low) + low);
}

http.createServer(function(req,res){
  console.log('New incoming client request for ' + req.url);
  //res.writeHeader(200, {'Content-Type': 'application/json'}); //#A
  
  if(req.headers['content-type']){
	  res.writeHeader(200, {'Content-Type': req.headers['content-type']});	  
  } else {
	  res.writeHeader(200, {'Content-Type': 'plain/text'});
  }
  
  switch(req.url) { //#B
	case '/actuators':
      res.write('{"actuators" : /leds}');
      break;
	case '/actuators/leds':
      res.write('{"leds" : /led#}');
      break;
    case '/actuators/leds/led#':
      res.write('{"led#" : Vermelho}');
      break;
	case '/sensors':
      res.write('"sensors" : ["/temperature","/light","/buttons","/acce1","/tilt"]');
      break;
	case '/sensors/temperature':
      res.write('{"temperature" :' + randomInt(1, 40) + '}'); //#C
      break;
    case '/sensors/light':
      res.write('{"light" :' + randomInt(1, 100) + '}');
      break;
	case '/sensors/buttons':
      res.write('{"buttons" : /1},' + '{"buttons" : /2}');
      break;
	case '/sensors/buttons/1':
      res.write('{"1" : button 1}');
      break;
    case '/sensors/buttons/2':
      res.write('{"2" : button 2}');
      break;
	case '/sensors/acce1':
	  res.write('"acce1" : ["/x","/y","/z"]');
      break;
	case '/sensors/acce1/x':
      res.write('{"Acceleration" : "value X"}');
      break;
    case '/sensors/acce1/y':
      res.write('{"Acceleration" : "value Y"}');
      break;
	case '/sensors/acce1/z':
      res.write('{"Acceleration" : "value Z"}');
      break;
	case '/sensors/tilt':
      res.write('"tilt" : ["/x","/y","/z"]');
      break;
    case '/sensors/tilt/x':
      res.write('{"Gyroscope" : "value X"}');
      break;
	case '/sensors/tilt/y':
      res.write('{"Gyroscope" : "value Y"}');
      break;
	case '/sensors/tilt/z':
      res.write('{"Gyroscope" : "value Z"}');
      break;
    default:
      res.write('{"not" : "found"}');
  }
  res.end();
}).listen(port);
console.log('Server listening on http://localhost:' + port);

//#A Setting the header to announce we return JSON representations
//#B Read the request URL and provide responses accordingly
//#C Write the temperature result as JSON
//#D Causes to return the results to the client

