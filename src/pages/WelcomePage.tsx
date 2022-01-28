import React, { useEffect, useMemo, useRef, useState } from 'react';
import Particles from 'react-tsparticles';
import { ISourceOptions } from 'tsparticles';
import { FaSlidersH, FaIcons, FaExclamationTriangle, FaExternalLinkAlt, FaHeart, FaPencilAlt, FaUser } from 'react-icons/fa';

import Skyline from '../components/Skyline';
import { useDarkTheme } from '../hooks/useDarkTheme';
import { useAppDispatch, useAppSelector } from '../store';
import groundpolisLogo from '../assets/icon_transparent.svg';
import featuresImageReaction from '../assets/features/reaction.png';

import './WelcomePage.scss';
import FeatureCard from '../components/FeatureCard';


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

  const { meta, host, stats } = useAppSelector(state => state.session);
  const dispatch = useAppDispatch();

  if (meta === null || stats === null) throw new TypeError();

  const [width, setWidth] = useState(document.body.clientWidth);
  const [isInvisible, setInvisible] = useState(false);

  const descriptionRef = useRef<HTMLDivElement>(null);

  const repeat = useMemo(() => Math.ceil(width / 504) + 1, [width]);

  const instanceName = meta.name || 'Groundpolis';

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

  console.log(meta.name);

  return (
    <>
      <div className="gp-sky flex f-bottom">
        <Particles className="stars bg-skyblue-d" options={sky} params={{preset: 'stars', autoPlay: true,}} />
        {!isInvisible && new Array(repeat).fill(<Skyline/>)}
        <div className="gp-hero">
          <div className="main">
            <h1 className="shadow-1-t">
              {meta.logoImageUrl ? (
                <img src={meta.logoImageUrl} alt={meta.name ?? ''} className="logo" />
              ) : (
                <>
                  <img src={meta.iconUrl ?? groundpolisLogo} alt="" className="icon" />
                  {instanceName}
                </>
              )}
            </h1>
            <div className="desc">
              <h2 className="text-primary shadow-1-t">
                <span className="text-200">進化</span>し続ける、<span className="text-200">洗練</span>された、<br/>
              ミニブログ プラットフォーム。
              </h2>
              <p className="shadow-1-t">
                ノートを作成して、みんなと共有しよう。<br/>
                趣味の合う人を検索して、つながろう。
              </p>
              <div className="card acrylic shadow-1 mt-4 registration">
                <div className="body pa-2">
                  {meta.disableRegistration && meta.disableInvitation && (
                    <div className="alert bg-warn lift down mb-2">
                      <div className="text-bold mb-1">
                        <FaExclamationTriangle className="icon"/>
                        現在、登録はできません。
                      </div>
                      <div className="ml-1">{meta.disableInvitationReason}</div>
                    </div>
                  )}
                  <div className="hstack">
                    {meta.disableInvitation ? (
                      <a href="https://join.misskey.page/instances" className="btn shadow-1 text-bold primary" target="_blank" rel="noreferrer noopener">
                        サーバーを探す <FaExternalLinkAlt className="ml-1"/>
                      </a>
                    ) : (
                      <button className="btn shadow-1 text-bold primary">
                        新規登録
                      </button>
                    )}
                    <button className="btn shadow-1 text-bold" onClick={() => descriptionRef.current?.scrollIntoView({behavior: 'smooth'})}>
                      詳しく
                    </button>
                  </div>
                  <p className="mt-2">アカウントをお持ちなら、<a href="#">ログイン</a></p>
                </div>
              </div>
              <p className="text-75 text-dimmed mt-2 ml-1">
                Groundpolis {meta.version}<br />
                Made with <FaHeart className="text-red" onClick={() => {
                  window.localStorage.removeItem('host');
                  window.location.reload();
                }}/> by Groundpolis HQ
              </p>
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
        <div className="gp-instance-window" style={{background: meta.backgroundImageUrl ? `url(${meta.backgroundImageUrl})` : 'var(--bg)'}}>
          <div className="row">
            <div className="col-8 col-12-sm gp-data">
              {meta.description && <div dangerouslySetInnerHTML={{__html: meta.description}} />}
            </div>
            <div className="col-4 col-12-sm gp-data">
              <dl>
                <dt><FaPencilAlt/>&ensp;ノート数</dt>
                <dd>{stats.originalNotesCount} ノート</dd>
                <dt><FaUser />&ensp;ユーザー数</dt>
                <dd>{stats.originalUsersCount} 人</dd>
                <dt><FaUser />&ensp;連合インスタンス数</dt>
                <dd>{stats.instances}</dd>
              </dl>
            </div>
          </div>
        </div>
        <div className="bg-primary mx-auto" style={{width: '80%', height: 1, marginTop: '5rem', marginBottom: '5rem'}} />
        <div className="gp-article pa-4">
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
        <div className="gp-article pa-4">
          <h1 className="my-0">機能</h1>
          <h2 className="text-dimmed">Groundpolis には多くの機能があります。</h2>
          <div className="gp-features">
            <div className="column">
              <FeatureCard title="投稿、フォロー、会話" src="http://placehold.jp/320x180.png">
                <p>好きなことをたくさんつぶやこう。</p>
                <p>好きなユーザーをフォローして、つながろう。</p>
              </FeatureCard>
              <FeatureCard title="リアクション" src={featuresImageReaction}>
                <p>いいねだけじゃ伝わらない気持ちに。多種多様な絵文字を使った「リアクション」で、細かなニュアンスを伝えましょう。</p>
              </FeatureCard>
              <FeatureCard title="テーマ" src="http://placehold.jp/320x180.png">
                <p>あなたの気分に応じて、好きなテーマを選んでGroundpolisを楽しみましょう。テーマは自作できますし、テーマストアで多くのテーマが公開されています。</p>
              </FeatureCard>
            </div>
            <div className="column">
              <FeatureCard title="ファイル" src="http://placehold.jp/320x180.png">
                <p>
                  添付ファイルは全て、ユーザーに割り振られた一定（本サーバーでは{meta.driveCapacityPerLocalUserMb / 1024}GB）の領域に保存されます。
                  そのため、アップロードし直すことなくファイルを再度共有することもできます。
                </p>
                <p>ファイルは全て名前を付けたり、フォルダ分けしたりと柔軟に管理できます。</p>
              </FeatureCard>
              <FeatureCard title="ペイント" src="http://placehold.jp/320x180.png">
                <p>筆圧検知にも対応した本格的なペイントツールを搭載。描いた絵はそのまま投稿できます。</p>
              </FeatureCard>
              <FeatureCard title="文字装飾" src="http://placehold.jp/320x180.png">
                <p>高機能な文字装飾フォーマット「GPFM」を覚えれば、装飾を取り入れたノートもお手の物。入力支援ツールも完備しています。</p>
              </FeatureCard>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
