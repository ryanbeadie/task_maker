$(document).ready( onReady );

function onReady () {
console.log('ready');


$('#send').on('click', sendTask);
$(document).on('click', '.delete', deleteTask);
$(document).on('change', '.complete', completeTask);

//get tasks to DOM
getTasks();


//function send data to db
function sendTask(){

      var taskToSend= {
        theTask: $('#taskOne').val(),
      };

$.ajax({
  url: '/tasks',
  type: 'POST',
  data: taskToSend,
  success: function (response) {
    console.log ('back from server with', response);
      getTasks();
    }//end success
  });//end ajax
}//end send data to db



// get everything from db
function getTasks() {

  $('#listOfTasks').empty();
  $.ajax({
    url: '/getTasks',
    type: 'GET',
    success: function(response) {

    for (var i = 0; i < response.length; i++) {
        $('#listOfTasks').append ( "<div class='newItem " +
         "' data-item='" +
          response[i].task +
        "'>" + response[i].task + " -" +  " " +
        //"<select class='complete' " + "' data-done='" + response[i].id + "'><option>Not Done</option><option>Done</option></select>'" +
        "<select class='complete' " + "' data-done='" + response[i].id + "'><option label='Not Done' value= FALSE>false</option><option label='Done' value=TRUE>True</option></select>'" +
        "<button class='delete'  " + "' data-id='" + response[i].id + "'>Delete</button>" +
        "</div>");

      }//end for loop
    } // end success
  }); // end AJAX
} // end getTasks



//function delete data from db
function deleteTask(){

    var id = $(this).data('id');
    var deleteToSend= {
      id: id,
      };

$.ajax({
  url: '/delete',
  type: 'POST',
  data: deleteToSend,
  success: function (response) {
    console.log ('back from server with', response);
    }//end success
  });//end ajax
  getTasks();
}//end send data to db


//send complete or not
function completeTask(){

  var id = $(this).data('id');
  var isItDone = $(this).val();

  console.log( 'var isItDone=',isItDone );

  var complete = {
    id: id,
    isItDone: isItDone
  };


$.ajax({
  url: '/complete',
  type: 'POST',
  data: complete,
  success: function (response) {
    console.log ('back from server with', response);
    }//end success
  });//end ajax
}//end send data to db
}//end onready
