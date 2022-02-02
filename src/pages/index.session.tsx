import React from 'react';
import { FaBullhorn, FaChevronDown, FaComments, FaGlobe, FaHome, FaShareAlt } from 'react-icons/fa';
import styled from 'styled-components';
import ActionBar from '../components/common/action-bar/ActionBar';
import ActionBarButton from '../components/common/action-bar/ActionBarButton';
import NoteEditor from '../components/common/NoteEditor';
import NoteView from '../components/common/note/NoteView';
import { Spinner } from '../components/common/Spinner';
import { Tab } from '../components/common/Tab';
import { TimelineSource } from '../models/timeline-source';
import { useAppDispatch, useAppSelector } from '../store';
import { setCurrentTimeline } from '../store/timeline';

const NoteEditorCard = styled.div`
  position: sticky;
  top: 50px;
  z-index: 500;
`;

export default function SessionPage() {
  const {userCache, host, token} = useAppSelector(state => state.session);
  const {currentTimeline, notes, isFetchingNotes} = useAppSelector(state => state.timeline);
  const dispatch = useAppDispatch();

  if (!host || !token) throw new TypeError();
  if (!userCache) return null;

  const tabItems = [
    { key: 'home', element: <FaHome /> },
    { key: 'local', element: <FaComments /> },
    { key: 'social', element: <FaShareAlt /> },
    { key: 'global', element: <FaGlobe /> },
  ];

  return (
    <>
      <ActionBar>
        <Tab items={tabItems} selected={currentTimeline} onSelect={source => dispatch(setCurrentTimeline(source as TimelineSource))}/>
        <ActionBarButton className="item clickable mr-auto"><FaChevronDown /></ActionBarButton>
        <ActionBarButton className="item clickable"><FaBullhorn /></ActionBarButton>
      </ActionBar>
      <div className="container" style={{position: 'relative'}}>
        <div className="mb-2">
          <NoteEditor />
        </div>
        <div className="vgroup outline">
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
