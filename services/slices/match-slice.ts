import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Match, MutualMatch, ReceivedMatch, SentMatch } from '@/models/Match';

type MatchState = {
  bestMatches: Match[];
  mutualMatches: MutualMatch[];
  sentMatches: SentMatch[];
  receivedMatches: ReceivedMatch[];
};

const initialState: MatchState = {
  bestMatches: [],
  mutualMatches: [],
  sentMatches: [],
  receivedMatches: [],
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
    { getMutualMatches }: { getMutualMatches: () => Promise<MutualMatch[]> },
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

export const fetchSentMatches = createAsyncThunk(
  `match/fetchSentMatches`,
  async (
    { getSentMatches }: { getSentMatches: () => Promise<SentMatch[]> },
    thunkAPI,
  ) => {
    try {
      const response = await getSentMatches();
      return response;
    } catch {
      return thunkAPI.rejectWithValue({ status: false, data: undefined });
    }
  },
);

export const fetchReceivedMatches = createAsyncThunk(
  `match/fetchReceivedMatches`,
  async (
    { getReceivedMatches }: { getReceivedMatches: () => Promise<ReceivedMatch[]> },
    thunkAPI,
  ) => {
    try {
      const response = await getReceivedMatches();
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
    setMutualMatches(state, action: PayloadAction<MutualMatch[]>) {
      state.mutualMatches = action.payload;
    },
    setSentMatches(state, action: PayloadAction<SentMatch[]>) {
      state.sentMatches = action.payload;
    },
    setReceivedMatches(state, action: PayloadAction<ReceivedMatch[]>) {
      state.receivedMatches = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchBestMatches.fulfilled, (state, action) => {
      state.bestMatches = action.payload;
    });
    builder.addCase(fetchMutualMatches.fulfilled, (state, action) => {
      state.mutualMatches = action.payload;
    });
    builder.addCase(fetchSentMatches.fulfilled, (state, action) => {
      state.sentMatches = action.payload;
    });
    builder.addCase(fetchReceivedMatches.fulfilled, (state, action) => {
      state.receivedMatches = action.payload;
    });
  },
});

export const { setBestMatches, setMutualMatches, setSentMatches, setReceivedMatches } = matchSlice.actions;
export default matchSlice.reducer;
