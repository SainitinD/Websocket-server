const ws = new require('ws')
const wss = new ws.Server({port: 9999})

wss.on('connection', function (ws) {
    console.log('Connection recieved!')

    // connection is up
    ws.on('message', function (data) {
        wss.clients.forEach(function each(client) {
            if (client != ws && client.readyState == ws.OPEN) {
                client.send(data)
            }
        })
    })
})




