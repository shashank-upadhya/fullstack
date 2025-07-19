import { useState, useEffect } from 'react'
import Note from './components/Note'
import axios from 'axios'
import noteService from './services/notes'
import Notification from './components/Notification'
import Footer from './components/Footer'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(false)
  const [errorMessage,setErrorMessage]=useState(null)

  useEffect(() => {
    //console.log('effect')
    axios
      .get("http://localhost:3002/notes")
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }, [])
  console.log('render', notes.length, 'notes')

  const showNotes = showAll ? notes : notes.filter(note => note.important === true)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  const toggleImportanceOf = (id) => {
    const url = `http://localhost:3002/notes/${id}`
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    axios.put(url, changedNote).then(response => {
      setNotes(notes.map(note => note.id === id ? response.data : note))
    })

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id === id ? returnedNote : note))
      })
      .catch(error => {
        setErrorMessage(
          `Note ${note.content} was already removed from the server`
        )
        setTimeout(()=>{
          setErrorMessage(null)
        },5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }



  // console.log(notes)
  const addNote = (event) => {
    event.preventDefault()
    // console.log("button clicked", event.target)
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: String(notes.length + 1),
    }

    axios
      .post("http://localhost:3002/notes", noteObject)
      .then(response => {
        setNotes(notes.concat(response.data))
        setNewNote('')
      })

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

  const handleNewNote = (event) => {
    // console.log(event.target.value)
    setNewNote(event.target.value)
  }

  return (
    <div>
      <h1>Notes</h1> 
      <Notification message={errorMessage}/>
      <button onClick={() => setShowAll(!showAll)}>
        show{showAll ? ' important' : ' all'}
      </button>
      <ul>
        {showNotes.map(note =>
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNewNote} />
        <button type="save">submit</button>
      </form>
      <Footer />
    </div>
  )
}


export default App


// import { useState,useEffect } from "react";
// import axios from 'axios';


// const App=()=>{
//   const [value,setValue]=useState('')
//   const [rates,setRates]=useState({})
//   const [currency,setCurrency]=useState(null)

//   useEffect(()=>{
//     console.log('effect run, currency is now ', currency)

//     if(currency){
//       console.log('Fetching currency rates...')

//       axios
//         .get(`https://studies.cs.helsinki.fi/restcountries/api/all/${currency}`)
//         .then(response=>{
//           setRates(response.data.rates)
//         })
//     }
//   },[currency])

//   const handleChange=(event)=>{
//     setValue(event.target.value)
//   }

//   const onSearch=(event)=>{
//     event.preventDefault()
//     setCurrency(value)
//   }

//   // without using useEffect
//     // const onSearch = (event) => {
//     //   event.preventDefault()
//     //   axios
//     //     .get(`https://open.er-api.com/v6/latest/${value}`)
//     //     .then(response => {
//     //       setRates(response.data.rates)
//     //     })
//     // }

//   return(
//     <div>
//       <form onSubmit={onSearch}>
//         currency: <input value={value} onChange={handleChange}/>
//         <button type="submit">Exchange Rate</button>
//       </form>
//       <pre>
//         {JSON.stringify(rates,null,2)}
//       </pre>
//     </div>
//   )
// }

// export default App