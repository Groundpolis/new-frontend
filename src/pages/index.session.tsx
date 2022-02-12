import React, { useEffect, useRef } from 'react';
import { FaAsterisk, FaBullhorn, FaChevronDown, FaComments, FaGlobe, FaHome, FaShareAlt } from 'react-icons/fa';
import styled from 'styled-components';
import { animationFadeUp } from '../animation';
import ActionBar from '../components/common/action-bar/ActionBar';
import ActionBarButton from '../components/common/action-bar/ActionBarButton';
import NoteView from '../components/common/note/NoteView';
import NoteEditor from '../components/common/NoteEditor';
import { Spinner } from '../components/common/Spinner';
import { Tab } from '../components/common/Tab';
import { TimelineSource } from '../models/timeline-source';
import { useAppDispatch, useAppSelector } from '../store';
import { setCurrentTimeline, setScrolling } from '../store/timeline';

const Alert = styled.div`
  position: sticky;
  top: 60px;
  z-index: 50;
  ${animationFadeUp};
`;

export default function SessionPage() {
  const {userCache, host, token} = useAppSelector(state => state.session);
  const {currentTimeline, notes, queue, isFetchingNotes, isScrolling} = useAppSelector(state => state.timeline);
  const dispatch = useAppDispatch();
  const triggerRef = useRef<HTMLDivElement>(null);

  if (!host || !token) throw new TypeError();
  if (!userCache) return null;

  const tabItems = [
    { key: 'home', element: <FaHome /> },
    { key: 'local', element: <FaComments /> },
    { key: 'social', element: <FaShareAlt /> },
    { key: 'global', element: <FaGlobe /> },
  ];

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [currentTimeline]);

  useEffect(() => {
    if (!triggerRef.current) return;
    const observer = new IntersectionObserver(([i]) => {
      console.log(i.isIntersecting);
      dispatch(setScrolling(!i.isIntersecting));
    }, {
      threshold: 1,
      rootMargin: '-128px',
    });
    observer.observe(triggerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <ActionBar>
        <Tab items={tabItems} selected={currentTimeline} onSelect={source => dispatch(setCurrentTimeline(source as TimelineSource))}/>
        <ActionBarButton className="item clickable mr-auto"><FaChevronDown /></ActionBarButton>
        <ActionBarButton className="item clickable"><FaBullhorn /></ActionBarButton>
      </ActionBar>
      { queue.length > 0 && (
        <Alert className="alert bg-info shadow-3">
          <FaAsterisk className="icon" /> {queue.length}件の新着ノートがあります
        </Alert>
      )}
      <div className="container" style={{position: 'relative'}}>
        <div className="mb-2">
          <NoteEditor />
        </div>
        <div ref={triggerRef} />
        <div className="vgroup outline">
          {notes.map(n => (
            <div className="card" key={n.id}>
              <div className="body">
                <NoteView note={n}/>
              </div>
            </div>
          ))}
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
