import { Endpoints } from 'misskey-js';
import { Note } from 'misskey-js/built/entities';
import React, { useEffect, useState } from 'react';
import { FaBullhorn, FaChevronDown, FaChevronUp, FaComments, FaGlobe, FaHome, FaShareAlt } from 'react-icons/fa';
import styled from 'styled-components';
import NoteView from '../components/common/NoteView';
import { Tab } from '../components/common/Tab';
import { useMisskeyClient } from '../hooks/useMisskeyClient';
import { TimelineSource } from '../models/timeline-source';
import { initSession } from '../scripts/init-session';
import { useAppDispatch, useAppSelector } from '../store';
import { appendNote, clearNotes, setCurrentTimeline, setNotes } from '../store/timeline';

const ActionBar = styled.div`
  display: flex;
  height: 50px;
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

const getTimelineEndpoint = (timeline: TimelineSource): keyof Endpoints => {
  switch (timeline) {
  case 'home': return 'notes/timeline';
  case 'local': return 'notes/local-timeline';
  case 'social': return 'notes/hybrid-timeline';
  case 'global': return 'notes/global-timeline';
  case 'list': return 'notes/user-list-timeline';
  case 'antenna': return 'antennas/notes';
  default: throw new TypeError();
  }
};

export default function SessionPage() {
  const {userCache, host, token} = useAppSelector(state => state.session);
  const {currentTimeline, notes} = useAppSelector(state => state.timeline);
  const dispatch = useAppDispatch();

  if (!host || !token) throw new TypeError();

  const api = useMisskeyClient();

  useEffect(() => {
    dispatch(clearNotes());
    api.request(getTimelineEndpoint(currentTimeline), { limit: 100 }, token).then((notes) => dispatch(setNotes(notes)));
  }, [api, currentTimeline]);

  if (!userCache) return null;

  return (
    <>
      <header className="bg-panel rounded" style={{overflow: 'hidden'}}>
        <ActionBar>
          <Tab items={[
            { key: 'home', element: <FaHome /> },
            { key: 'local', element: <FaComments /> },
            { key: 'social', element: <FaShareAlt /> },
            { key: 'global', element: <FaGlobe /> },
          ]} selected={currentTimeline} onSelect={source => dispatch(setCurrentTimeline(source as TimelineSource))}/>
          <ActionBarButton className="item clickable mr-auto"><FaChevronDown /></ActionBarButton>
          <ActionBarButton className="item clickable"><FaBullhorn /></ActionBarButton>
        </ActionBar>
      </header>
      <div className="container">
        <p>ようこそ、{userCache.name}。</p>
        <div className="vstack">
          {notes.map(n => <NoteView note={n} key={n.id}/>)}
        </div>
      </div>
    </>
  );
}
