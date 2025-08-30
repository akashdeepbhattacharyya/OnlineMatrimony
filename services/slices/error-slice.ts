import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ErrorData {
  title?: string;
  description?: string;
}

function withDefaultMessages(error?: Partial<ErrorData>): ErrorData {
  return {
    title: error?.title ?? "Oops!",
    description:
      error?.description ?? "Something went wrong! Please try again.",
  };
}

interface ErrorState {
  data?: ErrorData;
  visible: boolean;
}

const initialState: ErrorState = {
  data: withDefaultMessages(),
  visible: false,
};

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    showError(state, action: PayloadAction<ErrorData>) {
      state.data = withDefaultMessages(action.payload);
      state.visible = true;
    },
    hideError(state) {
      state.data = withDefaultMessages();
      state.visible = false;
    },
  },
});

export const { showError, hideError } = errorSlice.actions;
export default errorSlice.reducer;
