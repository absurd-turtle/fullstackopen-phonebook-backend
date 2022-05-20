const express = require('express')
var morgan = require('morgan')
const app = express()
const cors = require('cors')
const process = require('process')
const dotenv = require('dotenv')
dotenv.config()

const Person = require('./models/person')

app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.static('build'))

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/info', (request, response) => {
  Person.find({}).then(persons => {
    response.send(`
      Phonebook has info for ${persons.length} people<br>
      ${new Date()} 
    `)
  })
})

app.get('/api/person/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

app.delete('/api/person/:id', (request, response) => {
})

app.post('/api/person', (request, response) => {
  const body = request.body
  console.log(body)

  if (body.name === undefined || body.number === undefined) {
    return response.status(400).json({ error: 'attribute missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    return response.json(savedPerson)
  })
})


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
