var coap = require('../../wot-book-master/chapter7-implementation/part1-2-direct-gateway/node_modules/coap'),
  utils = require('../../wot-book-master/chapter7-implementation/part1-2-direct-gateway/utils/utils');

var port = 5683;
function randomInt (low, high) {
  return Math.floor(Math.random() * (high - low) + low);
}

coap.createServer(function (req, res) {
  console.info('CoAP device got a request for %s', req.url);
  console.info('CoAP device got a request for %s', req.headers['Accept']);

  switch (req.url) {
    case "/co2":
      respond(req, res, '{"co2" :' + randomInt(1, 40) + '}'); 
      break;
    case "/temp":
      respond(req, res, '{"temperature" :' + randomInt(1, 40) + '}');
      break;
    default:
      respond(req, res);
  }
}).listen(port, function () {
  console.log("CoAP server started on port %s", port)
});

function respond(req, res, content) { 
  if (content) {

    switch (req.headers['Accept']) {
      case "application/xml":
        res.setOption('Content-Format', ''+req.headers['Accept']+'');
        break;
      case "text/html":
        res.setOption('Content-Format', ''+req.headers['Accept']+'');
        break;
      case "text/plain":
        res.setOption('Content-Format', ''+req.headers['Accept']+'');
        break;
      default:
        res.setOption('Content-Format', 'application/json');
    }
    //res.code = '2.05';
    res.end(content);
  } else {
    res.code = '4.04';
    res.end();
  }
};
