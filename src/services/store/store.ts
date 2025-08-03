import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/userSlice';
import matchReducer from '../slices/match-slice';
import partnerPreferencesReducer from '../slices/partner-preferences';

export const store = configureStore({
  reducer: {
    user: userReducer,
    match: matchReducer,
    partnerPreferences: partnerPreferencesReducer,
  },
});

// Types for hooks and slices
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
