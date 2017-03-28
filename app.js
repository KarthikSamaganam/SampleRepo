
var csv = require('csv');
var mysql = require('mysql');
var http = require('http');
var obj = csv();

var server = http.createServer(function (req, resp) {
    resp.writeHead(200, { 'content-type': 'application/json' });
    resp.end(JSON.stringify(Employees));
 
});
 
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'test',
    debug: false,
});
connection.connect();


obj.from.path('./data/dataInfo.csv').to.array(function (data) {
    for (var index = 0; index < data.length; index++) {
        var emp = {
        	empId : parseInt(data[index][0]),
        	empName : data[index][1],
        	Salary : parseFloat(data[index][2])
        }
        var query = connection.query('INSERT INTO employeeinfo SET ?', emp,
	    function(err, result) {
	        console.log(err);
	    });
	    if(index === data.length-1){
	    	connection.end();
	    }
    }
});

server.listen(5050);