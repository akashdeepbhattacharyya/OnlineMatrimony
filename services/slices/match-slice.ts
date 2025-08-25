import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Match } from '@/models/Match';

type MatchState = {
  bestMatches: Match[];
};

const initialState: MatchState = {
  bestMatches: [],
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

const matchSlice = createSlice({
  name: 'match',
  initialState,
  reducers: {
    setBestMatches(state, action: PayloadAction<Match[]>) {
      state.bestMatches = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchBestMatches.fulfilled, (state, action) => {
      state.bestMatches = action.payload;
    });
  },
});

export const { setBestMatches } = matchSlice.actions;
export default matchSlice.reducer;
