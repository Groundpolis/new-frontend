import { useContext } from 'react';
import { StreamingContext } from '../App';

export function useStreaming() {
  return useContext(StreamingContext);
}