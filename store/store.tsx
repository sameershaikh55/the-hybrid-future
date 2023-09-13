import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createWrapper } from "next-redux-wrapper";
import { surveyQuestions } from "./reducers/survey";
import { authReducer } from "./reducers/auth";

// Set initial states for the store
export const initalState = {
  survey: {
    questionOne: {},
    questionOnePointTwo: {},
    questionTwo: {},
    questionThree: {},
    questionFour: {},
    questionFive: {},
    questionSix: {},
    questionSeven: {},
  },
  auth: {
    user: {},
    isAuthenticated: true,
    loading: false,
  },
};

// Combine multiple reducers using combineReducers()
const reducer = combineReducers({
  survey: surveyQuestions,
  auth: authReducer,
});

// Create middleware for the store
const middleware = [thunk];

// Create the store using createStore() with the combined reducers, initial state, and middleware
export const store = createStore(
  reducer,
  initalState,
  composeWithDevTools(applyMiddleware(...middleware))
);

// Create a function to assign the store to the Next.js wrapper
const makeStore = () => store;

// Create a wrapper for the store using createWrapper() from next-redux-wrapper
export const wrapper = createWrapper(makeStore);
