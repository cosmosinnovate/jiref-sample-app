import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};
let middleWare = [thunk];
let store;

if (process.env.NODE_ENV === "production") {
  middleWare = [...middleWare];
  store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleWare))
  );

} else {

  store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleWare),
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );
}

export default store;
