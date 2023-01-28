import { useDispatch } from "react-redux";
import { aimToVote } from "../reducers/anecdoteReducer";
import { createNotification } from "../reducers/notificationReducer";

const Anecdote = ({ anecdote }) => {

    const dispatch = useDispatch();

    const voteAndNotify = async () => {
        dispatch(createNotification(`New vote for anecdote: ${anecdote.content}`, 5));
        dispatch(aimToVote(anecdote.id))
    }

    return (
        <div>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={voteAndNotify}>vote</button>
            </div>
        </div>
    );
}
 
export default Anecdote;