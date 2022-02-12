import React from 'react';
import { FaBars, FaBell, FaEnvelope, FaHashtag, FaHome, FaPencilAlt } from 'react-icons/fa';
import { NavLink, NavLinkProps } from 'react-router-dom';
import styled from 'styled-components';
import { showModal } from '../../../scripts/show-modal';
import { useAppDispatch } from '../../../store';
import { setVisibleMenu } from '../../../store/screen';
import NoteEditorDialog from '../dialogs/NoteEditorDialog';

const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 11;
  > .tab {
    background: var(--panel);
    box-shadow: 0 -2px 8px var(--shadow-color);
    height: 50px;
    justify-content: space-between;
    > .item {
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: center;
      &::after {
        top: 0;
        bottom: auto;
      }
    }
  }
`;

const Fab = styled.button`
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  background: var(--panel);
  font-size: 1.25rem;
  bottom: 64px;
  &.primary {
    color: var(--primary-fg);
    background: var(--primary);
  }
  &.left {
    left: 16px;
  }
  &.right {
    right: 16px;
  }
`;

export default function BottomCommandBar() {
  const dispatch = useAppDispatch();
  const onClickShowMenu = () => {
    dispatch(setVisibleMenu(true));
  };

  const onClickCreateNote = () => {
    showModal(NoteEditorDialog);
  };
  
  const item: NavLinkProps['className'] = p => `item ${p.isActive ? 'active' : ''}`;
  return (
    <Container>
      <Fab className="left shadow-1 circle" onClick={onClickShowMenu}>
        <FaBars />
      </Fab>
      <Fab className="right shadow-1 circle primary" onClick={onClickCreateNote}>
        <FaPencilAlt />
      </Fab>
      <div className="tab">
        <NavLink to='/' className={item}><FaHome /></NavLink>
        <NavLink to='/explore' className={item}><FaHashtag /></NavLink>
        <NavLink to='/notifications' className={item}><FaBell /></NavLink>
        <NavLink to='/messaging' className={item}><FaEnvelope /></NavLink>
      </div>
    </Container>
  );
}
