import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PartnerPreferences, User } from '@/src/models/User';
import { ApiResponse } from '@/src/models/ApiResponse';

type MatchState = {
  partnerPreferences?: PartnerPreferences;
};

const initialState: MatchState = {
  partnerPreferences: undefined,
};

export const fetchPartnerPreferences = createAsyncThunk(
  `preference/fetchPartnerPreferences`,
  async (
    { getPartnerPreferences }: { getPartnerPreferences: () => Promise<User> },
    thunkAPI,
  ) => {
    try {
      const response = await getPartnerPreferences();
      console.log('fetchPartnerPreferences response:', response);

      if (!response || !response.preference) {
        return thunkAPI.rejectWithValue({
          status: false,
          data: undefined,
          errorCode: 'NO_PREFERENCE',
          message: 'No partner preferences found',
        });
      }

      return response.preference;
    } catch (e) {
      console.error(e);
      return thunkAPI.rejectWithValue({
        status: false,
        data: undefined,
        errorCode: 'FETCH_ERROR',
        message: 'Failed to fetch partner preferences',
      });
    }
  },
);

const matchSlice = createSlice({
  name: 'preference',
  initialState,
  reducers: {
    setPartnerPreferences(state, action: PayloadAction<PartnerPreferences>) {
      state.partnerPreferences = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchPartnerPreferences.fulfilled, (state, action) => {
      state.partnerPreferences = action.payload;
    });
  },
});

export const { setPartnerPreferences } = matchSlice.actions;
export default matchSlice.reducer;
