require('dotenv').config()
const Person=require('./models/contact')
const express=require('express')
const morgan=require('morgan')
const cors=require('cors')

const app=express()
app.use(cors())
app.use(express.static('dist'))


let persons=[
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.use(express.json())
app.use(express.static('dist'))

morgan.token('body',(request,response)=>{
  return request.method === 'POST' ? JSON.stringify(response.body) : 0
})

// app.use(morgan('tiny: body'))

app.get('/',(request,response)=>{
  response.send('<h1>Hello World</>')
})

app.get('/api/persons/',(request,response)=>{
  Person.find({}).then(persons=>{
    response.json(persons)
  })
  
})

app.get('/info',(request,response)=>{
    const n=persons.length
    const now= new Date()
    response.send(
      `<p>Phonebook has a info for ${n} people</p>
      <p>${now}</p>`
    )
})

app.get('/api/persons/:id',(request,response)=>{
  const id=request.params.id
  const person=persons.find(person=>person.id===id)

  if(person){
    response.json(person)
  }else{
    response.status(404).end()
  }
})

const generatedId=()=>{
  const maxId=Math.floor(Math.random() * 10000)
  return String(maxId)
}

app.post('/api/persons/',(request,response)=>{
  const body=request.body

  if(!body.name){
    return response.status(400).json({
      error:'name is missing'
    })
  }

  if(!body.number){
    return response.status(400).json({
      error:'number is missing'
    })
  }

  const existingPerson = persons.find(person => 
    person.name.toLowerCase() === body.name.toLowerCase()
  )

  if(existingPerson){
    return response.status(400).json({
      error:"name must be unique"
    })
  }

  const person=new Person({
    name:body.name,
    number:body.number
  })

  person.save().then(savedPerson=>{
    response.json(savedPerson)
  })

  // const person={
  //   id:generatedId(),
  //   name:body.name,
  //   number:body.number
  // }

  persons=persons.concat(person)

  console.log(person)
  response.json(person)
})

app.delete('/api/persons/:id',(request,response)=>{
  const id=request.params.id
  persons=persons.filter(person=>person.id!==id)
  response.status(204).end()
})

const PORT=process.env.PORT||3001
app.listen(PORT,()=>{
    console.log(`Server running on PORT ${PORT}`)
})


// const express = require('express')
// const app = express()

// let persons = [
//     { 
//       "id": "1",
//       "name": "Arto Hellas", 
//       "number": "040-123456"
//     },
//     { 
//       "id": "2",
//       "name": "Ada Lovelace", 
//       "number": "39-44-5323523"
//     },
//     { 
//       "id": "3",
//       "name": "Dan Abramov", 
//       "number": "12-43-234345"
//     },
//     { 
//       "id": "4",
//       "name": "Mary Poppendieck", 
//       "number": "39-23-6423122"
//     }
// ]

// app.use(express.json())

// app.get('/', (request, response) => {
//   response.send('<h1>Hello World</h1>')
// })

// app.get('/api/persons/', (request, response) => {
//   response.json(persons)
// })

// app.get('/info', (request, response) => {
//     const n = persons.length
//     const now = new Date()
//     response.send(
//       `<p>Phonebook has info for ${n} people</p>
//       <p>${now}</p>`
//     )
// })

// app.get('/api/persons/:id', (request, response) => {
//   const id = request.params.id
//   const person = persons.find(person => person.id === id)

//   if (person) {
//     response.json(person)
//   } else {
//     response.status(404).end()
//   }
// })

// const generatedId = () => {
//   const maxId = Math.floor(Math.random() * 10000)
//   return String(maxId)
// }

// app.post('/api/persons/', (request, response) => {
//   const body = request.body

//   // Check if name is missing
//   if (!body.name) {
//     return response.status(400).json({
//       error: 'name is missing'
//     })
//   }

//   // Check if number is missing
//   if (!body.number) {
//     return response.status(400).json({
//       error: 'number is missing'
//     })
//   }

//   // Check if name already exists (case-insensitive comparison)
//   const existingPerson = persons.find(person => 
//     person.name.toLowerCase() === body.name.toLowerCase()
//   )

//   if (existingPerson) {
//     return response.status(400).json({
//       error: 'name must be unique'
//     })
//   }

//   const person = {
//     id: generatedId(),
//     name: body.name,
//     number: body.number
//   }

//   persons = persons.concat(person)

//   console.log(person)
//   response.json(person)
// })

// app.delete('/api/persons/:id', (request, response) => {
//   const id = request.params.id
//   persons = persons.filter(person => person.id !== id)
//   response.status(204).end()
// })

// const PORT = 3001
// app.listen(PORT, () => {
//     console.log(`Server running on PORT ${PORT}`)
// })