import { Channels, Stream } from 'misskey-js';
import { Note } from 'misskey-js/built/entities';
import { useEffect, useState } from 'react';
import { batch } from 'react-redux';
import { TimelineSource } from '../models/timeline-source';
import { useAppDispatch, useAppSelector } from '../store';
import { appendNote, clearNotes, setFetchingNotes, setNotes, updateNote } from '../store/timeline';
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

const getTimelineEndpoint = (timeline: TimelineSource) => {
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
  const {token, host, userCache} = useAppSelector(state => state.session);
  const {currentTimeline} = useAppSelector(state => state.timeline);
  const dispatch = useAppDispatch();

  const [stream, setStream] = useState<Stream | null>(null);

  const api = useMisskeyClient();

  // ストリーム接続
  useEffect(() => {
    if (!token || !host) return;
    const stream = new Stream('https://' + host, {token});
    const mainChannel = stream.useChannel('main');

    setStream(stream);

    stream.on('noteUpdated', (e) => {
      dispatch(updateNote({...e, currentUserId: userCache?.id}));
    });

    // Dispose
    return () => {
      mainChannel.dispose();
      stream.close();
    };
  }, [token]);

  // タイムライン購読
  useEffect(() => {
    if (!stream) return;
    const channelName = getTimelineChannelName(currentTimeline);
    if (!channelName) return;
    const channel = stream.useChannel(channelName);
    channel.on('note', (note: Note) => {
      dispatch(appendNote(note));
    });
    
    return () => {
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
  }, [api, currentTimeline, stream]);

  return stream;
}