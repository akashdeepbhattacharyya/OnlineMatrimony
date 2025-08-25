import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/user-slice';
import matchReducer from '../slices/match-slice';
import searchSliceReducer from '../slices/search-slice';
import subscriptionPlanReducer from '@/services/slices/subscription-plan-slice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    match: matchReducer,
    subscriptionPlans: subscriptionPlanReducer,
    search: searchSliceReducer,
  },
});

// Types for hooks and slices
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
