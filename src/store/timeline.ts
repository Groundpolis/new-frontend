import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Note } from 'misskey-js/built/entities';
import { NoteUpdatedEvent } from 'misskey-js/built/streaming.types';
import { TimelineSource } from '../models/timeline-source';
import { storage } from '../scripts/storage';


const initialState = {
  notes: [] as Note[],
  isFetchingNotes: false,
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
      state.notes.unshift(payload);
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
    updateNote(state, {payload: e}: PayloadAction<NoteUpdatedEvent & {currentUserId?: string}>) {
      switch (e.type as string) {
      case 'reacted': {
        const {reaction, userId, emoji} = e.body as {reaction: string, userId: string, emoji?: {name: string, url: string}};
        const note = state.notes.find(n => n.id === e.id);
        state.notes.filter(n => n.renoteId === e.id).map(n => n.renote).concat(note).forEach((n?: Note) => {
          const rs = n?.reactions;
          if (!n || !rs) return;
          rs[reaction] = (rs[reaction] ?? 0) + 1;
          if (emoji) {
            n.emojis.push(emoji);
          }
          if (userId === e.currentUserId) {
            n.myReaction = reaction;
          }
        });
        break;
      }
      case 'unreacted': {
        const {reaction, userId} = e.body as {reaction: string, userId: string};
        const note = state.notes.find(n => n.id === e.id);
        state.notes.filter(n => n.renoteId === e.id).map(n => n.renote).concat(note).forEach((n?: Note) => {
          const rs = n?.reactions;
          if (!n || !rs) return;
          if (rs[reaction] <= 1) {
            delete rs[reaction];
          } else {
            rs[reaction] = rs[reaction] - 1;
          }
          if (userId === e.currentUserId) {
            n.myReaction = undefined;
          }
        });
        break;
      }
      case 'deleted':
        state.notes = state.notes.filter(n => n.id !== e.id && n.renoteId !== e.id);
        break;
      default:
        console.warn('Unsupported or not implemented updateNote event type: ' + e.type);
        break;
      }
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
  appendNotesToTop,
  appendNotesToBottom,
  setNotes,
  updateNote,
  setFetchingNotes,
} = sessionSlice.actions;

export default sessionSlice.reducer;
