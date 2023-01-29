import { createSlice } from "@reduxjs/toolkit";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    aimToVote(state, action) {
      const id = action.payload;
      const anecdote = state.find((a) => a.id === id);
      const votedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : votedAnecdote
      );
    },
    createAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { aimToVote, createAnecdote, setAnecdotes } = anecdoteSlice.actions;

export default anecdoteSlice.reducer;