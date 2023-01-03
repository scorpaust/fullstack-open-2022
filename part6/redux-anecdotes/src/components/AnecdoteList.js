import { useSelector } from 'react-redux'
import Anecdote from './Anecdote';

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
  
    const sortedAnecdotes = anecdotes.sort((a, b) => (a.votes < b.votes) ? 1 : -1)

    return sortedAnecdotes.map(anecdote => <Anecdote key={anecdote.id} anecdote={anecdote} />)
  
}

export default AnecdoteList;