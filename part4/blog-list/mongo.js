require('dotenv').config()
const mongoose = require('mongoose')

url=process.env.MONGO_URL

mongoose.connect(url)



