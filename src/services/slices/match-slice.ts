import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Match } from '@/src/models/Match';

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
    } catch (e) {
      console.error(e);
      return thunkAPI.rejectWithValue({ status: false, data: undefined });
    }
  },
);

const matchSlice = createSlice({
  name: 'match',
  initialState,
  reducers: {
    setBestMatches(state, action: PayloadAction<MatchState>) {
      state.bestMatches = action.payload.bestMatches;
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
