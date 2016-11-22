// Packages
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var routes = require('./routes/index');
var users = require('./routes/users');
var request = require('request');
var cheerio = require('cheerio');

var app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
// app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(cookieParser());
app.use(session({secret:'somesecrettokenhere'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/public'));

// Routes
app.use('/', routes);
app.use('/users', users);

console.log("////////////////////////App.js///////////////////////////////");

//////////////////////////////////////////StepStone JS////////////////////////////////////////////////

urls_js = [];
dates_js = [];
descriptions_js = [];
companies_js = [];
locations_js = [];
category_js = [];
jobs_js = [];

console.log("StepStone Javascript Jobs Fetching....");
// Sending request to source website to fetch jobs data
request('http://www.it-jobs.stepstone.de/?what=JavaScript-Entwickler/in&where=&resultsPerPage=25',function(req,res,body) {
  if (!req) {

    var stepstone_js,count = 0;
    var $ = cheerio.load(body);
    // Access to the required div to get hyperlinks of  Posted Jobs
    $('a.resultItem-link', '#resultList').each(function () {
      var a = $(this);
      var url = a.attr('href');
      urls_js.push(url);
      count++;
    });
    stepstone_js = count;

    // Access to the required div to get dates of  Posted Jobs
    $('.date').each(function () {
      var b = $(this);
      var date = b.text();
      dates_js.push(date);
    });

    // Access to the required div to get descriptions of  Posted Jobs
    $('.job').each(function(){
      var c = $(this);
      var desc = c.text();
      descriptions_js.push(desc);
    });

    // Access to the required div to get companies of  Posted Jobs
    $('.company').each(function(){
      var d = $(this);
      var company = d.text();
      companies_js.push(company);
    });

    // Access to the required div to get locations of  Posted Jobs
    $('.location','#resultList').each(function(){
      var e = $(this);
      var location = e.text();
      locations_js.push(location);
    });

    // Inserting Job Category manually
    for(var i=0;i<stepstone_js;i++)
    {
      category_js.push("javascript");
    }

    console.log("Stepstone JavaScript jobs # "+stepstone_js);

  }else {
    // If request not sent to source website
    console.log(">> StepStone JavaScript Jobs Request not sent !!!");
  }
});

///////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////Meinpraktikum JS////////////////////////////////////////////////

console.log("meinpraktikum.de Javascript Jobs Fetching....");
request('http://www.meinpraktikum.de/praktikum/suchen?&q=javascript',function(req,res,body) {
  if (!req) {

    var monster_js,count = 0;
    var $ = cheerio.load(body);

    {
      $('a.search-result-vacancy').each(function () {
        var a = $(this);
        var url = a.attr('href');
        urls_js.push('http://www.meinpraktikum.de'+url);
        count++;
      });
      monster_js = count;
    }

    {
      $('a.search-result-vacancy').each(function () {
        var b = $(this);
        var str = b.attr('href');
        var company = str.substring(str.lastIndexOf("praktikum/")+10,str.lastIndexOf("/jobs"));
        companies_js.push(company);
      });
    }

    {
      $('a.search-result-vacancy').each(function () {
        var c = $(this);
        var str = c.attr('href');
        var src = str.search("jobs/");
        var len = str.length;
        var desc = str.substring(src+5,len);
        descriptions_js.push(desc);
      });
    }

    {
      $('span','.title').each(function () {
        var d = $(this);
        var location = d.text();
        locations_js.push(location);
      });
    }

    {
      var e = new Date();
      for (var i = 0; i < monster_js; i++) {
        dates_js.push("x");
      }
    }

    for(var i=0;i<monster_js;i++)
    {
      category_js.push("javascript");
    }

    console.log("meinpraktikum.de JavaScript jobs # "+monster_js);

  }else {console.log(">> meinpraktikum.de JavaScript Jobs Request not sent !!!")}
});

///////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////StepStone C++////////////////////////////////////////////////

urls_c = [];
dates_c = [];
descriptions_c = [];
companies_c = [];
locations_c = [];
category_c = [];
jobs_c = [];

console.log("StepStone C++ Jobs Fetching....");
request('http://www.it-jobs.stepstone.de/?what=C+++Developer&where=&resultsPerPage=25',function(req,res,body) {
  if (!req) {

    var stepstone_c,count = 0;
    var $ = cheerio.load(body);

    $('a.resultItem-link', '#resultList').each(function () {
      var a = $(this);
      var url = a.attr('href');
      urls_c.push(url);
      count++;
    });
    stepstone_c = count;

    $('.date').each(function () {
      var b = $(this);
      var date = b.text();
      dates_c.push(date);
    });

    $('.job').each(function(){
      var c = $(this);
      var desc = c.text();
      descriptions_c.push(desc);
    });

    $('.company').each(function(){
      var d = $(this);
      var company = d.text();
      companies_c.push(company);
    });

    $('.location','#resultList').each(function(){
      var e = $(this);
      var location = e.text();
      locations_c.push(location);
    });

    for(var i=0;i<stepstone_c;i++)
    {
      category_c.push("c++");
    }

    console.log("StepStone C++ jobs # "+stepstone_c);

  }else {console.log(">> StepStone C++ Jobs Request not sent !!!")}
});

///////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////Meinpraktikum C++////////////////////////////////////////////////

console.log("meinpraktikum.de C++ Jobs Fetching....");
request('http://www.meinpraktikum.de/praktikum/suchen?location=&q=c%2B%2B',function(req,res,body) {
  if (!req) {

    var monster_c,count = 0;
    var $ = cheerio.load(body);

    {

      $('a.search-result-vacancy').each(function () {
        var a = $(this);
        var url = a.attr('href');
        urls_c.push('http://www.meinpraktikum.de'+url);
        count++;
      });
      monster_c = count;
    }

    {
      $('a.search-result-vacancy').each(function () {
        var b = $(this);
        var str = b.attr('href');
        var company = str.substring(str.lastIndexOf("praktikum/")+10,str.lastIndexOf("/jobs"));
        companies_c.push(company);
      });
    }

    {
      $('a.search-result-vacancy').each(function () {
        var c = $(this);
        var str = c.attr('href');
        var src = str.search("jobs/");
        var len = str.length;
        var desc = str.substring(src+5,len);
        descriptions_c.push(desc);
      });
    }

    {
      $('span','.title').each(function () {
        var d = $(this);
        var location = d.text();
        locations_c.push(location);
      });
    }

    {
      var e = new Date();
      for (var i = 0; i < monster_c; i++) {
        dates_c.push("x");
      }
    }

    for(var i=0;i<monster_c;i++)
    {
      category_c.push("c++");
    }

    console.log("meinpraktikum.de C++ jobs # "+monster_c);

  }else {console.log(">> meinpraktikum.de C++ Jobs Request not sent !!!")}
});

///////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////StepStone PHP////////////////////////////////////////////////

urls_php = [];
dates_php = [];
descriptions_php = [];
companies_php = [];
locations_php = [];
category_php = [];
jobs_php = [];

console.log("StepStone PHP Jobs Fetching....");
request('http://www.it-jobs.stepstone.de/?what=PHP-Entwickler/in&where=&resultsPerPage=25',function(req,res,body) {
  if (!req) {

    var stepstone_php,count = 0;
    var $ = cheerio.load(body);

    $('a.resultItem-link', '#resultList').each(function () {
      var a = $(this);
      var url = a.attr('href');
      urls_php.push(url);
      count++;
    });
    stepstone_php = count;

    $('.date').each(function () {
      var b = $(this);
      var date = b.text();
      dates_php.push(date);
    });

    $('.job').each(function(){
      var c = $(this);
      var desc = c.text();
      descriptions_php.push(desc);
    });

    $('.company').each(function(){
      var d = $(this);
      var company = d.text();
      companies_php.push(company);
    });

    $('.location','#resultList').each(function(){
      var e = $(this);
      var location = e.text();
      locations_php.push(location);
    });

    for(var i=0;i<stepstone_php;i++)
    {
      category_php.push("php");
    }

    console.log("StepStone PHP jobs # "+stepstone_php);

  }else {console.log(">> StepStone PHP Jobs Request not sent !!!")}
});

///////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////Meinpraktikum PHP////////////////////////////////////////////////

console.log("meinpraktikum.de PHP Jobs Fetching....");
request('http://www.meinpraktikum.de/praktikum/suchen?&q=php',function(req,res,body) {
  if (!req) {

    var monster_php,count = 0;
    var $ = cheerio.load(body);

    {

      $('a.search-result-vacancy').each(function () {
        var a = $(this);
        var url = a.attr('href');
        urls_php.push('http://www.meinpraktikum.de'+url);
        count++;
      });
      monster_php = count;
    }

    {
      $('a.search-result-vacancy').each(function () {
        var b = $(this);
        var str = b.attr('href');
        var company = str.substring(str.lastIndexOf("praktikum/")+10,str.lastIndexOf("/jobs"));
        companies_php.push(company);
      });
    }

    {
      $('a.search-result-vacancy').each(function () {
        var c = $(this);
        var str = c.attr('href');
        var src = str.search("jobs/");
        var len = str.length;
        var desc = str.substring(src+5,len);
        descriptions_php.push(desc);
      });
    }

    {
      $('span','.title').each(function () {
        var d = $(this);
        var location = d.text();
        locations_php.push(location);
      });
    }

    {
      var e = new Date();
      for (var i = 0; i < monster_php; i++) {
        dates_php.push("x");
      }
    }

    for(var i=0;i<monster_php;i++)
    {
      category_php.push("php");
    }

    console.log("meinpraktikum.de PHP jobs # "+monster_php);

  }else {console.log(">> meinpraktikum.de PHP Jobs Request not sent !!!")}
});

////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////StepStone Java////////////////////////////////////////////////

urls_java = [];
dates_java = [];
descriptions_java = [];
companies_java = [];
locations_java = [];
category_java = [];
jobs_java = [];

console.log("StepStone Java Jobs Fetching....");
request('http://www.it-jobs.stepstone.de/?what=Java-Entwickler/in&where=&resultsPerPage=25',function(req,res,body) {
  if (!req) {

    var stepstone_java,count = 0;
    var $ = cheerio.load(body);

    $('a.resultItem-link', '#resultList').each(function () {
      var a = $(this);
      var url = a.attr('href');
      urls_java.push(url);
      count++;
    });
    stepstone_java = count;

    $('.date').each(function () {
      var b = $(this);
      var date = b.text();
      dates_java.push(date);
    });

    $('.job').each(function(){
      var c = $(this);
      var desc = c.text();
      descriptions_java.push(desc);
    });

    $('.company').each(function(){
      var d = $(this);
      var company = d.text();
      companies_java.push(company);
    });

    $('.location','#resultList').each(function(){
      var e = $(this);
      var location = e.text();
      locations_java.push(location);
    });

    for(var i=0;i<stepstone_java;i++)
    {
      category_java.push("java");
    }

    console.log("StepStone Java jobs # "+stepstone_java);

  }else {console.log(">> StepStone Java Jobs Request not sent !!!")}
});


///////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////Meinpraktikum Java////////////////////////////////////////////////

console.log("meinpraktikum.de Java Jobs Fetching....");
request('http://www.meinpraktikum.de/praktikum/suchen?&q=java',function(req,res,body) {
  if (!req) {

    var monster_java,count = 0;
    var $ = cheerio.load(body);

    {

      $('a.search-result-vacancy').each(function () {
        var a = $(this);
        var url = a.attr('href');
        urls_java.push('http://www.meinpraktikum.de'+url);
        count++;
      });
      monster_java = count;
    }

    {
      $('a.search-result-vacancy').each(function () {
        var b = $(this);
        var str = b.attr('href');
        var company = str.substring(str.lastIndexOf("praktikum/")+10,str.lastIndexOf("/jobs"));
        companies_java.push(company);
      });
    }

    {
      $('a.search-result-vacancy').each(function () {
        var c = $(this);
        var str = c.attr('href');
        var src = str.search("jobs/");
        var len = str.length;
        var desc = str.substring(src+5,len);
        descriptions_java.push(desc);
      });
    }

    {
      $('span','.title').each(function () {
        var d = $(this);
        var location = d.text();
        locations_java.push(location);
      });
    }

    {
      var e = new Date();
      for (var i = 0; i < monster_java; i++) {
        dates_java.push("x");
      }
    }

    for(var i=0;i<monster_java;i++)
    {
      category_java.push("java");
    }

    console.log("meinpraktikum.de Java jobs # "+monster_java);

  }else {console.log(">> meinpraktikum.de Java Jobs Request not sent !!!")}
});

////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////StepStone Ruby on Rails////////////////////////////////////////////

urls_ror = [];
dates_ror = [];
descriptions_ror = [];
companies_ror = [];
locations_ror = [];
category_ror = [];
jobs_ror = [];

console.log("StepStone Ruby on Rails Jobs Fetching....");
request('http://www.it-jobs.stepstone.de/?what=ruby+on+rails&where=&resultsPerPage=25',function(req,res,body) {
  if (!req) {

    var stepstone_ror,count = 0;
    var $ = cheerio.load(body);

    $('a.resultItem-link', '#resultList').each(function () {
      var a = $(this);
      var url = a.attr('href');
      urls_ror.push(url);
      count++;
    });
    stepstone_ror = count;

    $('.date').each(function () {
      var b = $(this);
      var date = b.text();
      dates_ror.push(date);
    });

    $('.job').each(function(){
      var c = $(this);
      var desc = c.text();
      descriptions_ror.push(desc);
    });

    $('.company').each(function(){
      var d = $(this);
      var company = d.text();
      companies_ror.push(company);
    });

    $('.location','#resultList').each(function(){
      var e = $(this);
      var location = e.text();
      locations_ror.push(location);
    });

    for(var i=0;i<stepstone_ror;i++)
    {
      category_ror.push("RubyonRails");
    }

    console.log("Stepstone Ruby on Rails jobs # "+stepstone_ror);

  }else {console.log(">> StepStone Ruby on Rails Jobs Request not sent !!!")}
});

///////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////Meinpraktikum Ruby on Rails//////////////////////////////////////////

console.log("meinpraktikum.de Ruby on Rails Jobs Fetching....");
request('http://www.meinpraktikum.de/praktikum/suchen?&q=ruby+on+rails',function(req,res,body) {
  if (!req) {

    var monster_ror,count = 0;
    var $ = cheerio.load(body);

    {

      $('a.search-result-vacancy').each(function () {
        var a = $(this);
        var url = a.attr('href');
        urls_ror.push('http://www.meinpraktikum.de'+url);
        count++;
      });
      monster_ror = count;
    }

    {
      $('a.search-result-vacancy').each(function () {
        var b = $(this);
        var str = b.attr('href');
        var company = str.substring(str.lastIndexOf("praktikum/")+10,str.lastIndexOf("/jobs"));
        companies_ror.push(company);
      });
    }

    {
      $('a.search-result-vacancy').each(function () {
        var c = $(this);
        var str = c.attr('href');
        var src = str.search("jobs/");
        var len = str.length;
        var desc = str.substring(src+5,len);
        descriptions_ror.push(desc);
      });
    }

    {
      $('span','.title').each(function () {
        var d = $(this);
        var location = d.text();
        locations_ror.push(location);
      });
    }

    {
      var e = new Date();
      for (var i = 0; i < monster_ror; i++) {
        dates_ror.push("x");
      }
    }

    for(var i=0;i<monster_ror;i++)
    {
      category_ror.push("RubyonRails");
    }

    console.log("meinpraktikum.de Ruby on Rails jobs # "+monster_ror);

  }else {console.log(">> meinpraktikum.de Ruby on Rails Jobs Request not sent !!!")}
});

///////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////StepStone Python////////////////////////////////////////////

urls_python = [];
dates_python = [];
descriptions_python = [];
companies_python = [];
locations_python = [];
category_python = [];
jobs_python = [];

console.log("StepStone Python Jobs Fetching....");
request('http://www.it-jobs.stepstone.de/?what=python&where=&resultsPerPage=25',function(req,res,body) {
  if (!req) {

    var stepstone_python,count = 0;
    var $ = cheerio.load(body);

    $('a.resultItem-link', '#resultList').each(function () {
      var a = $(this);
      var url = a.attr('href');
      urls_python.push(url);
      count++;
    });
    stepstone_python = count;

    $('.date').each(function () {
      var b = $(this);
      var date = b.text();
      dates_python.push(date);
    });

    $('.job').each(function(){
      var c = $(this);
      var desc = c.text();
      descriptions_python.push(desc);
    });

    $('.company').each(function(){
      var d = $(this);
      var company = d.text();
      companies_python.push(company);
    });

    $('.location','#resultList').each(function(){
      var e = $(this);
      var location = e.text();
      locations_python.push(location);
    });

    for(var i=0;i<stepstone_python;i++)
    {
      category_python.push("python");
    }

    console.log("Stepstone Python jobs # "+stepstone_python);

  }else {console.log(">> StepStone Python Jobs Request not sent !!!")}
});

///////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////Meinpraktikum Python////////////////////////////////////////////////

console.log("meinpraktikum.de Python Jobs Fetching....");
request('http://www.meinpraktikum.de/praktikum/suchen?&q=python',function(req,res,body) {
  if (!req) {

    var monster_python,count = 0;
    var $ = cheerio.load(body);

    {

      $('a.search-result-vacancy').each(function () {
        var a = $(this);
        var url = a.attr('href');
        urls_python.push('http://www.meinpraktikum.de'+url);
        count++;
      });
      monster_python = count;
    }

    {
      $('a.search-result-vacancy').each(function () {
        var b = $(this);
        var str = b.attr('href');
        var company = str.substring(str.lastIndexOf("praktikum/")+10,str.lastIndexOf("/jobs"));
        companies_python.push(company);
      });
    }

    {
      $('a.search-result-vacancy').each(function () {
        var c = $(this);
        var str = c.attr('href');
        var src = str.search("jobs/");
        var len = str.length;
        var desc = str.substring(src+5,len);
        descriptions_python.push(desc);
      });
    }

    {
      $('span','.title').each(function () {
        var d = $(this);
        var location = d.text();
        locations_python.push(location);
      });
    }

    {
      var e = new Date();
      for (var i = 0; i < monster_python; i++) {
        dates_python.push("x");
      }
    }

    for(var i=0;i<monster_python;i++)
    {
      category_python.push("python");
    }

    console.log("meinpraktikum.de Python jobs # "+monster_python);

  }else {console.log(">> meinpraktikum.de Python Jobs Request not sent !!!")}
});

///////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////StepStone C#////////////////////////////////////////////

urls_Cs = [];
dates_Cs = [];
descriptions_Cs = [];
companies_Cs = [];
locations_Cs = [];
category_Cs = [];
jobs_Cs = [];

console.log("StepStone C# Jobs Fetching....");
request('http://www.it-jobs.stepstone.de/?what=C+.NET&where=&resultsPerPage=25',function(req,res,body) {
  if (!req) {

    var stepstone_Cs,count = 0;
    var $ = cheerio.load(body);

    $('a.resultItem-link', '#resultList').each(function () {
      var a = $(this);
      var url = a.attr('href');
      urls_Cs.push(url);
      count++;
    });
    stepstone_Cs = count;

    $('.date').each(function () {
      var b = $(this);
      var date = b.text();
      dates_Cs.push(date);
    });

    $('.job').each(function(){
      var c = $(this);
      var desc = c.text();
      descriptions_Cs.push(desc);
    });

    $('.company').each(function(){
      var d = $(this);
      var company = d.text();
      companies_Cs.push(company);
    });

    $('.location','#resultList').each(function(){
      var e = $(this);
      var location = e.text();
      locations_Cs.push(location);
    });

    for(var i=0;i<stepstone_Cs;i++)
    {
      category_Cs.push("C#");
    }

    console.log("Stepstone C# jobs # "+stepstone_Cs);

  }else {console.log(">> StepStone C# Jobs Request not sent !!!")}
});

///////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////Meinpraktikum C#////////////////////////////////////////////////

console.log("meinpraktikum.de C# Jobs Fetching....");
request('http://www.meinpraktikum.de/praktikum/suchen?location=&q=C%23',function(req,res,body) {
  if (!req) {

    var monster_Cs,count = 0;
    var $ = cheerio.load(body);

    {

      $('a.search-result-vacancy').each(function () {
        var a = $(this);
        var url = a.attr('href');
        urls_Cs.push('http://www.meinpraktikum.de'+url);
        count++;
      });
      monster_Cs = count;
    }

    {
      $('a.search-result-vacancy').each(function () {
        var b = $(this);
        var str = b.attr('href');
        var company = str.substring(str.lastIndexOf("praktikum/")+10,str.lastIndexOf("/jobs"));
        companies_Cs.push(company);
      });
    }

    {
      $('a.search-result-vacancy').each(function () {
        var c = $(this);
        var str = c.attr('href');
        var src = str.search("jobs/");
        var len = str.length;
        var desc = str.substring(src+5,len);
        descriptions_Cs.push(desc);
      });
    }

    {
      $('span','.title').each(function () {
        var d = $(this);
        var location = d.text();
        locations_Cs.push(location);
      });
    }

    {
      var e = new Date();
      for (var i = 0; i < monster_Cs; i++) {
        dates_Cs.push("x");
      }
    }

    for(var i=0;i<monster_Cs;i++)
    {
      category_Cs.push("C#");
    }

    console.log("meinpraktikum.de C# jobs # "+monster_Cs);

  }else {console.log(">> meinpraktikum.de C# Jobs Request not sent !!!")}
});

///////////////////////////////////////////////////////////////////////////////////////////////////

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Page Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
