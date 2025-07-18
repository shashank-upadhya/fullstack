import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [max, setMax] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  // [6,0,0,10,3,0,0]
  const copy = [...votes]
  // [6,0,0,0,3,0,0]
  const handleVoteClick = () => {
    copy[selected] = copy[selected] + 1
    const current = copy.indexOf(Math.max(...copy))
    setVotes(copy)
    setMax(current)


  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const [selected, setSelected] = useState(0)

  const handleNextClick = () => {
    setSelected(getRandomInt(anecdotes.length))
  }




  return (
    <div>
      <h3>Anecdote of the day</h3><br />
      {anecdotes[selected]}
      <br />
      <p>has {votes[selected]} votes</p>
      <br />
      <button onClick={handleVoteClick}>vote</button>
      <button onClick={handleNextClick}>next anecdotes</button>
      <br />
      <h3>Anecdote with the most votes</h3><br />
      {anecdotes[max]}
      <br />
      <p>has {votes[max]} votes</p>
    </div>
  )
}

export default App