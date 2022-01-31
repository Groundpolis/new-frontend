import { useEffect } from 'react';
import { useAppDispatch } from '../store';
import { setLayoutType } from '../store/screen';
import { LayoutType } from '../models/unions';

export function useFixedLayout(type: LayoutType) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setLayoutType(type));

    // TODO Deck実装時ここをいい感じ™にする
    return () => {
      dispatch(setLayoutType('basic'));
    };
  }, []);
}