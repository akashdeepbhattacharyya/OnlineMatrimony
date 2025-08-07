import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Match } from '@/src/models/Match';

type MatchState = {
  pendingMatches: Match[];
};

const initialState: MatchState = {
  pendingMatches: [],
};

export const fetchPendingMatches = createAsyncThunk(
  `match/fetchPendingMatches`,
  async (
    { getPendingMatches }: { getPendingMatches: () => Promise<Match[]> },
    thunkAPI,
  ) => {
    try {
      const response = await getPendingMatches();
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
    setMatches(state, action: PayloadAction<MatchState>) {
      state.pendingMatches = action.payload.pendingMatches;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchPendingMatches.fulfilled, (state, action) => {
      state.pendingMatches = action.payload;
    });
  },
});

export const { setMatches } = matchSlice.actions;
export default matchSlice.reducer;
