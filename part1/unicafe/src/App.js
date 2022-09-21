import AppHeader from './AppHeader'
import StateStatistics from './StateStatistics'
import { useState } from 'react'
import ButtonContainer from './ButtonContainer'

const App = () => {

  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [feedback, setFeedback] = useState(false)
  
  const Stats = [
    {
      name: 'good',
      int: 1,
      handleButton: () => { setGood(good + 1); setTotal(total + 1); setFeedback(true) },
      total: good
    },
    {
      name: 'neutral',
      int: 0,
      handleButton: () => { setNeutral(neutral + 1); setTotal(total + 1); setFeedback(true) },
      total: neutral
    },
    {
      name: 'bad',
      int: -1,
      handleButton: () => { setBad(bad + 1); setTotal(total + 1); setFeedback(true) },
      total: bad
    },
    {
      name: 'all',
      total: total
    }
  ]

  return (
    <div>
      <AppHeader text="give feedback" />
      <ButtonContainer stats={Stats} />
      <AppHeader text="statistics" />
      {feedback && <StateStatistics stats={Stats} />}
      {!feedback && <p>No feedback fiven</p>}
    </div>
  )
}

export default App