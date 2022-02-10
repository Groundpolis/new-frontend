import React, { useMemo } from 'react';
import styled from 'styled-components';
import { TWEMOJI_BASE } from '../../const';
import { useAppSelector } from '../../store';

const EmojiImg = styled.img`
  height: 1.25em;
	vertical-align: -0.25em;
`;

export function UnicodeEmojiView({emoji}: EmojiViewProp) {
  const url = useMemo(() => {
    let codes = Array.from(emoji).map(x => x.codePointAt(0)?.toString(16));
    if (!codes.includes('200d')) codes = codes.filter(x => x != 'fe0f');
    codes = codes.filter(x => x && x.length);

    return `${TWEMOJI_BASE}/${codes.join('-')}.svg`;
  }, [emoji]);

  return <EmojiImg src={url} alt={emoji} title={emoji} decoding="async" />;
}

export function CustomEmojiView(p: EmojiViewProp) {
  const {meta} = useAppSelector(state => state.session);
  if (!meta) throw new TypeError();
  const emojis = [...(p.customEmojis ?? []), ...meta.emojis];
  const emoji = emojis.find(e => e.name === p.emoji.substring(1, p.emoji.length - 1));
  if (!emoji) {
    return <span>{p.emoji}</span>;
  } else {
    return <EmojiImg src={emoji.url} alt={emoji.name} style={p.normal ? undefined : { height: '2.5em'}} loading="lazy" />;
  }
}

export type EmojiViewProp = {
  emoji: string,
  customEmojis?: {name: string, url: string}[],
  normal?: boolean,
};

export default function EmojiView(p: EmojiViewProp) {
  return p.emoji.startsWith(':') ? <CustomEmojiView {...p} /> : <UnicodeEmojiView {...p} />;
}
