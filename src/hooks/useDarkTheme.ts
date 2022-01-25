import { useLayoutEffect } from 'react';

/**
 * ダークテーマを強制します。
 */
export function useDarkTheme() {
  // TODO: 元々ダークテーマのときに消えないようにする
  useLayoutEffect(() => {
    document.body.classList.add('dark');
    return () => {
      document.body.classList.remove('dark');
    };
  }, []);
}