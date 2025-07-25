import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { UserProfile } from '../models/User';
import { RootState } from '../store/store';
import { User } from '../models/Authentication';
import { getProfile } from '../api/UserService';

type UserState = {
  UserProfile: User;
  token: string | null;
};
const sliceName = 'UserProfile';

const initialState: UserState = {
  UserProfile: {} as User,
  token: null,
};

export const fetchUserProfile = createAsyncThunk<any, any>(
  `${sliceName}/accountfetch`,
 async (params, ThunkAPI) => {
    try {
      const response = await getProfile();
      if (isAPIResponseFailure(response)) {
        return ThunkAPI.rejectWithValue(response);
      }
      return response;
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
      const { UserProfile, token } = action.payload;
      console.log(UserProfile, token);
      state.UserProfile = UserProfile;
      state.token = token;
    },
  },
  extraReducers: builder => {
    // builder.addCase(fetchUserProfile.pending, state => {
    //   state.UserProfile = {} as User;
    // });
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      const { payload } = action;
      console.log(payload);
      // state.UserProfile = get(payload, "data");
      // state.subscriptionTierLoading = false;
    });
    // builder.addCase(fetchUserProfile.rejected, state => {
    //   state.UserProfile = {} as User;
    // });
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
export const accountStateItem = (state: RootState) => state.user;

export const isAPIResponseFailure = (response: Response): boolean =>
  response.status < 200 || response.status >= 300;
