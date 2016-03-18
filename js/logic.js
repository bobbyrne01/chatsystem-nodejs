var socket = io.connect();
socket.on('message', function(msg){
  console.log(msg);
  $('#messages').append($('<li>').text(msg));
});

$(function(){
  $('form').submit(function(){
    socket.emit('message', $('#m').val());
    $('#m').val('');
    return false;
  });

  // authenticate .. not implemented fully
  $('#signIn').click(function(){
    socket.emit('signIn', $('#user').val());
  });
});
