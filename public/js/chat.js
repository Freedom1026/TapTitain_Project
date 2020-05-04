$(function(){
    let test = localStorage.getItem('chat');
    console.log(test);
    if(test == "true"){
        $("div.chatroom").css("display","block");
    }
    else{
        $("div.chatroom").css("display","none");
    }
    var form = document.getElementById('msgsend');
})


function chat(){
    localStorage.setItem('chat',"true");
    $("div.chatroom").css("display","block");
}

function closeChat(){
    localStorage.setItem('chat',"false");
    $("div.chatroom").css("display","none");
}

//socket

var socket = io();

function spevent(e){
    e.preventDefault();
  var inputA = document.querySelector('#myname');
  var inputB = document.querySelector('#message');
  console.log(text);
  var text = inputA.value + " : " + inputB.value;
  socket.emit('message', text);
  inputB.value = '';
}

// var msgform = document.getElementsByTagName('form');
// console.log($("div.chatroom form"));
// msgform.addEventListener('submit', function(e) {
//   e.preventDefault();
//   var input = document.querySelector('#message');
//   console.log(text);
//   var text =  input.value;
//   socket.emit('message', text);
//   input.value = '';
// });

socket.on('message', function(text) {
  if (!text) {
    return;
  }
  var container = document.getElementsByClassName("chatmsg")[0];
  console.log(container);
  var newMessage = document.createElement('p');
  newMessage.innerText = text;
  container.appendChild(newMessage);

  var seperator = document.createElement('br');
  container.appendChild(seperator);

  container.scrollTop = container.scrollHeight;
});