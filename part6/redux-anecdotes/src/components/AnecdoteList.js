import { useSelector } from 'react-redux'
import Anecdote from './Anecdote';

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector((state) => state.filter);
  
    const sortedAnecdotes = anecdotes.sort((a, b) => (a.votes < b.votes) ? 1 : -1)

    return sortedAnecdotes
    .filter((anecdote) => anecdote.content.includes(filter))
    .map(anecdote => <Anecdote key={anecdote.id} anecdote={anecdote} />)
  
}

export default AnecdoteList;