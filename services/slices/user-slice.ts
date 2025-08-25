import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PartnerPreferences, User, UserProfile } from '../../models/User';
import { Subscription } from '@/models/Subscription';

interface UserState extends Omit<User, 'profile' | 'preference'> {
  partnerPreferences?: PartnerPreferences;
  userProfile: UserProfile;
  subscription?: Subscription;
};

const initialState: UserState = {
  id: -1,
  email: '',
  phone: '',
  partnerPreferences: undefined,
  userProfile: {
    fullName: '',
    dateOfBirth: '',
    gender: "OTHER",
  },
  subscription: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserId(state, action: PayloadAction<number>) {
      state.id = action.payload;
    },
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    setPhone(state, action: PayloadAction<string>) {
      state.phone = action.payload;
    },
    setPartnerPreferences(state, action: PayloadAction<PartnerPreferences>) {
      state.partnerPreferences = action.payload;
    },
    setUserProfile(state, action: PayloadAction<UserProfile>) {
      state.userProfile = action.payload;
    },
    setSubscription(state, action: PayloadAction<Subscription>) {
      state.subscription = action.payload;
    },
    wipeOutUserData(state) {
      return initialState;
    },
  },
});

export const { setUserId, setEmail, setPhone, setPartnerPreferences, setUserProfile, setSubscription, wipeOutUserData } = userSlice.actions;
export default userSlice.reducer;
