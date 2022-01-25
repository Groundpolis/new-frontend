import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import Particles from 'react-tsparticles';
import { ISourceOptions } from 'tsparticles';
import { FaSlidersH, FaRegSmileWink, FaPaintBrush, FaProjectDiagram, FaIcons } from 'react-icons/fa';

import Skyline from '../components/Skyline';
import { useDarkTheme } from '../hooks/useDarkTheme';
import groundpolisLogo from '../assets/icon_transparent.svg';

import './WelcomePage.scss';


const sky: ISourceOptions = {
  particles: {
    move: {
      speed: 2,
    },
    shape: {
      type: 'square'
    },
  },
  retina_detect: true,
};

export default function WelcomePage() {
  useDarkTheme();

  const [width, setWidth] = useState(document.body.clientWidth);
  const [isInvisible, setInvisible] = useState(false);

  const descriptionRef = useRef<HTMLDivElement>(null);

  const repeat = useMemo(() => Math.ceil(width / 504) + 1, [width]);

  useEffect(() => {
    const onResize = () => {
      setWidth(document.body.clientWidth);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  
  useEffect(() => {
    setInvisible(true);
  }, [repeat]);

  useEffect(() => {
    if (isInvisible) {
      setInvisible(false);
    }
  }, [isInvisible]);

  return (
    <>
      <div className="gp-sky flex f-bottom">
        <Particles className="stars bg-skyblue-d" options={sky} params={{preset: 'stars', autoPlay: true,}} />
        {!isInvisible && new Array(repeat).fill(<Skyline/>)}
        <div className="gp-hero">
          <div className="main">
            <h1 className="shadow-1-t">
              <img src={groundpolisLogo} alt="" className="icon" />
              Groundpolis
            </h1>
            <div className="pl-3">
              <h2 className="text-primary shadow-1-t">
                <span className="text-200">進化</span>し続ける、<br/>
                <span className="text-200">洗練</span>された、<br/>
              ミニブログ プラットフォーム。
              </h2>
              <p className="shadow-1-t">ノートを作成して、みんなと共有しよう。</p>
              <p className="shadow-1-t">趣味の合う人を検索して、つながろう。</p>
              <div className="card acrylic shadow-1 mt-4" style={{width: 'fit-content'}}>
                <div className="body pa-4">
                  <div className="alert bg-warn lift down mb-2">
                    <div className="text-bold mb-1">本インスタンスは登録を受け付けていません。</div>
                    <div className="ml-1">お一人様です。</div>
                  </div>
                  <div className="hstack">
                    <button className="btn lift primary text-bold">インスタンスを探す</button>
                    <button className="btn lift text-bold" onClick={() => descriptionRef.current?.scrollIntoView({behavior: 'smooth'})}>
                      もっと詳しく
                    </button>
                  </div>
                  {/* <p className="mt-2">アカウントをお持ちなら、<a href="#">ログイン</a></p> */}
                </div>
              </div>
            </div>
          </div>
          <div className="timeline ge-tablet">
            <h1>まだ途中。</h1>
            <p>ここにタイムラインが表示されるはずだ</p>
            <p>ここにタイムラインが表示されるはずだ</p>
            <p>ここにタイムラインが表示されるはずだ</p>
            <p>ここにタイムラインが表示されるはずだ</p>
            <p>ここにタイムラインが表示されるはずだ</p>
            <p>ここにタイムラインが表示されるはずだ</p>
            <p>ここにタイムラインが表示されるはずだ</p>
            <p>ここにタイムラインが表示されるはずだ</p>
            <p>ここにタイムラインが表示されるはずだ</p>
            <p>ここにタイムラインが表示されるはずだ</p>
            <p>ここにタイムラインが表示されるはずだ</p>
            <p>ここにタイムラインが表示されるはずだ</p>
            <p>ここにタイムラインが表示されるはずだ</p>
          </div>
        </div>
      </div>
      <div className="gp-container" ref={descriptionRef}>
        <div className="gp-article pt-4">
          <div className="row">
            <div className="col-4 col-12-sm vstack f-middle text-center">
              <FaSlidersH fontSize="3rem" color="var(--primary)" />
              <h2>カスタマイズ</h2>
              <p>柔軟なカスタマイズ機能により、あなた好みに仕立てましょう。</p>
            </div>
            <div className="col-4 col-12-sm vstack f-middle text-center">
              <FaIcons fontSize="3rem" color="var(--primary)" />
              <h2>多機能</h2>
              <p>お絵かきツール、ページ作成ツール、ミニゲームなど、様々な機能を搭載。</p>
            </div>
            <div className="col-4 col-12-sm vstack f-middle text-center">
              <FaIcons fontSize="3rem" color="var(--primary)" />
              <h2>分散</h2>
              <p>業界標準分散SNSプロトコル「ActivityPub」対応。Mastodon, Misskey等の他サーバーにいるユーザーとも、アカウントを変えずにやり取りできます。</p>
            </div>
          </div>
        </div>
        <div className="gp-article">
          <h1>テスト</h1>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequuntur assumenda quod ex magni, repellat possimus sed deserunt cumque perferendis voluptatum rerum animi, recusandae error omnis rem incidunt beatae, autem maxime harum distinctio! Ullam deserunt ad voluptatibus obcaecati eveniet illum consectetur unde enim amet dolores quo dolorem reprehenderit exercitationem, illo sit accusamus repudiandae earum! Esse hic, inventore sit repudiandae voluptates veniam reiciendis quam! Natus reprehenderit deleniti aliquid nam dolorem atque non mollitia, eum est a aut unde fugit accusantium explicabo ipsa molestiae animi aliquam repellat magni voluptatibus tempore similique eligendi nulla! Reiciendis animi, exercitationem quam illo cupiditate totam cum atque aliquam!</p>
        </div>
      </div>
    </>
  );
}
