import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SearchUser } from '@/src/models/User';

type SearchUserState = {
  userSearchData: SearchUser[];
};

const initialState: SearchUserState = {
  userSearchData: [],
};

export const fetchSearchUser = createAsyncThunk(
  `search/fetchSearchUser`,
  async (
    {
      getSearchUser,
      data,
    }: {
      getSearchUser: (data: string) => Promise<SearchUser[]>;
      data: string;
    },
    thunkAPI,
  ) => {
    try {
      const response = await getSearchUser(data);


      if (!response) {
        return thunkAPI.rejectWithValue({
          status: false,
          data: undefined,
          errorCode: 'NO_SEARCH_USER',
          message: 'No Search User found',
        });
      }
      return response;
    } catch (e) {
      console.error('Error fetching search user:', e);
      return thunkAPI.rejectWithValue({
        status: false,
        data: undefined,
        errorCode: 'FETCH_ERROR',
        message: 'Failed to fetch search user',
      });
    }
  },
);


const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchSearchUser.fulfilled, (state, action) => {
      state.userSearchData = action.payload || [];
    });
  },
});

export default searchSlice.reducer;
