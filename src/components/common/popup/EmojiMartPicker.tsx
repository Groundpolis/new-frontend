import { BaseEmoji, CustomEmoji, Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import React from 'react';
import { useAppSelector } from '../../../store';
import Popup, { PopupProp } from '../Popup';


export type EmojiPopupProp = PopupProp & {
  onChoose?: (emoji: string) => void;
};

export default function EmojiMartPicker(p: EmojiPopupProp) {
  const {meta} = useAppSelector(state => state.session);
  if (!meta) throw new TypeError();
  const isDark = document.body.classList.contains('dark');

  const clickEmoji = (e: string) => {
    if (p.onChoose) p.onChoose(e);
    p.close();
  };

  const customEmojis: CustomEmoji[] = meta.emojis.map(e => ({
    name: e.name,
    short_names: [e.name],
    text: '',
    emoticons: [],
    keywords: e.aliases,
    imageUrl: e.url,
    customCategory: e.category,
  } as CustomEmoji));

  return (
    <Popup {...p} innerClassName="">
      <Picker autoFocus set="twitter" color="var(--primary)" theme={isDark ? 'dark' : 'light'} custom={customEmojis} onClick={e => {
        clickEmoji((e as BaseEmoji).native ?? `:${(e as CustomEmoji).short_names[0]}:`);
      }} />
    </Popup>
  );
}
