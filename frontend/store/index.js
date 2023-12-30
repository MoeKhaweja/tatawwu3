import { configureStore, Tuple } from "@reduxjs/toolkit";
import counterReducer from "../features/counter";
import userReducer from "../features/user";

import { createLogger } from "redux-logger";

const logger = createLogger({});

export const store = configureStore({
  reducer: { counter: counterReducer, user: userReducer },
  middleware: () => new Tuple(logger),
});
