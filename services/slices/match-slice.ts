import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Match } from '@/models/Match';

type MatchState = {
  bestMatches: Match[];
  mutualMatches: Match[];
};

const initialState: MatchState = {
  bestMatches: [],
  mutualMatches: [],
};

export const fetchBestMatches = createAsyncThunk(
  `match/fetchBestMatches`,
  async (
    { getBestMatches }: { getBestMatches: () => Promise<Match[]> },
    thunkAPI,
  ) => {
    try {
      const response = await getBestMatches();
      return response;
    } catch {
      return thunkAPI.rejectWithValue({ status: false, data: undefined });
    }
  },
);

export const fetchMutualMatches = createAsyncThunk(
  `match/fetchMutualMatches`,
  async (
    { getMutualMatches }: { getMutualMatches: () => Promise<Match[]> },
    thunkAPI,
  ) => {
    try {
      const response = await getMutualMatches();
      return response;
    } catch {
      return thunkAPI.rejectWithValue({ status: false, data: undefined });
    }
  },
);

const matchSlice = createSlice({
  name: 'match',
  initialState,
  reducers: {
    setBestMatches(state, action: PayloadAction<Match[]>) {
      state.bestMatches = action.payload;
    },
    setMutualMatches(state, action: PayloadAction<Match[]>) {
      state.mutualMatches = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchBestMatches.fulfilled, (state, action) => {
      state.bestMatches = action.payload;
    });
    builder.addCase(fetchMutualMatches.fulfilled, (state, action) => {
      state.mutualMatches = action.payload;
    });
  },
});

export const { setBestMatches } = matchSlice.actions;
export default matchSlice.reducer;
