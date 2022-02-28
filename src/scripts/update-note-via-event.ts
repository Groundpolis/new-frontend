import produce from 'immer';
import { Note } from 'misskey-js/built/entities';
import { NoteUpdatedEvent } from 'misskey-js/built/streaming.types';

export const updateNoteViaEvent = (it: Note, e: NoteUpdatedEvent, myselfId?: string): Note => {
  return produce(it, n => {
    switch (e.type) {
    case 'pollVoted': {
      if (!n.poll) return;
      n.poll.choices[e.body.choice].votes++;
      if (e.body.userId === myselfId) n.poll.choices[e.body.choice].isVoted = true;
      break;
    }
    case 'reacted': {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const {reaction: r, userId, emoji} = e.body;
      n.reactions[r] = (n.reactions[r] ?? 0) + 1;
      if (userId === myselfId) n.myReaction = r;
      if (emoji) n.emojis.push(emoji);
      break;
    }
    // 'unreacted' だけ無いのでTypeScriptを黙らせてでも使う
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    case 'unreacted': {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { reaction: r, userId }: string = e.body.reaction;
      n.reactions[r] -= 1;
      if (userId === myselfId) n.myReaction = undefined;
      if (n.reactions[r] <= 0) {
        delete n.reactions[r];
      }
      break;
    }
    }
  });
};