import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PartnerPreferences, User } from '@/models/User';
import { setItem } from '../local-storage';

type PartnerPreferencesState = {
  partnerPreferences?: PartnerPreferences;
};

const initialState: PartnerPreferencesState = {
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
      if (!response || !response.preference) {
        return thunkAPI.rejectWithValue({
          status: false,
          data: undefined,
          errorCode: 'NO_PREFERENCE',
          message: 'No partner preferences found',
        });
      }
      setItem('PARTNER_PREFERENCES', response.preference);
      return response.preference;
    } catch (e) {
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
    setPartnerPreferences(
      state,
      action: PayloadAction<PartnerPreferencesState>,
    ) {
      state.partnerPreferences = action.payload.partnerPreferences;
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
