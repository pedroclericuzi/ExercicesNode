var coap = require('../../wot-book-master/chapter7-implementation/part1-2-direct-gateway/node_modules/coap'),
  utils = require('../../wot-book-master/chapter7-implementation/part1-2-direct-gateway/utils/utils');

var port = 5683;
function randomInt (low, high) {
  return Math.floor(Math.random() * (high - low) + low);
}

coap.createServer(function (req, res) {
  console.info('CoAP device got a request for %s', req.url);
  console.info('CoAP device got a request for %s', req.headers['Accept']);

  var response = '</actuators/leds>;if="leds"' +
  '</sensors/light>;if="light"' +
  '</sensors/temperature>;if="temperature"' +
  '</sensors/buttons/1>;if="1"' +
  '</sensors/buttons/2>;if="2"' +
  '</sensors/accel/x>;if="x"' +
  '</sensors/accel/y>;if="y"' +
  '</sensors/accel/z>;if="z"' +
  '</sensors/tilt/x>;if="x"' +
  '</sensors/tilt/y>;if="y"' +
  '</sensors/tilt/z>;if="z"'
  
  switch (req.url) { //#C
    case "/.well-known/core":
      respond(res, response, req); //#D
      break;
    default:
      respond(res, req);
  }
  
}).listen(port, function () {
  console.log("CoAP server started on port %s", port)
});

function respond(req, res, content) { 
  res.setOption('Content-Format', 'application/link-format');
  res.code = '2.05';
  res.end(content);
};
