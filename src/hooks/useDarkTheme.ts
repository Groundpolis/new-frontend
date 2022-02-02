import { useEffect } from 'react';
import { useAppDispatch } from '../store';
import { setEnforceDark } from '../store/screen';

/**
 * ダークテーマを強制します。
 */
export function useDarkTheme() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setEnforceDark(true));
    return () => {
      dispatch(setEnforceDark(false));
    };
  }, []);
}