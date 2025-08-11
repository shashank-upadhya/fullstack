// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client'
import axios from 'axios'
import './index.css'
import App from './App.jsx'

axios.get('https://fullstackopen-6.onrender.com/api/notes').then(response => {

  const notes = response.data
  ReactDOM.createRoot(document.getElementById('root')).render(
    <App notes={notes}></App>)
})

ReactDOM.createRoot(document.getElementById('root')).render(<App />)



