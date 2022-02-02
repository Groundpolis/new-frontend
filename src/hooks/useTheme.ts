import { useEffect, useState } from 'react';
import { ThemeType } from '../models/unions';
import { useAppSelector } from '../store';

export const useTheme = () => {
  const {themeMode} = useAppSelector(state => state.setting);
  const {enforceDark} = useAppSelector(state => state.screen);

  const [systemTheme, setSystemTheme] = useState<ThemeType>('light');

  useEffect(() => {
    const q = window.matchMedia('(prefers-color-scheme: dark)');
    const sync = (ev: MediaQueryListEvent) => setSystemTheme(ev.matches ? 'dark' : 'light');
    setSystemTheme(q.matches ? 'dark' : 'light');
    q.addListener(sync);
		
    return () => q.removeListener(sync);
  }, []);

  useEffect(() => {
    const mode = themeMode === 'system' ? systemTheme : themeMode;
    if (mode === 'dark' || enforceDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [enforceDark, systemTheme, themeMode]);

};
