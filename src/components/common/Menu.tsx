import React, { HTMLAttributes, MouseEventHandler } from 'react';
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
  icon: string,
  label: string,
  onClick?: MouseEventHandler<HTMLElement>,
  danger?: boolean,
} & ({
  type: 'link',
  to: To,
} | {
  type: 'a',
  href: string,
} | ({
  type: 'button',
  disabled?: boolean,
}));


export function MenuItem(p: ItemProp) {
  const itemClass = `item clickable ${p.danger ? 'text-danger' : ''}`;
  const icon = typeof p.icon === 'string' ? <i className={`icon ${p.icon} fa-fw`} /> : <i className={`icon ${p.icon} fa-fw`} />;
  return p.type === 'link' ? (
    <NavLink className={({isActive}) => `${itemClass} ${isActive ? 'active' : ''}`} to={p.to} onClick={p.onClick}>
      {icon}<span className="label">{p.label}</span>
    </NavLink>
  ) : p.type === 'a' ? (
    <a className={itemClass} href={p.href} target="_blank" rel="noreferrer noopener" onClick={p.onClick}>
      {icon}<span className="label">{p.label}</span>
    </a>
  ) : (
    <button className={itemClass} onClick={p.onClick} disabled={p.disabled}>
      {icon}<span className="label">{p.label}</span>
    </button>
  );
}