const lodash=require('lodash')

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  }
]



const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    // return blogs.reduce((sum, blog) => sum + blog.likes, 0)
    if (blogs.length === 0) {
        return 0
    }

    const likes=(sum,blog) => sum + blog.likes
      return blogs.reduce(likes,0)
  }


//   const favoriteBlog = (blogs) => {
//   if (blogs.length === 0) return null

//   let favorite = blogs[0] // Start by assuming the first blog is the favorite

//   for (let i = 1; i < blogs.length; i++) {
//     if (blogs[i].likes > favorite.likes) {
//       favorite = blogs[i] // Update favorite if current blog has more likes
//     }
//   }

//   return favorite
// }

// Another approach using reduce
const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null
  return blogs.reduce((mostLiked, blog) => (blog.likes > mostLiked.likes ? blog : mostLiked), blogs[0])
}

const mostBlogs = (blogs) => {
  const authorCount=lodash(blogs).countBy('author').entries().maxBy(lodash.last)

  const res={
    author: authorCount[0],
    blogs:authorCount[1]
  }
  // console.log(res)
  return res
}

const mostLikes=(blogs)=>{
  const authorLikes = lodash(blogs)
    .groupBy('author')
    .mapValues(authorBlogs => lodash.sumBy(authorBlogs, 'likes'))
    .toPairs()
    .maxBy(pair => pair[1])

  const res={
    author:authorLikes[0],
    likes:authorLikes[1]
  }
  console.log(res)
  return res
}

// const mostBlogs = (blogs) => {
//   const authorBlogCount = {}

//   blogs.forEach((blog) => {
//     if (authorBlogCount[blog.author]) {
//       authorBlogCount[blog.author] += 1
//     } else {
//       authorBlogCount[blog.author] = 1
//     }
//   })
//   return authorBlogCount
// }


// const favoriteBlog = (blogs) => {
//   return blogs.reduce((mostLiked, blog) => {
//     return (blog.likes > mostLiked.likes) ? blog : mostLiked
//   }, blogs[0])
// }

// const favoriteBlog = (blogs) => {
//   const compare = (a, b) => a.likes - b.likes
//   return blogs.sort(compare)[0]
// }

module.exports = {
  dummy,totalLikes,favoriteBlog,mostBlogs,mostLikes
}

