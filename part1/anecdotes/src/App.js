import { useState } from 'react'
import AppHeader from './AppHeader'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState({0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0})
  const [highestVoted, setHighestVoted] = useState(0)

  const vote = () => {
    const key = selected;

    switch (key) {
      case 0:
        setPoints({...points, 0: points[key] + 1 });
        break;
      case 1: 
        setPoints({...points, 1: points[key] + 1 });
        break;
      case 2:
        setPoints({...points, 2: points[key] + 1 });
        break;
      case 3: 
        setPoints({...points, 3: points[key] + 1 });
        break;
      case 4:
        setPoints({...points, 4: points[key] + 1 });
        break;
      case 5: 
        setPoints({...points, 5: points[key] + 1 });
        break;
      case 6:
        setPoints({...points, 6: points[key] + 1 });
        break;
      default:
        break;
    }

    mostVotedAnecdote();

  }

  const mostVotedAnecdote = () => {

    setHighestVoted(Object.keys(points).reduce(function(a, b){ return points[a] > points[b] ? a : b }));
  }

  const nextAnecdote = () => {
    const nextAnecdote = Math.floor(Math.random() * anecdotes.length);

    setSelected(nextAnecdote);
  }

  return (
    <div>
      <AppHeader text="Anecdote of the day" />
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <button onClick={nextAnecdote}>next anecdote</button>
      <button onClick={vote}>vote</button>
      <AppHeader text="Anecdote with most votes" />
      <p>{anecdotes[highestVoted]}</p>
      <p>has {points[highestVoted]} votes</p>
    </div>
  );
}

export default App