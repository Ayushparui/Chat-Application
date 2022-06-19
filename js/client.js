
const socket = io('http://localhost:3000')

const form = document.getElementById('send-container')
const messageInput = document.getElementById('messageImp')
const messageContainer = document.querySelector(".container")
var audio = new Audio('tune/ping.mp3');

const append = (message, position) =>{
    const messagElement  = document.createElement('div')
    messagElement.innerText = message;
    messagElement.classList.add('message')
    messagElement.classList.add(position)
    messageContainer.append(messagElement)
    if(position == 'left'){
        audio.play();
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, `right`)
    socket.emit('send', message)
    messageInput.value = ''
})

const userName = prompt("Enter your Name to join");
socket.emit('new-user-joined', userName)


socket.on('user-joined', userName =>{
    append(`${userName}: joined the chat`,`right`)
})
socket.on('receive', data =>{
    append(`${data.userName}:${data.message}`,`left`)
})
socket.on('left', name =>{
    append(`${userName}: left the chat`,`left`)
})