import { createStore } from 'redux';

// Define the initial state
const initialState = {
  counter: 0
};

// Define a reducer
const counterReducer = (state = initialState, action: { type: string }) => {
  switch (action.type) {
    case 'INCREMENT':
      return { counter: state.counter + 1 };
    case 'DECREMENT':
      return { counter: state.counter - 1 };
    default:
      return state;
  }
};

// Create the Redux store
const store = createStore(counterReducer);

export type RootState = ReturnType<typeof store.getState>;
export default store;
