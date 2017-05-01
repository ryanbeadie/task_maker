// requires
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
var pg = require('pg');
var port = 5000;


var config = {
  database: 'task_to_do',
  host: 'localhost',
  port: 5432,
  max: 10
};

var pool = new pg.Pool( config );

// uses
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

// base url
app.get( '/', function (req, res) {
  console.log(' hit on base url ');
  res.sendFile( path.resolve( 'public/index.html' ) );
});

// listens
app.listen(port, function( req, res ){
  console.log('listening on port', port);
});



app.post('/tasks', function(req, res){
  console.log('in send task to database');
  pool.connect(function (err, connection, done) {
    if (err) {
      console.log( err );
      res.sendStaus( 400 );
    } else {
      console.log('connect to DB in tasks');

      connection.query ("INSERT INTO tasks_to_be_done (task , completed ) VALUES ($1 , $2 )", [req.body.theTask, "FALSE"]);
      
      done();
      res.sendStatus (201 );
    }//end else
  });//end pool
});


var allTasks= [];
//app.get for /getAll ajax
app.get( '/getTasks', function( req, res ) {
  console.log('in /getAll');
  allTasks = [];
  pool.connect(function( err, connection, done ) {
    if( err ) {
      console.log( err );
      res.sendStatus( 400 );
    } else {
        console.log('connect to DB');
        var resultSet = connection.query( 'SELECT * FROM tasks_to_be_done' );

        resultSet.on( 'row', function( row ) {
          allTasks.push( row );
        }); // end result.on
        resultSet.on('end', function() {
          done();
          res.send( allTasks );
        }); // end on end
    } // end if/else
  }); // end Pool
}); // end /getAll


app.post('/delete', function(req, res){
  console.log('in send task to database');
  pool.connect(function (err, connection, done) {
    if (err) {
      console.log( err );
      res.sendStaus( 400 );
    } else {
      console.log('connect to DB in delete tasks');

      connection.query ( "DELETE from tasks_to_be_done  where id=" + req.body.id);

      done();
      res.sendStatus (201 );
    }//end else
  });//end pool
});

app.post('/complete', function(req, res){
  console.log('in send task to database');
  pool.connect(function (err, connection, done) {
    if (err) {
      console.log( err );
      res.sendStaus( 400 );
    } else {
      console.log('connect to DB in complete tasks');
      console.log(req.body.isItDone);
      console.log(req.body.id);

      connection.query ( "UPDATE tasks_to_be_done  SET completed = " + req.body.isItDone + " where id =" + req.body.id);

      done();
      res.sendStatus (201 );
    }//end else
  });//end pool
});
