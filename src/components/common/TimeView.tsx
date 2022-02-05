import React, { HTMLAttributes, useEffect, useMemo, useState } from 'react';

export type TimeViewMode = 'absolute' | 'relative' | 'detail';

export type TimeViewProp = HTMLAttributes<HTMLTimeElement> & {
  mode?: TimeViewMode;
  time: string | Date;
};

const t = (format: string, time: number) => {
  return format.replace('%d', time.toString());
};

const ONE_MINUTE = 60;
const ONE_HOUR = 60 * ONE_MINUTE;
const ONE_DAY = 24 * ONE_HOUR;
const ONE_WEEK = 7 * ONE_DAY;
const ONE_MONTH = 30 * ONE_DAY;
const ONE_YEAR = 12 * ONE_MONTH;


export default function TimeView(p: TimeViewProp) {
  const [now, setNow] = useState(new Date());
  const [tickId, setTickId] = useState<number | null>(null);

  const time = typeof p.time === 'string' ? new Date(p.time) : p.time;

  const absolute = useMemo(() => time.toLocaleString(), [time]);

  const relative = useMemo(() => {
    const ago = (now.getTime() - time.getTime()) / 1000/*ms*/;
    return (
      ago >= ONE_YEAR ? (
        t('%d年前', (~~(ago / ONE_YEAR)))
      ) : ago >= ONE_MONTH ? (
        t('%dヶ月前', (~~(ago / ONE_MONTH)))
      ) : ago >= ONE_WEEK ? (
        t('%d週間前', (~~(ago / ONE_WEEK)))
      ) : ago >= ONE_DAY ? (
        t('%d日前', (~~(ago / ONE_DAY)))
      ) : ago >= ONE_HOUR ? (
        t('%d時間前', (~~(ago / ONE_HOUR)))
      ) : ago >= ONE_MINUTE ? (
        t('%d分前', (~~(ago / ONE_MINUTE)))
      ) : ago >= 10 ? (
        t('%d秒前', (~~(ago % 60)))
      ) : ago >= -1 ? (
        'たった今'
      ) : ago <  -1 ? (
        '未来' 
      ) : (
        '不明'
      ));
  }, [time, now]);

  const mode = p.mode ?? 'relative';

  const currentFormat = mode === 'relative' ? relative : mode === 'absolute' ? absolute : `${absolute} (${relative})`;

  const tick = () => {
    // TODO: パフォーマンス向上のため、このコンポーネントが画面内に表示されている場合のみ更新する
    setNow(new Date());
    setTickId(window.setTimeout(() => {
      window.requestAnimationFrame(tick);
    }, 5000));
  };

  useEffect(() => {
    if (mode === 'relative' || mode === 'detail') {
      setTickId(window.requestAnimationFrame(tick));
    }
    return () => {
      if (tickId) window.clearTimeout(tickId);
    };
  }, [mode]);

  return (
    <time {...p} title={absolute}>
      {currentFormat}
    </time>
  );
}
