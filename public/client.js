const url = 'ws://localhost:9999'
const client = new WebSocket(url)

var user = null
var msg = {
    'user':user,
    'message':'',
    'date':Date.now(),
}

client.onopen = () => {
    console.log('Connection opened with client!')
}

client.onmessage = (event) => showMessage(event)
client.onclose = function() {
    console.log('Connection closed!')
}

messages = document.getElementsByClassName('messages')[0]
input = document.getElementById('message')
sendBtn = document.getElementById('send-button')

sendBtn.addEventListener('click', handleBtnClick)
document.addEventListener('keyup', handleEnterButtonClick)

function handleEnterButtonClick(event) {
    if (event.code == "Enter") {
        console.log(event.code)
        handleBtnClick()
    }
}
function handleBtnClick() {
    var message = input.value
    showClientMessage(message)
    client.send(message)
    input.value = ''
}

async function showMessage(event) {
    const messageText = await event.data.text()
    console.log(messageText)
    const message = `Other: ${messageText}`
    const newMessage = document.createElement('div')
    const text = document.createTextNode(message)
    newMessage.appendChild(text)
    messages.appendChild(newMessage)
    newMessage.classList.add('message')
}

function showClientMessage(msg) {
    const message = `Client: ${msg}`
    const text = document.createTextNode(message)
    const newMessage = document.createElement('div')
    newMessage.appendChild(text)
    newMessage.classList.add('message')
    messages.appendChild(newMessage)
}