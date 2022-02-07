import React, { PropsWithChildren } from 'react';
import { IconType } from 'react-icons';
import { FaIcons, FaProjectDiagram, FaSlidersH } from 'react-icons/fa';
import featuresImageReaction from '../../assets/features/reaction.png';
import { PropsWithMeta } from '../../models/PropsWithMeta';
import FeatureCard from './FeatureCard';
import { Article } from './styled/Article';
import { Features } from './styled/Features';


function DescriptionCard(p: PropsWithChildren<{title: string, icon: IconType}>) {
  return (
    <div className="col-4 col-12-sm vstack f-middle text-center">
      <p.icon fontSize="3rem" color="var(--primary)" />
      <h2>{p.title}</h2>
      {p.children}
    </div>
  );
}

export default function AboutGroundpolis({meta}: PropsWithMeta) {
  return (
    <>
      <Article className="pa-4">
        <div className="row">
          <DescriptionCard title="カスタマイズ" icon={FaSlidersH}>
            <p>柔軟なカスタマイズ機能により、あなた好みに仕立てましょう。</p>
          </DescriptionCard>
          <DescriptionCard title="多機能" icon={FaIcons}>
            <p>お絵かきツール、ページ作成ツール、ミニゲームなど、様々な機能を搭載。</p>
          </DescriptionCard>
          <DescriptionCard title="分散" icon={FaProjectDiagram}>
            <p>業界標準分散SNSプロトコル「ActivityPub」対応。</p>
          </DescriptionCard>
        </div>
      </Article>
      <Article className="pa-4">
        <h1 className="my-0">機能</h1>
        <h2 className="text-dimmed">Groundpolis には多くの機能があります。</h2>
        <Features>
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
        </Features>
      </Article>
    </>
  );
}
