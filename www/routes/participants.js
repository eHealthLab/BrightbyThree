var mysql = require('mysql');
//var gcm = require('node-gcm');

var openConnection = function() {
    return mysql.createConnection({ host: 'localhost', user: 'munjala',
        password: 'artika12', database: 'bb3db', multipleStatements: true });
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
        //console.log("Connection Open");
        var queryString = "select * from participants where email = ?";
        console.log("Running the query:\n");
        console.log(queryString);
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
                        var data = {
                            status: "success",
                            userId: rows[0].ID
                        }
                        //console.log("id is: " + id);
                        res.send(data);
                        /*
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
                                    res.send(data);
                                });
                                connection.end();
                            });
                            connection.end();
                        });*/
                        //connection.end();
                        //res.sendStatus(id);
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

    var days = req.params.days;
    var minutes = req.params.minutes;
    var id = req.params.userID;

    //console.log("Connection Open");

    var queryStringGet = "select * from goals where userID = " + id;

    if((connection = openConnection())) {
        console.log(queryStringGet);
        connection.query(queryStringGet, function (err, rows, fields) {
            //console.log("Entered");
            if (err) throw err;
            if (rows[0] != undefined) {
                if ((connection = openConnection())) {
                    var queryString = "update goals set daysPerWeek = " + days + ',' + " minutesPerDay = " + minutes + " where userID= " + id;
                    console.log(queryString);
                    connection.query(queryString, function (err, rows, fields) {
                        if (err) throw err;
                        res.send("success");
                    });
                }

            }
            else {
                ;
            }
        })
    }
};

exports.initialize = function(req, res) {

    console.log('inside initialize');

    var id = req.params.userID;
    var connection;

    if ((connection = openConnection())) {
        console.log('inside total');
        var queryString;
        queryString = "insert into totalMinutes (userID, totalPoints) values ('" + id + "', '" + 0 + "')";
        console.log(queryString);
        connection.query(queryString, function (err, rows, fields) {
            if (err) throw err;
        });
        connection.end();
    }

    if ((connection = openConnection())) {
        console.log('inside goals');
        var queryString;
        queryString = "insert into goals (userID, daysPerWeek, minutesPerDay) values ('" + id + "', '" + 2  + "', '" + 10 + "')";
        console.log(queryString);
        connection.query(queryString, function (err, rows, fields) {
            if (err) throw err;
        });
        connection.end();
    }

    if ((connection = openConnection())) {
        console.log('inside badges');
        var queryString;
        queryString = "insert into badges (userID, badgeToEarn) values ('" + id + "', '" + 1 + "')";
        console.log(queryString);
        connection.query(queryString, function (err, rows, fields) {
            if (err) throw err;
        });
        connection.end();
    }
    var data = {
        status: "success"
    };
    res.send(data);
};

exports.logMinutes = function(req, res) {
    console.log('inside log minutes');
    var minutes = req.params.minutes;
    var id = req.params.userID;
    var connection;
    if ((connection = openConnection())) {
        var queryString;
        queryString = "select totalPoints from totalMinutes where userID =  " + id;
        console.log(queryString);
        connection.query(queryString, function (err, rows, fields) {
            if (err) throw err;
            queryString = "update totalMinutes set totalPoints = totalPoints + " + minutes + " where userID = " + id;
            console.log(queryString);
            if ((connection = openConnection())) {
                connection.query(queryString, function (err, rows, fields) {
                    if (err) throw err;
                    var data = {
                        status: "success"
                    };
                    res.send(data);
                });
            }
        });
        connection.end();
    }
};

exports.setBadge = function (req, res) {


    var badge = req.params.badgeNumber;
    var id = req.params.userID;
    var flag=0;
    console.log('inside set badge' + badge + id);

    if((connection = openConnection())) {
        var queryString;
        queryString = "select badgeToEarn from badges where userID = " + id;
        connection.query(queryString, function (err, rows, fields) {
            //console.log("Entered");
            if (err) throw err;
            if (rows[0] != undefined) {
                console.log("user badge Exists");
                //flag = 1;
                queryString = "update badges set badgeToEarn = " + badge + " where userID = " + id;
            }
            else {
                console.log('user badge not there');
                queryString = "insert into badges (userID, badgeToEarn) values ('" + id + "', '" + badge + "')";
            }

            if ((connection = openConnection())) {
                console.log(queryString);
                connection.query(queryString, function (err, rows, fields) {
                    if (err) throw err;
                    res.sendStatus("success");
                });
            }
            connection.end();
        });
        //connection.end();
    }
    //connection.end();
};

exports.badgeInfo = function (req, res) {

    var id = req.params.userID;
    var queryString;
    if((connection = openConnection())) {
        queryString = "select * from badges where userID = " + id;
        console.log(queryString);
        connection.query(queryString, function(err, rows, fields) {
            if (err) throw err;
            if (rows[0] != undefined) {
                console.log('next badge is: ' + rows[0].badgeToEarn);

                var data = {
                    status: "success",
                    badgeToEarn: rows[0].badgeToEarn
                };
                res.send(data);
            }
            else {
                var data = {
                    status: "failure",
                    badgeToEarn: -1
                };
            }
        });
    }
};

exports.goalsInfo = function (req, res) {

    var id = req.params.userID;
    var queryString;
    if((connection = openConnection())) {
        queryString = "select * from goals where userID = " + id;
        connection.query(queryString, function(err, rows, fields) {
            if (err) throw err;
            if (rows[0] != undefined) {
                console.log(rows[0]);
                var data = {
                    status: "success",
                    goals: rows[0]
                }
                res.send(data);
            }
        });
    }
};

exports.totalPointsInfo = function (req, res) {

    var id = req.params.userID;
    var queryString;
    if ((connection = openConnection())) {
        queryString = "select * from totalMinutes where userID = " + id;
        connection.query(queryString, function(err, rows, fields) {
            if (err) throw err;
            if (rows[0] != undefined) {
                console.log(rows[0]);
                var data = {
                    status: "success",
                    totalPoints: rows[0].totalPoints
                }
                res.send(data);
            }
        });
    }
};

exports.addFeedback = function(req, res){
    console.log('inside addFeedback');
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



