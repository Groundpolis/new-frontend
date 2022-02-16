import React, { useLayoutEffect } from 'react';
import { initSession } from '../../scripts/init-session';

export default function BlueScreen(p: {message: string, stack?: string}) {
  useLayoutEffect(() => {
    document.body.classList.add('bg-blue', 'text-white');
  }, []);

  const reload = () => {
    location.reload();
  };

  return (
    <div className="container">
      <h1><i className="fas fa-dizzy"/> サーバーへの接続に失敗しました</h1>
      <h2 className="text-125">エラーコード: {p.message}</h2>
      {p.stack && (
        <details className="mb-2">
          <summary>スタックトレース</summary>
          <div className="bg-red pa-1">
            {p.stack}
          </div>
        </details>
      )}
      <p>通常、これは次のような理由で発生します。</p>
      <ul>
        <li>サーバー内部エラー</li>
        <li>インターネットに接続されていない</li>
        <li>存在しないサーバーを指定した</li>
      </ul>
      <div className="hstack wrap">
        <button className="btn flat text-white" onClick={reload}>再読み込みする</button>
        <button className="btn danger" onClick={initSession}>サーバーURLを入れ直して再読み込みする</button>
      </div>
    </div>
  );
}
