import { combineReducers } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import AuthReducer from "./slices/AuthSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
const reducers = combineReducers({
  user: AuthReducer,
});
const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

let persistor = persistStore(store);
export default store;
export { persistor };
