import { useState } from "react"

const Button = (props) => {
  return (
    <button onClick={props.handleEvent}>{props.text}</button>
  )
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  if (props.good == 0 && props.neutral == 0 && props.bad == 0) {
    return (
      <p>No feedback given</p>
    )
  }
  const All = () => {
    return props.good + props.neutral + props.bad
  }
  const Avg = (props.good * 1 + props.neutral * 0 + props.bad * -1) / (All())
  return (
    <div>
      <h3>statistics</h3>
      <table>
        <tbody>
          <StatisticLine text="good" value={props.good}></StatisticLine>
          <StatisticLine text="neutral" value={props.neutral}></StatisticLine>
          <StatisticLine text="bad" value={props.bad}></StatisticLine>
          <StatisticLine text="all" value={All()}></StatisticLine>
          <StatisticLine text="avg" value={Avg}></StatisticLine>
          <StatisticLine text="positive" value={props.good / All() * 100 + " %"}></StatisticLine>
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }
  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }
  const handleBadClick = () => {
    setBad(bad + 1)
  }



  return (
    <div>
      <h2>give feedback</h2>
      <Button text="good" handleEvent={handleGoodClick}></Button>
      <Button text="neutral" handleEvent={handleNeutralClick}></Button>
      <Button text="bad" handleEvent={handleBadClick}></Button>
      <br />
      <Statistics good={good} bad={bad} neutral={neutral}></Statistics>
    </div>
  )
}

export default App