import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Stats } from 'misskey-js/built/entities';
import { Instance } from '../models/Instance';

const initialState = {
  host: localStorage['host'],
  meta: null as Instance | null,
  stats: null as Stats | null,
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setHost(state, {payload}: PayloadAction<string>) {
      state.host = payload;
      localStorage['host'] = payload;
    },
    setMeta(state, {payload}: PayloadAction<Instance>) {
      state.meta = payload;
    },
    setStats(state, {payload}: PayloadAction<Stats>) {
      state.stats = payload;
    },
  },
});

export const {
  setHost,
  setMeta,
  setStats,
} = sessionSlice.actions;

export default sessionSlice.reducer;
