let mysql = require('mysql');
let express = require("express");
let app = express();

app.use(express.static('public'));
app.set('view engine', 'pug');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'nodecasts_express',
    password: 'nodecasts_express',
    database: 'nodecasts_express'
});

app.get('/', function(req, res) {
    connection.connect();

    connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
        if(err) throw err;

        console.log('The solution is: ', rows[0].solution);

        res.render('index', { title: "My title", solution: rows[0].solution});
    });

    connection.end();

});

// app.get('/css/style.css', function(req, res) {
//     res.sendFile(__dirname + '/css/style.css');
// });

let server = app.listen(1337, function() {
    let host = server.address().address;
    let port = server.address().port;

    console.log('App running at http://%s:%s', host, port);
});