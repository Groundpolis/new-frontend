import React from 'react';
import { UnicodeEmojiView } from '../components/common/EmojiView';
import { GpfmView } from '../components/common/GpfmView';

export default function NotImplPage() {
  return (
    <div className="container">
      <div className="card">
        <div className="body">
          <h1 className="text-center pb-1"><UnicodeEmojiView emoji="🚧"/> 工事中 <UnicodeEmojiView emoji="🚧"/></h1>
          <p>申し訳ありませんが、このページはまだ工事中です。代わりに海老の行列をお見せします。</p>
          <GpfmView text="<marquee>🦐 <small>🦐 🦐 🦐 🦐 🦐 🦐</small></marquee>" />
        </div>
      </div>
    </div>
  );
}
