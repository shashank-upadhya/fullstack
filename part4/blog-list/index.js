const express = require('express')
const Blog = require('./models/blogs')
require('./mongo')
const app = express()

app.use(express.json())


app.get('/api/blogs', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  
  })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog.save().then((result) => {
    response.status(201).json(result)
  })
})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


// let blogs=[
//     {
//         title: "React patterns",
//         author: "Michael Chan",
//         url: "https://reactpatterns.com/",
//         likes: 7,
//         id: "6312e1f4f2a3c3a1f0e4d123",
//     },
//     {
//         title: "Go To Statement Considered Harmful",
//         author: "Edsger W. Dijkstra",
//         url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
//         likes: 5,
//         id: "6312e1f4f2a3c3a1f0e4d124",
//     },
//     {
//         title: "Canonical string reduction",
//         author: "Edsger W. Dijkstra",
//         url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
//         likes: 12,
//         id: "6312e1f4f2a3c3a1f0e4d125", 
//     }
// ]