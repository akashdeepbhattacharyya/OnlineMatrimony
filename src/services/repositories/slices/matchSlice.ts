import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/store';
import { User } from '../../../models/User';
import { ApiResponse } from '@/src/models/ApiResponse';
import { Match } from '@/src/models/match';

type UserState = {
  searchData: Match;
};

const initialState: UserState = {
  searchData: {} as Match,
};

export const fetchSearchData = createAsyncThunk(
  `user/userProfile`,
  async (
    { getSearches }: { getSearches: () => Promise<ApiResponse<Match>> },
    thunkAPI,
  ) => {
    try {
      const response = await getSearches();
      if (response.status === false) {
        return thunkAPI.rejectWithValue(response);
      }
      return response.data;
    } catch (e) {
      console.error(e);
      return thunkAPI.rejectWithValue({ status: false, data: undefined });
    }
  },
);

const matchSlice = createSlice({
  name: 'match',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchSearchData.fulfilled, (state, action) => {
      const { payload } = action;
      console.log(payload, 'payload');
      state.searchData = payload;
    });
  },
});

export default matchSlice.reducer;
export const searchStateItem = (state: RootState) => state.match;
