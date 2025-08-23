import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/store';
import { User } from '../../models/User';

type UserState = {
  userData: User;
};

const initialState: UserState = {
  userData: {} as User,
};

export const fetchUserProfile = createAsyncThunk(
  `user/userProfile`,
  async ({ getProfile }: { getProfile: () => Promise<User> }, thunkAPI) => {
    try {
      const response = await getProfile();
      console.log('fetchUserProfile response:', response);
      return response;
    } catch (e) {
      console.error(e);
      return thunkAPI.rejectWithValue({ status: false, data: undefined });
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      const { userData } = action.payload;
      state.userData = userData;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      const { payload } = action;
      state.userData = payload;
    });
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
export const accountStateItem = (state: RootState) => state.user;
