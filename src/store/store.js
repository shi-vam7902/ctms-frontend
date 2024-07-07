import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from '../features/auth/authSlice';
import themeReducer from '../features/theme/themeSlice';
import userReducer from '../features/user/userSlice';
import projectsReducer from "../features/project/projectSlice";
const rootReducer = combineReducers({
  auth: authReducer,
  theme: themeReducer,
  user: userReducer,
  projects:projectsReducer
});

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
  whitelist: ['auth'], // Specify which reducers you want to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
