import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LayoutType } from '../models/unions';

const initialState = {
  layoutType: 'basic' as LayoutType,
  isMobile: false,
  isTablet: false,
  isLaptop: false,
};

const screen = createSlice({
  name: 'screen',
  initialState,
  reducers: {
    setLayoutType(state, {payload: type}: PayloadAction<LayoutType>) {
      state.layoutType = type;
    },
    setMobile(state, {payload}: PayloadAction<boolean>) {
      state.isMobile = payload;
    },
    setTablet(state, {payload}: PayloadAction<boolean>) {
      state.isTablet = payload;
    },
    setLaptop(state, {payload}: PayloadAction<boolean>) {
      state.isLaptop = payload;
    },
  },
});

export const {
  setLayoutType,
  setMobile,
  setTablet,
  setLaptop,
} = screen.actions;

export default screen.reducer;
