// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/rootReduces";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),  
});

export type AppDispatch = typeof store.dispatch; 
export default store;
