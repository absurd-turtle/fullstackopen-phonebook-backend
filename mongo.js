const mongoose = require('mongoose')
const process = require('process')

if (process.argv.length < 3) {
  console.log('Please provide the password, the name and the number as an argument in order to add a new person: node mongo.js <password> <name> <number>')
  console.log('Please provide the password in order to display all persons: node mongo.js <password>')
  process.exit(1)
}


const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
  `mongodb+srv://at:${password}@cluster0.iduii.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}
const person = new Person({
  id: getRandomInt(Number.MAX_SAFE_INTEGER),
  name,
  number
})

if (process.argv.length < 5) {
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(person.name + ' ' + person.number)
    })
    mongoose.connection.close()
  })
}
else {
  person.save().then(() => {
    console.log('person saved!')
    mongoose.connection.close()
  })
}

