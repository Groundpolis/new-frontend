import React from 'react';
import { FaBullhorn, FaChevronDown, FaComments, FaGlobe, FaHome, FaShareAlt } from 'react-icons/fa';
import styled from 'styled-components';
import NoteView from '../components/common/NoteView';
import { Spinner } from '../components/common/Spinner';
import { Tab } from '../components/common/Tab';
import { TimelineSource } from '../models/timeline-source';
import { useAppDispatch, useAppSelector } from '../store';
import { setCurrentTimeline } from '../store/timeline';

const ActionBar = styled.header`
  position: sticky;
  top: 0;
  display: flex;
  height: 50px;
  z-index: 10;
  > .item {
    height: 50px;
    margin: 0;
  }
`;

const ActionBarButton = styled.button`
  display: flex;
  color: var();
  width: 50px;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius);
  &:hover {
    background: var(--hover);
  }
  &.active {
    background: var(--hover);
  }
`;

const Header = styled.header`
  position: absolute;
`;

export default function SessionPage() {
  const {userCache, host, token} = useAppSelector(state => state.session);
  const {currentTimeline, notes, isFetchingNotes} = useAppSelector(state => state.timeline);
  const dispatch = useAppDispatch();

  if (!host || !token) throw new TypeError();

  if (!userCache) return null;

  return (
    <>
      <ActionBar className="bg-panel rounded-b shadow-2" style={{overflow: 'hidden'}}>
        <Tab items={[
          { key: 'home', element: <FaHome /> },
          { key: 'local', element: <FaComments /> },
          { key: 'social', element: <FaShareAlt /> },
          { key: 'global', element: <FaGlobe /> },
        ]} selected={currentTimeline} onSelect={source => dispatch(setCurrentTimeline(source as TimelineSource))}/>
        <ActionBarButton className="item clickable mr-auto"><FaChevronDown /></ActionBarButton>
        <ActionBarButton className="item clickable"><FaBullhorn /></ActionBarButton>
      </ActionBar>
      <div className="container">
        <div className="vstack">
          {notes.map(n => <NoteView note={n} key={n.id}/>)}
        </div>
        {isFetchingNotes && (
          <div className="flex f-center">
            <Spinner size={128}/>
          </div>
        )}
      </div>
    </>
  );
}
