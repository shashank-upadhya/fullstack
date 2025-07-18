import "./App.css"
import { useState } from "react"

// const History = (props) => {
//   if (props.allClicks.length === 0) {
//     return (
//       <div>
//         the app is pressed by using the buttons
//       </div>
//     )
//   }
//   return (
//     <div>
//       button press history:{props.allClicks.join(' ')}
//     </div>
//   )
// }

// const Button = ({ handleClick, text }) => (
//   <button onClick={handleClick}>
//     {text}
//   </button>
// )

const Display = (props) => <div>{props.value}</div>

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  const [value, setValue] = useState(10)


  const setToValue = (value) => {
    console.log("value is", value)
    setValue(value)
  }

  return (
    <div>
      <Display value={value} />
      <Button handleClick={() => setToValue(1000)} text='thousand' />
      <Button handleClick={() => setToValue(0)} text='reset' />
      <Button handleClick={() => setToValue(value + 1)} text="increment" />
    </div >
  )
}
export default App
