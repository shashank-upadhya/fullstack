import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { useState } from 'react'
// import ReactDOM from 'react-dom/client'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <App counter={counter} />
// )

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
