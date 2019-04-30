const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3001;


const server = http.createServer(app);
app.get('*', function (req, res) {
    res.sendFile(__dirname + '/uploads'); // load the single view file (angular will handle the page changes on the front-end)
});

server.listen(port);

 