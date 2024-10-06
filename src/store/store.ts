// import { configureStore } from "@reduxjs/toolkit";
// import authSlice from "./authSlice";
// const store = configureStore({
//   reducer: {
//     auth: authSlice,
//   },
// });

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; // Note: `authSlice` should be renamed to `authReducer`

// Configure the Redux store
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// Define the RootState type based on the store's reducer
export type RootState = ReturnType<typeof store.getState>;

// Define the AppDispatch type based on the store's dispatch
export type AppDispatch = typeof store.dispatch;

// Export the configured store
export default store;
