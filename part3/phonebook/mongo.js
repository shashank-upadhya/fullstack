const mongoose=require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =`mongodb+srv://shashankupadhya813:${password}@cluster0.4neh97i.mongodb.net/phoneBook?retryWrites=true&w=majority&appName=Cluster0`
mongoose.set('strictQuery',false)

mongoose.connect(url)

const phoneBookSchema=new mongoose.Schema({
  name: String,
  number: String
})

const Person=mongoose.model('Phonebook',phoneBookSchema)

if (name && number){
  const person=new Person({
    name,
    number,
  })

  person.save().then(result => {
    console.log(`added ${name} ${number} to phonebook` )
    mongoose.connection.close()
  })

}else{
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })}
