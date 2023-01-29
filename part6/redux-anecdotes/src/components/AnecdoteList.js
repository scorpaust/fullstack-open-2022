import { useSelector } from 'react-redux'
import Anecdote from './Anecdote';

const AnecdoteList = () => {
    const anecdotes = useSelector((state) => state.anecdotes)
    const filter = useSelector((state) => state.filter);

    return anecdotes
    .filter((anecdote) => anecdote.content.includes(filter))
    .sort((a, b) => (a.votes < b.votes) ? 1 : -1)
    .map(anecdote => <Anecdote key={anecdote.id} anecdote={anecdote} />)
  
}

export default AnecdoteList;