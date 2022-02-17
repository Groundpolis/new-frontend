import React from 'react';
import styled from 'styled-components';
import { ItemProp, MenuItem, MenuView } from '../MenuView';
import Popup, { PopupProp } from '../Popup';

export type MenuItemSection = {
  section: string,
  items: ItemProp[],
} | ItemProp[];

export type MenuPopupProp = PopupProp & {
  items: MenuItemSection[],
};

const MenuWrapper = styled.div`
  width: 256px;
`;

export default function MenuPopup(p: MenuPopupProp) {
  const items = p.items.map((s, i) => (
    <section key={i}>
      {!Array.isArray(s) && <h1>{s.section}</h1>}
      {(Array.isArray(s) ? s : s.items).map((item, i2) => <MenuItem {...item} key={i2} onClick={(e) => {
        if (item.onClick) item.onClick(e);
        p.close();
      }} />)}
    </section>
  ));
  return (
    <Popup {...p} innerClassName="card pa-1">
      <MenuWrapper>
        <MenuView>
          {items}
        </MenuView>
      </MenuWrapper>
    </Popup>
  );
}
