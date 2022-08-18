// const http = require('http')
require ('./mongo')
const jws = require('jsonwebtoken')
const express = require('express')
const cors = require('cors')
const app = express()
const Note = require('./model/Note')
const usersRouter = require('./controllers/users')
const { response } = require('express')

app.use(express.json())
app.use(cors())

app.use((request, response, next) => {
    console.log(request.body);
    console.log(request.method);
    console.log(request.path);
    next()
})

app.use('/api/users', usersRouter)

const notes = [
    {
        "id": 1,
        "content": "Hola Soy Tobi",
        "date": "today",
        "important": true
    },
    {
        "id": 2,
        "content": "Hola Soy Nacho",
        "date": "tomorrow",
        "important": false
    },
    {
        "id": 3,
        "content": "Hola Soy Fran",
        "date": "yesterday",
        "important": true
    }
]

// const app = http.createServer((request, response) => {
//     response.writeHead(200, { 'Content-Type' : 'text/plain' })
//     response.end('Hello World')
// })

app.get('/', (request, response) => {
    response.send('<h1>Hola Mundo</h1>')
})

app.get('/api/notes/', (request, response, next) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)
    response.json(note)
    next()
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.find(note => note.id === id)
    response.status(204).end()
})

app.post('/api/notes', (request, response) => {
    const note = request.body
    const ids = notes.map(note=> note.id)
    const maxId = Math.max(ids)
    const newNote = {
        id: maxId + 1,
        content: note.content,
        important: true,
        date: new Date().toISOString()
    }

    notes = [...notes, newNote]
    response.json(note)
})
const authorization = reuqest.get('auhtorization')
let token = null

if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7)
}

const decodedToken = jwt.verify(token, '123')

if (!token || !decodedToken.id) {
    return response.status(401).json({error: "token missing or invalid"})
}

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})