import React from 'react';
import { HTMLAttributes } from 'react';

export type TabItem = {
	element: JSX.Element;
	key: string;
	isNew?: boolean;
};

export type TabProps = {
	items: TabItem[];
  className?: HTMLAttributes<Element>['className'];
	selected: string;
	onSelect: (key: string) => void;
};

// タブコンポーネント
export const Tab: React.VFC<TabProps> = (props) => {
  return (
    <div className={`tab ${props.className}`}>
      {props.items.map((item) => {
        return (
          <button
            key={item.key}
            className={'item ' + (item.key === props.selected ? 'active' : '')}
            onClick={() => props.onSelect(item.key)}
          >
            {item.element}
            {item.isNew && <sup className="text-primary text-bold" style={{marginLeft: 2}}>NEW!</sup>}
          </button>
        );
      })}
    </div>
  );
};
