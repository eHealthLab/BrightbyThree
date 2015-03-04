var mysql = require('mysql');
//var gcm = require('node-gcm');

var openConnection = function() {
    return mysql.createConnection({ host: 'localhost', user: 'munjala',
        database: 'bb3db', multipleStatements: true });
};

exports.all = function(req, res){
    if ((connection = openConnection())) {
        connection.query('select * from participants', function(err, rows, fields) {
            if (err) throw err;
            res.contentType('application/json');
            res.write(JSON.stringify(rows));
            res.end();
        });
    }
    connection.end();
};

exports.one = function(req, res){
    var id = req.params.id;
    var pwd = req.params.pwd;
    var lsRegExp = /'/g;

    //id = String(id).replace(lsRegExp, "''");
    //pwd = String(pwd).replace(lsRegExp, "''");
    if ((connection = openConnection())) {
        console.log("Connection Open");
        var queryString = "select * from participants where email = ?";
        console.log("Running the query");
        connection.query(queryString, [id], function(err, rows, fields) {
            console.log("Entered function");
            if (err) throw err;
            if(rows[0] != undefined){
                console.log("Entered IF");
                if(rows[0].email == id && rows[0].password == pwd)
                    res.send(rows);
                else
                    res.send("false");
            }
            else res.send("false");
        });
    }
    console.log("Clone");
    connection.end();
};

/*exports.checkEmail = function(req, res){
    var email = req.params.email;
    if ((connection = openConnection())) {
        var queryString = "select * from participants where email = ?";
        connection.query(queryString, [email], function(err, rows, fields) {
            if (err) throw err;
            if(rows[0].email == email)
                res.send("true");
            else
                res.send("false");
        });
    }
}*/

exports.oneEmail = function(req, res) {
    var id = req.params.id;
    var lsRegExp = /'/g;

    id = String(id).replace(lsRegExp, "''");
    if((connection = openConnection())) {
        var queryString ="select * from participants where email = ?";
        connection.query(queryString, [id], function(err, rows, fields) {
            if (err) throw err;
            if(rows[0] != undefined){
                if(rows[0].email == id)
                    res.send(rows[0].ID);
                else
                    res.send("false");
            }
            else res.send("false");
        });
    }
    connection.end();
};

exports.changeStatus = function(req, res) {
    var Id = req.params.id;
    if((connection = openConnection())) {
        var queryString = "update participants set status=1 where ID=" + Id;
        connection.query(queryString, function(err, rows, fields) {
            if (err) throw err;
            res.send("success");
        });
    }
    connection.end();
}

exports.addUser = function(req, res){
    var firstName = req.params.firstName;
    var lastName = req.params.lastName;
    var email = req.params.email;
    var password = req.params.password;
    var phoneNumber = req.params.phoneNumber;
    var babyName = req.params.babyName;
    var babyDOB = req.params.babyDOB;
    var babyGender = req.params.babyGender;
    var zipcode = req.params.zipcode;
    var lsRegExp = /'/g;

    firstName = String(firstName).replace(lsRegExp, "''");
    lastName = String(lastName).replace(lsRegExp, "''");
    email = String(email).replace(lsRegExp, "''");
    password =  String(password).replace(lsRegExp, "''");
    phoneNumber = String(phoneNumber).replace(lsRegExp, "''");
    babyName = String(babyName).replace(lsRegExp, "''");
    babyDOB = String(babyDOB).replace(lsRegExp, "''");
    babyGender = String(babyGender).replace(lsRegExp, "''");
    zipcode = String(zipcode).replace(lsRegExp, "''");


    if((connection = openConnection())) {
		console.log("Connection Open");
        var queryStringGet = "select * from participants where email = ?";
		console.log("Running the query");
        connection.query(queryStringGet, [email], function(err, rows, fields) {
			console.log("Entered");
            if(err) throw err;
            if(rows[0] != undefined){
                console.log("Email Exists");
                var data = {
                    status: "false",
                    message: "Email ID exists. Use a different Email ID."
                };
                res.send(data);
            } else {
                console.log("Email doesn't exist");
                var startDate =new Date(2015, 03, 06);    //Month is 0-11 in JavaScript
                var thisday = new Date();                        //Get 1 day in milliseconds
                var one_day=1000*60*60*24
                var daysSinceStart = ((thisday.getTime() - startDate.getTime())/one_day) % 30;
		        console.log(daysSinceStart);
                var queryString = "insert into participants (firstname, lastname, email, password, phonenumber, registerday, allmessages, registerdate, babyName, babyDOB, babyGender, zipcode) values('" + firstName + "', '" + lastName + "', '" + email + "', '" + password + "', '" + phoneNumber + "', " + daysSinceStart + ", false, now(), '" + babyName + "', '" + babyDOB + "', '" + babyGender + "', '" + zipcode + "')";
                console.log('executing' + queryString);
                connection = openConnection();
                connection.query(queryString, function(err, rows, fields) {
                    if (err) throw err;
                    var queryString1 = "SET foreign_key_checks = 0;"
                    connection = openConnection();
                    console.log('executing' + queryString1);
                    connection.query(queryString1, function(err, rows, fields) {
                        if (err) throw err;
                        queryStringGet = "select * from participants where email = ?";
                        connection = openConnection();
                        console.log('executing' + queryStringGet);
                        connection.query(queryStringGet, [email], function(err, rows, fields) {
                        if(err) throw err;
                        var id = rows[0].ID
                            console.log("id is: " + id);
                        queryString =  "SET foreign_key_checks = 0;" + " create table user" + id + " (ID int auto_increment, inb varchar(30), outb boolean, foreign key(ID) references outbound(ID), primary key(ID));";
                        console.log(queryString);
						connection = openConnection();
                        connection.query(queryString, function(err, rows, fields) {
                            if (err) throw err;
                            queryString = "select max(ID) as maxID from outbound;"
                            connection = openConnection();
                            console.log('executing' + queryString);
                            connection.query(queryString, function(err, rows, fields) {
                                if (err) throw err;
                                queryString = "SET foreign_key_checks = 0;" + "insert into user" + id + "(outb) values (0)";
                                for (i=0; i<rows[0].maxID - 1; i++)
                                    queryString = queryString + ", (0)";
                                //console.log(queryString);
                                connection = openConnection();
                                connection.query(queryString, function(err, rows, fields) {
                                    if (err) throw err;
                                    var data = {
                                        status: "true"
                                    };
                                    console.log("id is: " + id);
                                    res.send(id);
                                });
                                connection.end();
                            });
                            connection.end();
                        });
                        connection.end();
                        });
                        connection.end();
                    });
                    connection.end();
                });
                connection.end();
            }
        });
    }
    connection.end();
};

exports.setGoals = function (req, res) {
    var daysPerWeek = req.params.days;
    var minutesPerDay = req.params.minutes;

    if((connection = openConnection())) {
        var queryString = "insert into goals (daysPerWeek, minutesPerDay) values('" + daysPerWeek  + '" , "' + minutesPerDay + "')";
        connection.query(queryString, function(err, rows, fields) {
            if (err) throw err;
            res.send("success");
        });
    }
}

exports.addFeedback = function(req, res){
    var feedback = req.params.feedback;
    var lsRegExp = /'/g;

    feedback = String(feedback).replace(lsRegExp, "''");
    if((connection = openConnection())) {
        var queryString = "insert into feedback values('" + feedback + "')";
        connection.query(queryString, function(err, rows, fields) {
            if (err) throw err;
            res.send("success");
        });
    }
    connection.end();
};



