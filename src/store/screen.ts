import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LayoutType } from '../models/unions';

const initialState = {
  layoutType: 'basic' as LayoutType,
};

const screen = createSlice({
  name: 'screen',
  initialState,
  reducers: {
    setLayoutType(state, {payload: type}: PayloadAction<LayoutType>) {
      state.layoutType = type;
    },
  },
});

export const {
  setLayoutType,
} = screen.actions;

export default screen.reducer;
