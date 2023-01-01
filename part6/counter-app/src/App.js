import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment, zero } from "./features/counter/counterSlice";

const App = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <div>{count}</div>
      <button onClick={(e) => dispatch(increment())}>plus</button>
      <button onClick={(e) => dispatch(decrement())}>minus</button>
      <button onClick={(e) => dispatch(zero())}>zero</button>
    </div>
  );
};

export default App;
