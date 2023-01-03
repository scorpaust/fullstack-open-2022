import { useDispatch } from "react-redux";
import { aimToVote } from "../reducers/anecdoteReducer";

const Anecdote = ({ anecdote }) => {

    const dispatch = useDispatch();

    return (
        <div>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => dispatch(aimToVote(anecdote.id))}>vote</button>
            </div>
        </div>
    );
}
 
export default Anecdote;