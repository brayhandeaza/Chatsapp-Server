const express = require("express")
const app = express()
const http = require("http").createServer(app)
const Server = require("socket.io")
const io = Server(http)
const PORT = process.env.PORT || 5000
const cors = require("cors")
const bodyParser = require('body-parser')


// const WebSocket = require('ws')
// const wss = new WebSocket.Server({ http })


io.on('connection', (socket) => {
    console.log('a user connected');
});


// check database connection
const { connection } = require('./db')
connection()

// middleware
app.use(cors({origin: '*'}))
app.use(bodyParser.json())
app.use("/users", require('./routes/Users'))
app.use("/messages", require('./routes/Messages'))
app.use("/conversations", require('./routes/Conversations'))

// app.use("/friends", require('./routes/Friends'))

app.get("/", (req, res) => {
    res.json({
        status: 200,
        message: "Chatsapp - API"
    })
})

http.listen(PORT, () => {
    console.log(`Listening local on: http://localhost:${PORT} \n`)
})