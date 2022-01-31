import React, { ChangeEventHandler, useCallback } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import Dialog from '../components/common/dialogs/Dialog';
import { showModal } from '../components/common/modal/show-modal';
import { initSession } from '../scripts/init-session';
import { useAppDispatch, useAppSelector } from '../store';
import { set } from '../store/setting';

type InputEvent = ChangeEventHandler<HTMLInputElement>;

export default function SettingsPage() {
  const {
    themeMode,
  } = useAppSelector(state => state.setting);
  const dispatch = useAppDispatch();

  const onCheckThemeModeLight = useCallback<InputEvent>(() => { dispatch(set({ themeMode: 'light' })); }, []);
  const onCheckThemeModeDark = useCallback<InputEvent>(() => { dispatch(set({ themeMode: 'dark' })); }, []);
  const onCheckThemeModeSystem = useCallback<InputEvent>(() => { dispatch(set({ themeMode: 'system' })); }, []);
  const onClickLogout = () => {
    showModal(Dialog, {
      type: 'text',
      message: '本当にログアウトしてよろしいですか？',
      buttonType: 'yesNo',
      onClick(i) {
        if (i === 0) initSession(); 
      },
    });
  };
  return (
    <>
      <h1>設定</h1>
      <h2>アピアランス</h2>
      <div className="card">
        <div className="body">
          <h1>表示設定</h1>
          <h2 className="text-dimmed">テーマ</h2>
          <label className="input-check">
            <input type="radio" checked={themeMode === 'light'} onChange={onCheckThemeModeLight}/>
            <span>ライトテーマ</span>
          </label>
          <label className="input-check">
            <input type="radio" checked={themeMode === 'dark'} onChange={onCheckThemeModeDark}/>
            <span>ダークテーマ</span>
          </label>
          <label className="input-check">
            <input type="radio" checked={themeMode === 'system'} onChange={onCheckThemeModeSystem}/>
            <span>システム設定に準ずる</span>
          </label>
        </div>
      </div>
      <h2>危険な設定</h2>
      <div className="list-form">
        <button className="item text-danger" onClick={onClickLogout}>
          <FaSignOutAlt className="icon"/>
          <div className="body">
            <h1>ログアウト</h1>
            <p className="desc">ログアウトしても、アカウントは削除されません。</p>
          </div>
        </button>
      </div>
    </>
  );
}
