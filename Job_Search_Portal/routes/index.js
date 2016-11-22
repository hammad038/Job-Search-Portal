// Packages
var request = require('request');
var cheerio = require('cheerio');
var email = require("nodemailer");
var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var async = require('async');
var dialog = require('dialog');
var smtpTranspnort = require('nodemailer-smtp-transport');
var fs = require("fs");

// Mongodb Connection Packages
var client = mongodb.MongoClient;
var Db = mongodb.Db;
var Server = mongodb.Server;

var bodyParser = require('body-parser'); // for reading POSTed form data into `req.body`
var expressSession = require('express-session'); // for session generation
var cookieParser = require('cookie-parser'); // the session is stored in a cookie, so we use this to parse it

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(cookieParser());

app.use(expressSession({secret:'somesecrettokenhere'}));

app.use(bodyParser());

json_obj = [];
graph_data = [];

router.get('/', function(req, res) {
    if (!req.session.userName) {
        res.render('index');
        console.log("////////////////////////Index///////////////////////////////");

        // Inserting JS Jobs Data in Database
        var k=0;
        // Creating 2D array of jobs data i.e. {{url,date,description,company,location,category} , {...} , {...} , ...}
        for (i = 0; i < urls_js.length; i++) {
            var a = urls_js[i];
            var b = dates_js[i];
            var c = descriptions_js[i];
            var d = companies_js[i];
            var e = locations_js[i];
            var f = category_js[i];

            jobs_js[k]=[a,b,c,d,e,f];
            k++;
        }
        console.log("JavaScript Jobs : "+k);

        // Opening db to insert 2D array data in Database
        var db = new Db('askhere', new Server('localhost', '27017'));
        db.open(function (err, db) {
            db.authenticate('', '', function (err, result) {
                var url = 'mongodb://localhost:27017/askhere';
                client.connect(url, function (err, db) {
                    console.log("DB Connected");
                    var col = db.collection('alljobs');
                    var document = {
                        category:"javascript"
                    };
                    col.update(document,{$set:{jobsdata:jobs_js}},function (err, result){
                        // Data Successfully Inserted in Database
                        console.log("Javascript jobs data inserted in alljobs collection");
                    });
                });
            });
        });
        //////////////////////////////jobs////////////////////////////////////////

        // Inserting C++ Jobs Data in Database
        var j=0;
        for (i = 0; i < urls_c.length; i++) {

            var a = urls_c[i];
            var b = dates_c[i];
            var c = descriptions_c[i];
            var d = companies_c[i];
            var e = locations_c[i];
            var f = category_c[i];

            jobs_c[j]=[a,b,c,d,e,f];
            j++;
        }
        console.log("C++ Jobs : "+j);

        var db = new Db('askhere', new Server('localhost', '27017'));
        db.open(function (err, db) {
            db.authenticate('', '', function (err, result) {
                var url = 'mongodb://localhost:27017/askhere';
                client.connect(url, function (err, db) {
                    console.log("DB Connected");
                    var col = db.collection('alljobs');
                    var document = {
                        category:"c++"
                    };
                    col.update(document,{$set:{jobsdata:jobs_c}},function (err, result){
                        console.log("C++ jobs data inserted in alljobs collection");
                    });
                });
            });
        });
        //////////////////////////////jobs////////////////////////////////////////

        // Inserting PHP Jobs Data in Database
        var j=0;
        for (i = 0; i < urls_php.length; i++) {

            var a = urls_php[i];
            var b = dates_php[i];
            var c = descriptions_php[i];
            var d = companies_php[i];
            var e = locations_php[i];
            var f = category_php[i];

            jobs_php[j]=[a,b,c,d,e,f];
            j++;
        }
        console.log("PHP Jobs : "+j);

        var db = new Db('askhere', new Server('localhost', '27017'));
        db.open(function (err, db) {
            db.authenticate('', '', function (err, result) {
                var url = 'mongodb://localhost:27017/askhere';
                client.connect(url, function (err, db) {
                    console.log("DB Connected");
                    var col = db.collection('alljobs');
                    var document = {
                        category:"php"
                    };
                    col.update(document,{$set:{jobsdata:jobs_php}},function (err, result){
                        console.log("PHP jobs data inserted in alljobs collection");
                    });
                });
            });
        });
        //////////////////////////////jobs////////////////////////////////////////

        // Inserting Java Jobs Data in Database
        var j=0;
        for (i = 0; i < urls_java.length; i++) {

            var a = urls_java[i];
            var b = dates_java[i];
            var c = descriptions_java[i];
            var d = companies_java[i];
            var e = locations_java[i];
            var f = category_java[i];

            jobs_java[j]=[a,b,c,d,e,f];
            j++;
        }
        console.log("Java Jobs : "+j);

        var db = new Db('askhere', new Server('localhost', '27017'));
        db.open(function (err, db) {
            db.authenticate('', '', function (err, result) {
                var url = 'mongodb://localhost:27017/askhere';
                client.connect(url, function (err, db) {
                    console.log("DB Connected");
                    var col = db.collection('alljobs');
                    var document = {
                        category:"java"
                    };
                    col.update(document,{$set:{jobsdata:jobs_java}},function (err, result){
                        console.log("Java jobs data inserted in alljobs collection");
                    });
                });
            });
        });
        //////////////////////////////jobs////////////////////////////////////////

        // Inserting ROR Jobs Data in Database
        var k=0;
        for (i = 0; i < urls_ror.length; i++) {

            var a = urls_ror[i];
            var b = dates_ror[i];
            var c = descriptions_ror[i];
            var d = companies_ror[i];
            var e = locations_ror[i];
            var f = category_ror[i];

            jobs_ror[k]=[a,b,c,d,e,f];
            k++;
        }
        console.log("Ruby on Rails Jobs : "+k);

        var db = new Db('askhere', new Server('localhost', '27017'));
        db.open(function (err, db) {
            db.authenticate('', '', function (err, result) {
                var url = 'mongodb://localhost:27017/askhere';
                client.connect(url, function (err, db) {
                    console.log("DB Connected");
                    var col = db.collection('alljobs');
                    var document = {
                        category:"RubyonRails"
                    };
                    col.update(document,{$set:{jobsdata:jobs_ror}},function (err, result){
                        console.log("Ruby on Rails jobs data inserted in alljobs collection");
                    });
                });
            });
        });
        //////////////////////////////jobs////////////////////////////////////////

        // Inserting Python Jobs Data in Database
        var k=0;
        for (i = 0; i < urls_python.length; i++) {

            var a = urls_python[i];
            var b = dates_python[i];
            var c = descriptions_python[i];
            var d = companies_python[i];
            var e = locations_python[i];
            var f = category_python[i];

            jobs_python[k]=[a,b,c,d,e,f];
            k++;
        }
        console.log("Python Jobs : "+k);

        var db = new Db('askhere', new Server('localhost', '27017'));
        db.open(function (err, db) {
            db.authenticate('', '', function (err, result) {
                var url = 'mongodb://localhost:27017/askhere';
                client.connect(url, function (err, db) {
                    console.log("DB Connected");
                    var col = db.collection('alljobs');
                    var document = {
                        category:"python"
                    };
                    col.update(document,{$set:{jobsdata:jobs_python}},function (err, result){
                        console.log("Python jobs data inserted in alljobs collection");
                    });
                });
            });
        });
        //////////////////////////////jobs////////////////////////////////////////

        // Inserting C# Jobs Data in Database
        var k=0;
        for (i = 0; i < urls_Cs.length; i++) {

            var a = urls_Cs[i];
            var b = dates_Cs[i];
            var c = descriptions_Cs[i];
            var d = companies_Cs[i];
            var e = locations_Cs[i];
            var f = category_Cs[i];

            jobs_Cs[k]=[a,b,c,d,e,f];
            k++;
        }
        console.log("C# Jobs : "+k);

        var db = new Db('askhere', new Server('localhost', '27017'));
        db.open(function (err, db) {
            db.authenticate('', '', function (err, result) {
                var url = 'mongodb://localhost:27017/askhere';
                client.connect(url, function (err, db) {
                    console.log("DB Connected");
                    var col = db.collection('alljobs');
                    var document = {
                        category:"C#"
                    };
                    col.update(document,{$set:{jobsdata:jobs_Cs}},function (err, result){
                        console.log("C# jobs data inserted in alljobs collection");
                    });
                });
            });
        });
        //////////////////////////////jobs////////////////////////////////////////


    }else{
        processRequest(req,res);
    }
});

function processRequest(req,res){
    tags = [];
    data = [];
    jobsdata = [];
    len = 0;

    if (!req.session.userName){
        var username = req.body.username;
        var password = req.body.password;

        var db = new Db('askhere', new Server('localhost', '27017'));
        db.open(function (err, db) {
            db.authenticate('', '', function (err, result) {
                var url = 'mongodb://localhost:27017/askhere';
                client.connect(url, function (err, db) {
                console.log("DB Connected");

                    var col = db.collection('allusers');
                    var document = {username: username};

                    col.find(document).toArray(function (err, items) {
                        if (items == false) {
                            console.log('Incorrect Username !!!');
                            dialog.info('Incorrect Username !!!');
                            res.render('index');
                        }
                        console.log('items: ' + JSON.stringify(items));
                        items.forEach(function (doc) {
                            console.log(doc.password + " == " + password);
                            if (doc.password == password) {
                                req.session.userName = doc.username;
                                console.log("////////////////////////Home///////////////////////////////");
                                waterfall(req,res);

                            }
                            else {
                                console.log("Incorrect username or password");
                                dialog.info('Incorrect Password !!!');
                                res.render('index');
                                console.log("////////////////////////Index///////////////////////////////");
                            }
                        });
                    });
                });
            });
        });
    }else{
        //////////////////////////////////////////////////////////////////////////
        waterfall(req,res);
        //////////////////////////////////////////////////////////////////////////
    }
}

function waterfall(req,res){

    var tjobs = 0;
    userName = req.session.userName,
        tags = [],
        url = 'mongodb://localhost:27017/askhere',
        data = [],
        DatesCollection = [],
        d = [],
        c = [],
        v = [],
        k = [],
        db = new Db('askhere', new Server('localhost', '27017'));

    async.waterfall(
        [
            // Open db
            function opendb(callback) {
                db.open(function (err, db) {
                    if (err) {
                        callback(err,null);
                        console.log("not ok1");
                        return;
                    }
                    console.log("ok1");
                    callback(null, db);
                });
            },

            // Authenticate and connect
            function authcon(db, callback) {
                db.authenticate('', '', function (err, result) {
                    client.connect(url, function (err, res) {
                        if (err) {
                            callback(err, null);
                            console.log("not ok2");
                            return;
                        }
                        console.log("ok2");
                        callback(null, db);
                    });
                });
            },

            // Query filters collection for tags of session user
            function findtags(arg, callback) {
                var collection = db.collection("filters");
                collection.find({"username": userName}).toArray(function (err, result) {
                    if (err) {
                        callback(err, null);
                        console.log("not ok3");
                        return;
                    }
                    result.forEach(function (doc) {
                        tags = doc.tags;
                        return tags;
                    });
                    console.log("ok3");
                    callback(null, tags);
                });
            },

            // Query alljobs collection for categories jobs matched with tags data
            function(arg, callback) {
                var collection = db.collection("alljobs");
                collection.find({"category": {"$in": tags}}).toArray(function (err, result) {
                    if (err) {
                        callback(err, null);
                        console.log("not ok4");
                        return;
                    }
                    jobsdata = result.map(function (doc){ return doc.jobsdata; });
                    console.log("ok4");
                    for(var i=0; i<tags.length;i++){
                        console.log("No of Tags Selected : " + tags.length + " | Jobsdata Length for each Tag : "+ (jobsdata[i]).length);
                        tjobs = tjobs + (jobsdata[i]).length;
                    }
                    for (var i = 0; i < tags.length; i++) {
                        for (var j = 0; j < ((jobsdata[i]).length); j++) {
                            for(var k=0;k<6;k++){
                                data.push(jobsdata[i][j][k]);
                            }
                        }
                    }
                    callback(null, jobsdata);
                });
            }
        ], function(err, result) {
            if (err)  { console.log("NOT OK!!!") };

            res.render("mainqa", {
                "uname": userName,
                "tags": tags,
                "jobsdata":data,
                "len" : data.length,
                "tjobs":tjobs
            });
        });
}

router.post('/welcome', function(req, res) {
                    processRequest(req,res);
});

router.post('/search', function(req, res) {
    if (!req.session.userName) {
        res.render('index');
        console.log("////////////////////////Index///////////////////////////////");
    }else {
        processSearch(req,res);
    }
});

function processSearch(req,res){

    var search_url,search_url_1,search_url_2,search_url_3;
    var search_string_1 = req.body.search;
    var city_string = req.body.city;
    console.log(search_string_1);
    var search_string = search_string_1.replace(/\s+/g, '+');
    console.log("New String: "+search_string);
    console.log("City: "+city_string);

    search_url = "http://www.it-jobs.stepstone.de/?what="+search_string+"&where="+city_string+"&resultsPerPage=25";

    search_url_1 = "http://www.meinpraktikum.de/praktikum/suchen?location="+city_string+"&q="+search_string;

    search_url_2 = "http://de.indeed.com/Jobs?q="+search_string+"&l="+city_string,

    search_url_3 = "https://www.praktikum.info/stellenangebote?&query%5Btext%5D="+search_string+"&query%5Bcity%5D="+city_string+"%2C+Germany&button=&query%5Bmandatory_internship%5D=0";

    console.log("StepStone Global Search Link : "+search_url);
    console.log("MeinPraktikum Global Search Link : "+search_url_1);
    console.log("Indeed Global Search Link : "+search_url_2);
    console.log("Praktikum.info Global Search Link : "+search_url_3);

    g_urls = [];
    g_dates = [];
    g_descriptions = [];
    g_companies = [];
    g_locations = [];
    g_category = [];
    g_jobs = [];

    var g_stepstone = 0;
    var g_monster = 0;
    var g_indeed = 0;
    var g_praktikum = 0;

    async.waterfall(
        [
            function requestSent(callback) {

                console.log("StepStone Global Search Jobs Fetching....");
                request(search_url,function(req,res,body) {
                    if (!req) {

                        var count = 0;
                        var $ = cheerio.load(body);

                        $('a.resultItem-link', '#resultList').each(function () {
                            var a = $(this);
                            var url = a.attr('href');
                            g_urls.push(url);
                            count++;
                        });
                        g_stepstone = count;

                        $('.date').each(function () {
                            var b = $(this);
                            var date = b.text();
                            g_dates.push(date);
                        });

                        $('.job').each(function(){
                            var c = $(this);
                            var desc = c.text();
                            g_descriptions.push(desc);
                        });

                        $('.company').each(function(){
                            var d = $(this);
                            var company = d.text();
                            g_companies.push(company);
                        });

                        $('.location','#resultList').each(function(){
                            var e = $(this);
                            var location = e.text();
                            g_locations.push(location);
                        });

                        for(var i=0;i<g_stepstone;i++)
                        {
                            g_category.push(search_string_1);
                        }

                        console.log("Stepstone Global Search jobs # "+g_stepstone);

                    }else {console.log(">> StepStone Global Search Jobs Request not sent !!!")}
                });

                console.log("meinpraktikum Global Search Jobs Fetching....");
                request(search_url_1,function(req,res,body) {
                    if (!req) {

                        var count = 0;
                        var $ = cheerio.load(body);

                        {
                            $('a.search-result-vacancy').each(function () {
                                var a = $(this);
                                var url = a.attr('href');
                                g_urls.push('http://www.meinpraktikum.de'+url);
                                count++;
                            });

                            g_monster = count;
                        }

                        {

                            $('a.search-result-vacancy').each(function () {
                                var b = $(this);
                                var str = b.attr('href');
                                var company = str.substring(str.lastIndexOf("praktikum/")+10,str.lastIndexOf("/jobs"));
                                g_companies.push(company);
                            });
                        }

                        {

                            $('a.search-result-vacancy').each(function () {
                                var c = $(this);
                                var str = c.attr('href');
                                var src = str.search("jobs/");
                                var len = str.length;
                                var desc = str.substring(src+5,len);
                                g_descriptions.push(desc);
                            });
                        }

                        {

                            $('span','.title').each(function () {
                                var d = $(this);
                                var location = d.text();
                                g_locations.push(location);
                            });
                        }

                        {
                            var e = new Date();
                            for (var i = 0; i < g_monster; i++) {
                                g_dates.push("x");
                            }
                        }

                        for(var i=0;i<g_monster;i++)
                        {
                            g_category.push(search_string_1);
                        }

                        console.log("meinpraktikum Global Search jobs # "+g_monster);

                    }else {console.log(">> meinpraktikum Global Search Jobs Request not sent !!!")}
                });

                //Indeed.de Global Search
                console.log("Indeed Global Search Jobs Fetching....");
                request(search_url_2,function(req,res,body) {
                    if (!req) {

                        var count = 0;
                        var $ = cheerio.load(body);

                        {
                            $('a', '.jobtitle').each(function () {
                                var a = $(this);
                                var url = a.attr('href');
                                g_urls.push('http://de.indeed.com'+url);
                                count++;
                            });

                            g_indeed = count;
                        }

                        {
                            for (var i = 0; i < g_indeed; i++) {
                                g_companies.push("Undefined");
                            }
                        }

                        {
                            $('a', '.jobtitle').each(function(){
                                var d = $(this);
                                var desc = d.text();
                                g_descriptions.push(desc);
                            });
                        }

                        {
                            for (var i = 0; i < g_indeed; i++) {
                                g_locations.push(city_string);
                            }
                        }

                        {
                            var e = new Date();
                            for (var i = 0; i < g_indeed; i++) {
                                g_dates.push("x");
                            }
                        }

                        for(var i=0;i<g_indeed;i++)
                        {
                            g_category.push(search_string_1);
                        }

                        console.log("Indeed.de Global Search jobs # "+g_indeed);
                    }else {console.log(">> Indeed.de Global Search Jobs Request not sent !!!")}

                });


                //Praktikum.info Global Search
                console.log("Praktikum.Info Global Se#arch Jobs Fetching....");
                request(search_url_3,function(req,res,body) {
                    if (!req) {

                        var count = 0;
                        var $ = cheerio.load(body);

                        {
                            $('.job-offer-teaser__title').each(function () {
                                var a = $(this);
                                var url = a.text();
                                console.log(url);
                                g_urls.push(search_url_3);
                                count++;
                            });

                            g_praktikum = count;
                        }

                        {
                            $('.job-offer-teaser__company').each(function(){
                                var b = $(this);
                                var company = b.text();
                                //console.log(company);
                                g_companies.push(company);
                            });
                        }

                        {
                            $('.job-offer-teaser__title').each(function(){
                                var c = $(this);
                                var desc = c.text();
                                //console.log(desc);
                                g_descriptions.push(desc);
                            });
                        }

                        {
                            $('.job-offer-teaser__address-item').each(function(){
                                var d = $(this);
                                var location = d.text();
                                //console.log(location);
                                g_locations.push(location);
                            });
                        }

                        {
                            $('.job-offer-teaser__date').each(function(){
                                var e = $(this);
                                var date = e.text();
                                //console.log(date);
                                g_dates.push(date);
                            });
                        }

                        for(var i=0;i<g_praktikum;i++)
                        {
                            g_category.push(search_string_1);
                        }

                        console.log("Praktikum.Info Global Search jobs # "+g_praktikum);
                    }else {console.log(">> Praktikum.Info Global Search Jobs Request not sent !!!")}

                });


                var delay=9000;
                setTimeout(function(){
                    console.log("ok requestSent function");
                    console.log("Delay funtion call");
                    callback(null, g_stepstone);
                }, delay);
            },

            function insertArr(arg, callback) {

                g_stepstone = g_stepstone+g_monster+g_indeed+g_praktikum;
                console.log("Total Global Search Jobs : "+g_stepstone);

                for(var i= 0;i<g_stepstone;i++){
                    g_jobs.push(g_urls[i]);
                    g_jobs.push(g_dates[i]);
                    g_jobs.push(g_descriptions[i]);
                    g_jobs.push(g_companies[i]);
                    g_jobs.push(g_locations[i]);
                    g_jobs.push(g_category[i]);
                }
                console.log("Data length : "+g_jobs.length);

                console.log("ok insertArr function");

                callback(null, g_jobs);
            },

        ], function(err, result) {
            if (err)  { console.log("NOT OK !!!") };

            res.render('result' , {uname:req.session.userName,link:search_url,len:g_jobs.length,jobsdata:g_jobs,queryString:search_string_1,city:city_string,tjobs:(g_jobs.length/6)});
            console.log("////////////////////////Contact///////////////////////////////");
        });

}

router.get('/result', function(req, res) {
    if (!req.session.userName) {
        res.render('index');
        console.log("////////////////////////Index///////////////////////////////");
    }else {
        res.render('result' , {uname:req.session.userName});
        console.log("////////////////////////Contact///////////////////////////////");
    }
});

router.get('/password', function(req, res) {
    if (!req.session.userName) {
        res.render('index');
        console.log("////////////////////////Index///////////////////////////////");
    }else {
        res.render('password' , {uname:req.session.userName});
        console.log("////////////////////////Contact///////////////////////////////");
    }
});

router.get('/contact', function(req, res) {
    if (!req.session.userName) {
        res.render('contact' , {uname:"Visitor Student"});
        console.log("////////////////////////Visitor Contact///////////////////////////////");
    }else {
        res.render('contact' , {uname:req.session.userName});
        console.log("////////////////////////Contact///////////////////////////////");
    }
});


router.get('/graph', function(req, res) {
    if (!req.session.userName) {
        res.render('index');
        console.log("////////////////////////Index///////////////////////////////");
    }else {
        res.render('graph' , {uname:req.session.userName,gdata:JSON.stringify(json_obj)});
        console.log("////////////////////////Graph///////////////////////////////");
    }
});

router.get('/signup_form', function(req, res) {
    res.render('signup_form');
    console.log("////////////////////////Signup Form///////////////////////////////");
});

router.post('/signupuser', function(req, res) {

    url = 'mongodb://localhost:27017/askhere',
    db = new Db('askhere', new Server('localhost', '27017'));
    var flag = 0;

    async.waterfall(
        [
            // Open db
            function opendb(callback) {
                db.open(function (err, db) {
                    if (err) {
                        callback(err,null);
                        console.log("not ok1");
                        return;
                    }
                    console.log("db open");
                    callback(null, db);
                });
            },

            // Authenticate and connect
            function authcon(db, callback) {
                db.authenticate('', '', function (err, result) {
                    client.connect(url, function (err, res) {
                        if (err) {
                            callback(err, null);
                            console.log("not ok2");
                            return;
                        }
                        console.log("db authenticate");
                        callback(null, db);
                    });
                });
            },

            // Query allusers collection for user existence check
            function finduser(arg, callback) {
                var username = req.body.username;
                var document = {
                    fname: req.body.fname,
                    lname: req.body.lname,
                    email: req.body.email,
                    username: req.body.username,
                    password: req.body.password
                };
                var col = db.collection("allusers");
                col.find({"username": username}).toArray(function (err, result) {
                    if (err) {
                        callback(err, null);
                        console.log("not ok3");
                        return;
                    }
                    console.log('items: ' + JSON.stringify(result));
                    if (result == false) {
                        col.insert(document, function (err, result) {
                            console.log("user data inserted in allusers collection");
                        });
                        var ucol = db.collection('filters');
                        var udocument = {
                            username: req.body.username,
                            tags: "0"
                        };
                        ucol.insert(udocument, function (err, uresult) {
                            console.log("user filter inserted in filters collection");
                            //res.render('signup_verify');
                        });

                    }
                    result.forEach(function (doc) {
                        console.log(doc.username + " == " + username);
                        if (doc.username == username) {
                            flag = 1;
                        } else {
                                console.log("ok");
                            }
                        });
                    console.log("ok3");
                    callback(null, flag);
                });
            },

        ], function(err, result) {
            if (err)  { console.log("NOT OK!!!") }
                console.log("flag : " + flag);
                if(flag==1){
                    console.log("////////////////////////Signup Form///////////////////////////////");
                    dialog.info('User Already Exist try Another username !!!');
                    res.render('signup_form');}else {
                res.render("signup_verify");}
        });
});

router.get('/logout', function(req, res) {
    req.session.userName = null;
    res.render('index');
    console.log("////////////////////////Logout///////////////////////////////");
});

router.post('/passeditlogout', function(req, res) {
    if (!req.session.userName){
        res.render('index');
        console.log("////////////////////////Index///////////////////////////////");
    }else{
        console.log("////////////////////////Password Update///////////////////////////////");
        console.log(req.session.userName);

        var uname = req.session.userName;
        var newpass = req.body.newpassword;
        var matchpass = req.body.newpasswordmatch;

        var db = new Db('askhere', new Server('localhost', '27017'));
        db.open(function (err, db) {
            db.authenticate('', '', function (err, result) {
                var url = 'mongodb://localhost:27017/askhere';
                client.connect(url, function (err, db) {
                    console.log("DB Connected");

                    var col = db.collection('allusers');
                    var document = {
                        username: uname
                    };
                    col.update(document,{$set:{password:newpass}} , function (err, result) {
                        if (!err){
                        console.log("Password Edit Failed !!!");
                        }
                    });
                    req.session.userName = null;
                    res.render('index');
                    console.log("////////////////////////Logout///////////////////////////////");
                });
            });
        });
    }
});

router.post('/profileeditlogout', function(req, res) {
    if (!req.session.userName){
        res.render('index');
        console.log("////////////////////////Index///////////////////////////////");
    }else{
        console.log("////////////////////////Profile Update///////////////////////////////");
        console.log(req.session.userName);

        var uname = req.session.userName;
        var fname = req.body.fname;
        var lname = req.body.lname;
        var email = req.body.email;

        var db = new Db('askhere', new Server('localhost', '27017'));
        db.open(function (err, db) {
            db.authenticate('', '', function (err, result) {
                var url = 'mongodb://localhost:27017/askhere';
                client.connect(url, function (err, db) {
                    console.log("DB Connected");

                    var col = db.collection('allusers');
                    var document = {
                        username: uname
                    };
                    col.update(document,{$set:{fname:fname,lname:lname,email:email}} , function (err, result) {
                        if (!err){
                            console.log("Profile Edit Failed !!!");
                        }
                    });
                    req.session.userName = null;
                    res.render('index');
                    console.log("////////////////////////Logout///////////////////////////////");
                });
            });
        });
    }
});

router.get('/profile', function(req, res) {
    if (!req.session.userName) {
        res.render('index');
        console.log("////////////////////////Index///////////////////////////////");
    }else {
        {
            var firstname,lastname,mail,tags;
            var uname = req.session.userName;
            var db = new Db('askhere', new Server('localhost', '27017'));
            db.open(function (err, db) {
                db.authenticate('', '', function (err, result) {
                    var url = 'mongodb://localhost:27017/askhere';

                    client.connect(url, function (err, db) {
                        console.log("DB Connected Filters");
                        var col = db.collection('filters');
                        col.find({username: uname}).toArray(function(err, items) {
                            console.log("Items : "+JSON.stringify(items));
                            items.forEach(function (doc) {
                                tags = doc.tags;
                            });
                            console.log(tags);
                            console.log("////////////////////////Profile///////////////////////////////");
                        });
                    });

                    client.connect(url, function (err, db) {
                        console.log("DB Connected Allusers");
                        var ucol = db.collection('allusers');
                        ucol.find({username: uname}).toArray(function(err, items) {
                            console.log("Items : "+JSON.stringify(items));
                            items.forEach(function (doc) {
                                firstname = doc.fname;
                                lastname = doc.lname;
                                mail = doc.email;
                            });
                            console.log(firstname+lastname+mail);
                            res.render('profile', {uname: req.session.userName,fname:firstname,lname:lastname,email:mail,tags:tags});
                            console.log("////////////////////////Profile///////////////////////////////");
                        });
                    });
                });
            });
        }
    }
});

router.post('/tags', function(req,res){
    if (!req.session.userName){
        res.render('index');
        console.log("////////////////////////Index///////////////////////////////");
    }else{
        console.log("////////////////////////Tags Update///////////////////////////////");
        console.log(req.session.userName);
        console.log(req.body.choice);

        var uname = req.session.userName;
        var tags = req.body.choice;
        var len = tags.length;

        var db = new Db('askhere', new Server('localhost', '27017'));
        db.open(function (err, db) {
            db.authenticate('', '', function (err, result) {
                var url = 'mongodb://localhost:27017/askhere';
                client.connect(url, function (err, db) {
                    console.log("DB Connected");

                    var col = db.collection('filters');
                    var document = {
                        username: uname
                    };
                    col.update(document,{$set:{tags:req.body.choice}} , function (err, result) {
                        if (!err){
                            ////////////////////////////////////////////////////////
                            waterfall(req,res);
                            ////////////////////////////////////////////////////////
                        }
                    });
                });
            });
        });
    }
});

router.get('/adminpanel', function(req, res) {
    res.render('adminpanel');
    console.log("////////////////////////Admin Signin///////////////////////////////");
});

router.post('/adminwelcome', function(req, res) {
        console.log("/////////////////////Request inside adminwelcome///////////////////");
        reportedQuestions(req, res);
});

function reportedQuestions(req, res){
    console.log(req.body.username);
    console.log(req.body.password);
    if(!req.session.userName) {
        var db = new Db('askhere', new Server('localhost', '27017'));
        db.open(function (err, db) {
            var url = 'mongodb://localhost:27017/askhere';
            db.authenticate('', '', function (err, result) {
                client.connect(url, function (err, db) {
                    console.log("DB Connected");
                    var col = db.collection('adminusers');
                    var usersarr = new Array();
                    var ucol = db.collection('allusers');
                    console.log("allusers Collection");
                    ucol.find({username:{$ne:"removed"}}).toArray(function(err, u) {
                        console.log('items allusers: ' + JSON.stringify(u));
                        counter = 0;
                        u.forEach(function (users) {
                            usersarr[counter] = users.username;
                            counter++;
                            usersarr[counter] = users.email;
                            counter++;
                        });

                    });

                    var document = {username: req.body.username};
                    console.log('DOC: ' + JSON.stringify(document));
                    console.log("adminusers Collection");
                    col.find(document).toArray(function (err, items) {
                        if (items == false) {
                            console.log('Incorrect Username !!!');
                            dialog.info('Incorrect Username !!!');
                            res.render('adminpanel');
                        }
                        console.log('items adminusers: ' + JSON.stringify(items));
                        items.forEach(function (doc) {
                            console.log(doc.password + " == " + req.body.password);
                            if (doc.password == req.body.password) {
                                req.session.userName = doc.username;
                                db.close();
                                res.render('allusers', {uname: req.session.userName, user:usersarr });
                                console.log("////////////////////////Admin Welcome///////////////////////////////");
                            }
                            else {
                                console.log("Incorrect Password !!!");
                                dialog.info('Incorrect Password !!!');
                                res.render('adminpanel');
                                console.log("////////////////////////Admin Signup///////////////////////////////");
                            }
                        });
                    });
                });
            });
        });
    }else{
        res.render('allusers', {uname: req.session.userName});
        console.log("////////////////////////Admin Welcome///////////////////////////////");
            }
}


router.get('/user', function(req, res) {
    var counter = 0;
    if (!req.session.userName) {
        res.render('index');
        console.log("////////////////////////Index///////////////////////////////");
    }else {
        var usersarr;
        var db = new Db('askhere', new Server('localhost', '27017'));
        db.open(function (err, db) {
            db.authenticate('', '', function (err, result) {
                var url = 'mongodb://localhost:27017/askhere';
                client.connect(url, function (err, db) {
                    console.log("DB Connected");
                    usersarr = new Array();
                    var ucol = db.collection('allusers');

                    ucol.find({username:{$ne:"removed"}}).toArray(function(err, u) {
                        console.log(JSON.stringify(u));
                        counter = 0;
                        u.forEach(function (users) {
                            usersarr[counter] = users.username;
                            counter++;
                            usersarr[counter] = users.email;
                            counter++;
                        });
                        res.render('allusers', {uname:req.session.userName, user:usersarr });
                        console.log("////////////////////////Admin Welcome///////////////////////////////");
                    });

                });
            });
        });
    }
});

router.get('/removeuser', function(req, res) {

    var db = new Db('askhere', new Server('localhost', '27017'));
    db.open(function (err, db) {
        db.authenticate('', '', function (err, result) {
            var url = 'mongodb://localhost:27017/askhere';
            client.connect(url, function (err, db) {
                var qcol = db.collection('allusers');
                var document = {username: req.query['un']};
                qcol.update(document,{$set:{username:'removed'}} , function (err, result) {
                    if (!err)db.close();
                });
            });
        });
    });

    var usersarr;

    var db = new Db('askhere', new Server('localhost', '27017'));
    db.open(function (err, db) {
        db.authenticate('', '', function (err, result) {

            var url = 'mongodb://localhost:27017/askhere';
            client.connect(url, function (err, db) {
                usersarr = new Array();
                var ucol = db.collection('allusers');

                ucol.find({username:{$ne:"removed"}}).toArray(function(err, u) {
                    console.log(JSON.stringify(u));
                    counter = 0;
                    u.forEach(function (users) {
                        usersarr[counter] = users.username;
                        counter++;
                        usersarr[counter] = users.email;
                        counter++;
                    });
                    res.render('allusers', {uname:req.session.userName, user:usersarr });
                    console.log("////////////////////////Admin Welcome///////////////////////////////");
                });

            });
        });
    });
});

module.exports = router;