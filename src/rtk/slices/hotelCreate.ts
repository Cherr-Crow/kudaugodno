import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Hotel } from '@/types/hotel';
import { CreatHotel } from '@/axios/hotels_axios_instances';

const initialState = {
  data: {} as Hotel,
  pending: false,
  error: false,
};

export const creatHotel = createAsyncThunk('creatHotel', (arg: Hotel) =>
  CreatHotel(arg),
);

export const hotelCreateSlice = createSlice({
  name: 'hotelCreateSlice',
  initialState,
  reducers: {
    updateHotel: (state, action: PayloadAction<Hotel>) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(creatHotel.pending, (state) => {
        state.pending = true;
      })
      .addCase(creatHotel.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.data = payload;
      })
      .addCase(creatHotel.rejected, (state) => {
        state.pending = false;
        state.error = true;
      });
  },
});

export const { updateHotel } = hotelCreateSlice.actions;
export const selectTest = (state: RootState) => state.hotelCreate;
export default hotelCreateSlice.reducer;
