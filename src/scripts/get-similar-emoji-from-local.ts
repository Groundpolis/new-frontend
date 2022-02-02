import { Instance } from '../models/Instance';

export function getSimilarEmojiFromLocal(emoji: string, meta: Instance) {
  const [name, host] = emoji.substring(1, emoji.length - 1).split('@');
  if (host === '.') return name;
  const newEmoji = meta.emojis.find(e => e.name === name)?.name;
  return newEmoji ? `:${newEmoji}:`  : null;
}