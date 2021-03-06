import { MfmNode, parse, parsePlain } from 'mfm-js';
import React, { CSSProperties, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { CustomEmojiLite } from '../../models/custom-emoji-lite';
import { WithStyle } from '../../models/with-style';
import EmojiView from './EmojiView';


export type MfmProps = WithStyle<{
  plain?: boolean;
  text: string;
  emojis?: CustomEmojiLite[];
}>;

const Tree: React.VFC<{tree: MfmNode, plain?: boolean, emojis?: CustomEmojiLite[]}> = ({tree, plain, emojis}) => {
  switch (tree.type) {
  case 'text': {
    const text = tree.props.text.replace(/(\r\n|\n|\r)/g, '\n');

    if (!plain) {
      const res = [];
      for (const t of text.split('\n')) {
        res.push(<br />);
        res.push(<>{t}</>);
      }
      res.shift();
      return <>{res}</>;
    } else {
      return <>{text.replace(/\n/g, ' ')}</>;
    }
  }

  case 'bold': {
    return <b>{<Forest forest={tree.children} emojis={emojis}/>}</b>;
  }

  case 'strike': {
    return <del>{<Forest forest={tree.children} emojis={emojis}/>}</del>;
  }

  case 'italic': {
    return <i>{<Forest forest={tree.children} emojis={emojis}/>}</i>;
  }

  case 'fn': {
    // TODO: CSSを文字列で組み立てていくと token.props.args.~~~ 経由でCSSインジェクションできるのでよしなにやる
    let style: CSSProperties | null = null;
    switch (tree.props.name) {
    case 'flip': {
      const transform =
                        (tree.props.args.h && tree.props.args.v) ? 'scale(-1, -1)' :
                          tree.props.args.v ? 'scaleY(-1)' :
                            'scaleX(-1)';
      style = {transform};
      break;
    }
    case 'x2': {
      style = { fontSize: '200%' };
      break;
    }
    case 'x3': {
      style = { fontSize: '400%' };
      break;
    }
    case 'x4': {
      style = { fontSize: '600%' };
      break;
    }
    case 'font': {
      const family =
        tree.props.args.serif ? 'serif' :
          tree.props.args.monospace ? 'monospace' :
            tree.props.args.cursive ? 'cursive' :
              tree.props.args.fantasy ? 'fantasy' :
                tree.props.args.emoji ? 'emoji' :
                  tree.props.args.math ? 'math' :
                    null;
      if (family) style = { fontFamily: family };
      break;
    }
    }
    if (style == null) {
      return <Forest forest={tree.children} emojis={emojis} />;
    } else {
      return <span style={{display: 'inline-block', ...style}}>{<Forest forest={tree.children} emojis={emojis}/>}</span>;
    }
  }

  case 'small': {
    return <small style={{opacity: 0.7}}>{<Forest forest={tree.children} emojis={emojis}/>}</small>;
  }

  case 'center': {
    return <div style={{textAlign: 'center'}}>{<Forest forest={tree.children} emojis={emojis}/>}</div>;
  }

  case 'url': {
    return <a href={tree.props.url} target="_blank" rel="noopener noreferrer">{tree.props.url}</a>;
  }

  case 'link': {
    return (
      <a href={tree.props.url} target="_blank" rel="noopener noreferrer">
        {<Forest forest={tree.children} emojis={emojis}/>}
      </a>
    );
  }

  case 'mention': {
    return (
      <Link to={`/${tree.props.acct}`}>
        {tree.props.acct}
      </Link>
    );
  }

  case 'hashtag': {
    return (
      <Link to={`/tags/${encodeURIComponent(tree.props.hashtag)}`}>
        #{tree.props.hashtag}
      </Link>
    );
  }

  case 'blockCode': {
    return (
      <pre>
        <code>
          {tree.props.code}
        </code>
      </pre>
    );
  }

  case 'inlineCode': {
    return <code>{tree.props.code}</code>;
  }

  case 'quote': {
    return <blockquote className="mfm-quote">{<Forest forest={tree.children} emojis={emojis}/>}</blockquote>;
  }

  case 'emojiCode': {
    return <EmojiView emoji={`:${tree.props.name}:`} customEmojis={emojis} normal={plain} />;
  }

  case 'unicodeEmoji': {
    return <EmojiView emoji={tree.props.emoji} customEmojis={emojis} normal={plain} />;
  }

  case 'mathInline': {
    return <span>{tree.props.formula}</span>;
  }

  case 'mathBlock': {
    return <div>{tree.props.formula}</div>;
  }

  case 'search': {
    return (
      <div className="hgroup">
        <input
          type="text"
          className="input-field"
          style={{background: 'var(--panel)'}}
          value={tree.props.query}
        />
        <a href={`https://google.com/search?q=${encodeURIComponent(tree.props.query)}`} target="_blank" rel="noopener noreferrer" className="btn primary" style={{width: 80}}>
          検索
        </a>
      </div>
    );
  }

  case 'marquee': {
    return React.createElement('marquee', null, <Forest forest={tree.children} emojis={emojis}/>);
  }

  default:
    return <div className="text-red">unknown type {tree.type}</div>;
  }
};

const Forest: React.VFC<{forest?: MfmNode[], plain?: boolean, emojis?: CustomEmojiLite[]}> = ({forest, plain, emojis}) => {
  return !forest ? null : <>{forest.map((n, i) => <Tree key={i} tree={n}  plain={plain} emojis={emojis} />)}</>;
};

export const GpfmView: React.VFC<MfmProps> = (p) => {
  const forest = useMemo(() => p.plain ? parsePlain(p.text) : parse(p.text), [p.text, p.plain]);

  const inner = <Forest forest={forest} plain={p.plain} emojis={p.emojis} />;

  return p.plain ? (
    <span className={p.className} style={p.style}>{inner}</span>
  ) : (
    <div className={p.className} style={p.style}>{inner}</div>
  );
};