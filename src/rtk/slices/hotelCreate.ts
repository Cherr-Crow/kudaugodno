import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CreatHotel } from '@/axios/hotels_axios_instances';
import { Hotel } from '@/types/hotel';

import { RootState } from '../store';

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
    // TODO: временный метод для создания нового отеля, убрать после интеграции с бэкендом
    createHotelTemp: (state, action: PayloadAction<Hotel>) => {
      state.data = action.payload;
    },
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

export const { createHotelTemp, updateHotel } = hotelCreateSlice.actions;
export const selectorHotelCreate = (state: RootState) => state.hotelCreate;
export default hotelCreateSlice.reducer;
