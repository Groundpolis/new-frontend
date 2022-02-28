import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Note } from 'misskey-js/built/entities';
import { TimelineSource } from '../models/timeline-source';
import { storage } from '../scripts/storage';


const initialState = {
  notes: [] as Note[],
  queue: [] as Note[],
  isFetchingNotes: false,
  isScrolling: false,
  untilId: null as string | null,
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
      const target = state.isScrolling ? state.queue : state.notes;
      target.unshift(payload);
      state.notes = state.notes.slice(0, 100);
    },
    appendNotesToTop(state, {payload}: PayloadAction<Note[]>) {
      state.notes.unshift(...payload);
    },
    appendNotesToBottom(state, {payload}: PayloadAction<Note[]>) {
      state.notes.push(...payload);
    },
    setNotes(state, {payload}: PayloadAction<Note[]>) {
      state.notes = (payload);
    },
    updateNote(state, {payload: newNote}: PayloadAction<Note>) {
      const ni = state.notes.findIndex(n => n.id === newNote.id);
      if (ni >= 0) state.notes[ni] = newNote;
      const qi = state.queue.findIndex(n => n.id === newNote.id);
      if (qi >= 0) state.queue[qi] = newNote;
    },
    deleteNote(state, {payload: id}: PayloadAction<string>) {
      state.notes = state.notes.filter(n => n.id !== id);
      state.queue = state.queue.filter(n => n.id !== id);
    },
    setFetchingNotes(state, {payload}: PayloadAction<boolean>) {
      state.isFetchingNotes = payload;
    },
    setScrolling(state, {payload}: PayloadAction<boolean>) {
      state.isScrolling = payload;
      state.notes.unshift(...state.queue);
      state.queue = [];
      state.notes = state.notes.slice(0, 300);
    },
  },
});

export const {
  setCurrentTimeline,
  setCurrentList,
  setCurrentAntenna,
  clearNotes,
  appendNote,
  appendNotesToTop,
  appendNotesToBottom,
  setNotes,
  updateNote,
  deleteNote,
  setFetchingNotes,
  setScrolling,
} = sessionSlice.actions;

export default sessionSlice.reducer;
