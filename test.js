import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import taskSlice from "./src/features/tasks/taskSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, taskSlice);

const store = configureStore({
  reducer: { task: persistedReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store
export let persistor = persistStore(store);

//? Below is part of main.jsx

// import { PersistGate } from 'redux-persist/integration/react'

// const container = document.getElementById('root')

// if (container) {
//   const root = createRoot(container)

//   root.render(
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persistor}>
//         <App />
//       </PersistGate>
//     </Provider>,
//   )
// } else {
//   throw new Error(
//     "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
//   )
// }
