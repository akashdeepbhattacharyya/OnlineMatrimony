import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SubscriptionPlan } from '@/models/SubscriptionPlan';

type SubscriptionPlanState = {
  subscriptionPlans: SubscriptionPlan[];
};

const initialState: SubscriptionPlanState = {
  subscriptionPlans: [],
};

const subscriptionPlanSlice = createSlice({
  name: 'subscriptionPlan',
  initialState,
  reducers: {
    setSubscriptionPlans(state, action: PayloadAction<SubscriptionPlan[]>) {
      console.log("Setting subscription plans:", action.payload);
      state.subscriptionPlans = action.payload;
    },
  },
});

export const { setSubscriptionPlans } = subscriptionPlanSlice.actions;
export default subscriptionPlanSlice.reducer;
