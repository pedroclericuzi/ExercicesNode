var coap = require('coap'),
  utils = require('../../wot-book-master/chapter7-implementation/part1-2-direct-gateway/utils/utils');

var port = 5683;

coap.createServer(function (req, res) {
  console.info('CoAP device got a request for %s', req.url);

  if (req.headers['Accept'] != 'application/json') {
  	res.setHeader('Content-Type', 'application/json');
  } 

  switch (req.url) {
    case "/co2":
      respond(res, {'co2': utils.randomInt(0, 1000)}); 
      break;
    case "/temp":
      respond(res, {'temp': utils.randomInt(0, 40)});
      break;
    default:
      respond(res);
  }
}).listen(port, function () {
  console.log("CoAP server started on port %s", port)
});

function respond(res, content) { 
  if (content) {
    res.setOption('Content-Format', 'application/json');
    res.code = '2.05';
    res.end(JSON.stringify(content));
  } else {
    res.code = '4.04';
    res.end();
  }
};
