require('dotenv').config()
const Note=require('./models/note')
const express= require('express')
// const http =require('http')
const app=express()
const cors=require('cors')
app.use(cors())
let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

// const app=http.createServer((request,response)=>{
//     response.writeHead(200,{'Content-Type':'application/json'})
//     response.end(JSON.stringify(notes))
// })


app.use(express.json()) //To access data easily Express json-parser
app.use(express.static('dist'))

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

// if (process.argv.length < 3) {
//   console.log('give password as argument')
//   process.exit(1)
// }

// const password = process.argv[2]

// const url = `mongodb+srv://shashankupadhya813:${password}@cluster0.jybhqzb.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`





app.get('/',(request,response)=>{
  response.send('<h1>Hello World</>')
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

app.get('/api/notes/:id', (request, response,next) => {
  Note.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
    // .catch(error => {
    //   console.log(error)
    //   response.status(400).send({ error: 'malformatted id' })
    // })
})

app.delete('/api/notes/:id',(request,response)=>{
  Note.findByIdAndDelete(request.params.id)
    .then(result=>{
        response.status(204).end()
    })
    .catch(error=>next(error))
})

const generatedId=()=>{
  const maxId=notes.length>0
    ? Math.max(...notes.map(n=>Number(n.id))) : 0

  return String(maxId+1)
}

app.post('/api/notes',(request,response)=>{
  const body=request.body
  
  if(!body.content){
    return response.status(400).json({
      error:'content is missing'
    })
  }

  const note = new Note({
    content: body.content,
    important: body.important||false
  })

  note.save().then(savedNote=>{
    response.json(savedNote)
  })

  // const note={
  //   content:body.content,
  //   important:body.important||false,
  //   id:generatedId()
  // }
  
  // notes=notes.concat(note)

  // console.log(note)
  // response.json(note)
})

app.put('/api/notes/:id', (request, response, next) => {
  const { content, important } = request.body

  Note.findById(request.params.id)
    .then(note => {
      if (!note) {
        return response.status(404).end()
      }

      note.content = content
      note.important = important

      return note.save().then((updatedNote) => {
        response.json(updatedNote)
      })
    })
    .catch(error => next(error))
})

app.use(requestLogger)
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)


const PORT = process.env.PORT || 3001
app.listen(PORT,'0.0.0.0',()=>{
  console.log(`Server running on PORT ${PORT}`)
})
