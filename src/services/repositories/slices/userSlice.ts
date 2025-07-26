import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/store';
import { User } from '../../../models/User';
import { userRepository } from '../../../api';

type UserState = {
  userData: User;
};

const initialState: UserState = {
  userData: {} as User,
};

export const fetchUserProfile = createAsyncThunk(
  `user/userProfile`,
  async (_params, thunkAPI) => {
    try {
      const response = await userRepository.getProfile();
      if (response.status === false) {
        return thunkAPI.rejectWithValue(response);
      }
      return response.data;
    } catch (e) {
      console.error(e);
    } finally {
    }
    return [];
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      const { userData } = action.payload;
      console.log(userData);
      state.userData = userData;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchUserProfile.fulfilled, (_state, action) => {
      const { payload } = action;
      console.log(payload);
      // state.userData = payload;
    });
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
export const accountStateItem = (state: RootState) => state.user;
