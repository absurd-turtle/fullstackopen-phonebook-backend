const express = require('express')
var morgan = require('morgan')
const app = express()

app.use(express.json())
app.use(morgan('tiny'))

let persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/info', (request, response) => {
  response.send(`
    Phonebook has infor for ${persons.length} people<br>
    ${new Date()} 
`)
})

app.get('/api/person/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  }
  else {
    response.status(404).end()
  }
})

app.delete('/api/person/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(note => note.id !== id)

  response.status(204).end()
})

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}


const badRequest = (message) => {
  return response.status(400).json({
    error: message
  })
}

app.post('/api/person', (request, response) => {
  const person = request.body
  console.log(person)

  if (!person.name) {
    let error = "no name was given"
    return badRequest(error)
  }

  if (!person.id) {
    let error = "no id was given"
    return badRequest(error)
  }

  if (persons.find(p => p.name === person.name)) {
    let error = "name must be unique"
    return badRequest(error)
  }

  person.id = getRandomInt(Number.MAX_SAFE_INTEGER)

  persons = persons.concat(person)

  response.json(person)
})


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
