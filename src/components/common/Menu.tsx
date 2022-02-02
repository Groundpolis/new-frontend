import React, { HTMLAttributes, MouseEventHandler } from 'react';
import { IconType } from 'react-icons';
import { NavLink, To } from 'react-router-dom';
import styled from 'styled-components';

export type MenuProp = HTMLAttributes<HTMLDivElement> & {
  slim?: boolean;
};

export function Menu(p: MenuProp) {
  return (
    <div className={`menu large ${p.slim ? 'slim' : ''}`}>
      {p.children}
    </div>
  );
}

export const MenuSection = styled.section``;

export type ItemProp = {
  icon: IconType,
  label: string,
  onClick?: MouseEventHandler<HTMLElement>,
} & ({
  type: 'link',
  to: To,
} | {
  type: 'a',
  href: string,
} | ({
  type: 'button',
}));

export function MenuItem(p: ItemProp) {
  return p.type === 'link' ? (
    <NavLink className={({isActive}) => `item clickable ${isActive ? 'active' : ''}`} to={p.to} onClick={p.onClick}>
      <p.icon className="icon" /><span className="label">{p.label}</span>
    </NavLink>
  ) : p.type === 'a' ? (
    <a className="item clickable" href={p.href} target="_blank" rel="noreferrer noopener" onClick={p.onClick}>
      <p.icon className="icon" /><span className="label">{p.label}</span>
    </a>
  ) : (
    <button className="item clickable" onClick={p.onClick}>
      <p.icon className="icon" /><span className="label">{p.label}</span>
    </button>
  );
}