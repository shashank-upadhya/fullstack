const express= require('express')
// const http =require('http')
const app=express()
const cors=require('cors')
app.use(cors)
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

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)

app.get('/',(request,response)=>{
  response.send('<h1>Hello World</>')
})

app.get('/api/notes/',(request,response)=>{
  response.json(notes)
})

app.get('/api/notes/:id',(request,response)=>{
  const id=request.params.id
  const note=notes.find(note=>note.id===id)
  if (note){
    response.json(note)
  } else{
    response.status(404).end()
  }
})

app.delete('/api/notes/:id',(request,response)=>{
  const id=request.params.id
  notes=notes.filter(note=>note.id!==id)
  response.status(204).end()
})

const generatedId=()=>{
  const maxId=notes.length>0
    ? Math.max(...notes.map(n=>Number(n.id))) : 0

  return String(maxId+1)
}

app.post('/api/notes/',(request,response)=>{
  const body=request.body
  
  if(!body.content){
    return response.status(400).json({
      error:'content is missing'
    })
  }

  const note={
    content:body.content,
    importnant:body.important||false,
    id:generatedId()
  }
  
  notes=notes.concat(note)

  console.log(note)
  response.json(note)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT,()=>{
  console.log(`Server running on PORT ${PORT}`)
})
