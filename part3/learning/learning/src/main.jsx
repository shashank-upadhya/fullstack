// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client'
import axios from 'axios'
import './index.css'
import App from './App.jsx'

axios.get('http://localhost:3001/api/notes').then(response => {

  const notes = response.data
  ReactDOM.createRoot(document.getElementById('root')).render(
    <App notes={notes}></App>)
})

ReactDOM.createRoot(document.getElementById('root')).render(<App />)



