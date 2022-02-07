import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../../store';
import EmojiView from '../EmojiView';
import Popup, { PopupProp } from '../Popup';


const ITEM_WIDTH = 48;
const HORIZONTAL_COUNT = 7;

export type EmojiPopupProp = PopupProp & {
  onChoose?: (emoji: string) => void;
};

const Container = styled.div`
overflow: auto;
position: relative;
height: ${ITEM_WIDTH * 8}px;
> h1 {
  position: sticky;
  top: 0;
  padding: 4px 8px;
  font-size: 1em;
  background: var(--panel);
  z-index: 100;
  margin: 0;
}
`;

const EmojiGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: ${ITEM_WIDTH * HORIZONTAL_COUNT + 16}px;
  padding: 8px;
  > .emoji {
    padding: 0;
    width: ${ITEM_WIDTH}px;
    height: ${ITEM_WIDTH}px;
    font-size: ${Math.floor(ITEM_WIDTH * 0.5)}px;
    overflow: hidden;
  }
`;

export default function EmojiPicker(p: EmojiPopupProp) {
  const {meta} = useAppSelector(state => state.session);
  if (!meta) throw new TypeError();

  useEffect(() => {
    // console.log(emojiList);
  }, []);

  const {emojis} = meta;

  const customCategories = useMemo(() => (Array.from(new Set(emojis.map(e => e.category).filter(e => e)))), [emojis]);

  const groupedEmojis = useMemo(() => customCategories.map(c => ({name: c, emojis: emojis.filter(e => e.category === c)})).concat({
    name: '',
    emojis: emojis.filter(e => !e.category)
  }), [customCategories]);

  const clickEmoji = (e: string) => {
    if (p.onChoose) p.onChoose(e);
    p.close();
  };

  return (
    <Popup {...p} innerClassName="card">
      <Container>
        {groupedEmojis.map(category => (
          <>
            <h1>{category.name || 'カテゴリ無し'}</h1>
            <EmojiGrid>
              {category.emojis.map(e => (
                <button className="btn flat emoji" key={e.id} onClick={() => clickEmoji(`:${e.name}:`)}>
                  <EmojiView emoji={`:${e.name}:`} customEmojis={emojis} normal/>
                </button>
              ))}
            </EmojiGrid>
          </>
        ))}
      </Container>
    </Popup>
  );
}
