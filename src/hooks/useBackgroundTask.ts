import { Stream, Channels, Endpoints } from 'misskey-js';
import { Note } from 'misskey-js/built/entities';
import { useEffect, useState } from 'react';
import { batch } from 'react-redux';
import { TimelineSource } from '../models/timeline-source';
import { useAppDispatch, useAppSelector } from '../store';
import timeline, { appendNote, clearNotes, setFetchingNotes, setNotes } from '../store/timeline';
import { useMisskeyClient } from './useMisskeyClient';

type ChannelName = keyof Channels;

const getTimelineChannelName = (timeline: TimelineSource): ChannelName | null => {
  switch (timeline) {
  case 'home': return 'homeTimeline';
  case 'local': return 'localTimeline';
  case 'social': return 'hybridTimeline';
  case 'global': return 'globalTimeline';
  default: return null;
  }
};

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

/**
 * バックグラウンド タスク
 */
export function useBackgroundTask() {
  const {token, host} = useAppSelector(state => state.session);
  const {currentTimeline} = useAppSelector(state => state.timeline);
  const dispatch = useAppDispatch();

  const [stream, setStream] = useState<Stream | null>(null);

  const api = useMisskeyClient();

  // ストリーム接続
  useEffect(() => {
    if (!token || !host) return;
    console.log('Initializing stream...');
    const stream = new Stream('https://' + host, {token});
    const mainChannel = stream.useChannel('main');

    setStream(stream);

    // Dispose
    return () => {
      console.log('Disposing stream...');
      mainChannel.dispose();
      stream.close();
    };
  }, [token]);

  // タイムライン購読
  useEffect(() => {
    console.log('Initializing Timeline...');
    if (!stream) return;
    const channelName = getTimelineChannelName(currentTimeline);
    console.log('Channel name is ' + channelName);
    if (!channelName) return;
    const channel = stream.useChannel(channelName);
    channel.on('note', (note: Note) => {
      console.info('Note Received');
      console.info(note);
      dispatch(appendNote(note));
    });
    
    return () => {
      console.log('Disposing timeline...');
      channel.dispose();
    };
  }, [stream, currentTimeline]);

  useEffect(() => {
    batch(() => {
      dispatch(clearNotes());
      dispatch(setFetchingNotes(true));
    });
    api.request(getTimelineEndpoint(currentTimeline), { limit: 10 }, token).then((notes) => {
      batch(() => {
        dispatch(setNotes(notes));
        dispatch(setFetchingNotes(false));
      });
    });
  }, [api, currentTimeline]);

}