import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Stats, UserDetailed } from 'misskey-js/built/entities';
import { Instance } from '../models/Instance';
import { storage } from '../scripts/storage';

const initialState = {
  host: storage.get('host'),
  meta: null as Instance | null,
  stats: null as Stats | null,
  token: storage.get('token'),
  userCache: JSON.parse(storage.get('usercache') ?? 'null') as UserDetailed | null,
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setHost(state, {payload}: PayloadAction<string>) {
      state.host = payload;
      storage.set('host', payload);
    },
    setMeta(state, {payload}: PayloadAction<Instance>) {
      state.meta = payload;
    },
    setStats(state, {payload}: PayloadAction<Stats>) {
      state.stats = payload;
    },
    setToken(state, {payload}: PayloadAction<string>) {
      state.token = payload;
      storage.set('token', payload);
    },
    setUserCache(state, {payload}: PayloadAction<UserDetailed>) {
      state.userCache = payload;
      storage.set('usercache', payload);
    },
  },
});

export const {
  setHost,
  setMeta,
  setStats,
  setToken,
  setUserCache,
} = sessionSlice.actions;

export default sessionSlice.reducer;
