import { createSlice, DeepPartial, PayloadAction } from '@reduxjs/toolkit';
import { Note } from 'misskey-js/built/entities';
import { TimelineSource } from '../models/timeline-source';
import { storage } from '../scripts/storage';

const initialState = {
  notes: [] as Note[],
  isFetchingNotes: false,
  currentTimeline: (storage.get('currentTimeline') ?? 'home') as TimelineSource,
  currentList: storage.get('currentList'),
  currentAntenna: storage.get('currentAntenna'),
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setCurrentTimeline(state, {payload}: PayloadAction<TimelineSource>) {
      state.currentTimeline = payload;
      storage.set('currentTimeline', payload);
    },
    setCurrentList(state, {payload}: PayloadAction<string>) {
      state.currentList = payload;
      storage.set('currentList', payload);
    },
    setCurrentAntenna(state, {payload}: PayloadAction<string>) {
      state.currentAntenna = payload;
      storage.set('currentAntenna', payload);
    },
    clearNotes(state) {
      state.notes = [];
    },
    appendNote(state, {payload}: PayloadAction<Note>) {
      state.notes.unshift(payload);
    },
    setNotes(state, {payload}: PayloadAction<Note[]>) {
      state.notes = (payload);
    },
    updateNote(state, {payload}: PayloadAction<DeepPartial<Note>>) {
      // TODO
    },
    setFetchingNotes(state, {payload}: PayloadAction<boolean>) {
      state.isFetchingNotes = payload;
    },
  },
});

export const {
  setCurrentTimeline,
  setCurrentList,
  setCurrentAntenna,
  clearNotes,
  appendNote,
  setNotes,
  updateNote,
  setFetchingNotes,
} = sessionSlice.actions;

export default sessionSlice.reducer;
