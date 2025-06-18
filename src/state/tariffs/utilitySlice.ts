import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { Utility } from '@/interfaces';
import { getAllUtilityDetails } from '@/helpers/genabilityApi';

type UtilityState = {
  isLoading: boolean;
  data: Array<Utility> | null;
  error: boolean;
};

const utilityInitialState: UtilityState = {
  isLoading: false,
  data: null,
  error: false,
};

const utilitySlice = createSlice({
  name: 'utilityData',
  initialState: utilityInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUtilityData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUtilityData.fulfilled, (state, action: PayloadAction<Array<Utility>>) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchUtilityData.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

export const fetchUtilityData = createAsyncThunk('fetchUtilityData', getAllUtilityDetails);

export default utilitySlice.reducer;
