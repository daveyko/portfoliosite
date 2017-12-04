let express = require('express');
let path = require('path');

let app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(8080, function() {
  console.log('~~~~ Server listening on 8080 ~~~~');
});
