import { parse, toString } from 'misskey-js/built/acct';
import { UserDetailed } from 'misskey-js/built/entities';
import React, { useEffect, useState } from 'react';
import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import ActionBar from '../components/common/action-bar/ActionBar';
import Avatar from '../components/common/Avatar';
import { GpfmView } from '../components/common/GpfmView';
import { Spinner } from '../components/common/Spinner';
import { Tab } from '../components/common/Tab';
import TimeView from '../components/common/TimeView';
import { useMisskeyClient } from '../hooks/useMisskeyClient';
import { User } from '../models/user';
import { getName } from '../scripts/get-name';
import UserFollowersSubPage from './user.followers';
import UserFollowingSubPage from './user.following';
import UserTimelineSubPage from './user.timeline';

const Header = styled.div<{headerUrl?: string | null}>`
  display: flex;
  align-items: flex-end;
  position: relative;
  background: ${p => p.headerUrl ? `url(${p.headerUrl})` : 'var(--indigo-7)'};
  background-repeat: no-repeat;
  background-size: cover;
  height: 256px;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: rgba(0, 0, 0, 0.2);
    box-shadow: 0 0 128px rgba(0, 0, 0, 0.7) inset;
    z-index: 1;
  }

  > * {
    z-index: 5;
  }

  > .gp-name {
    margin-left: 160px;
    margin-bottom: 16px;
  }

  .shadow-t {
    text-shadow: 0 2px 3px rgba(0, 0, 0, 0.7);
  }

  .gp-acct {
    opacity: 0.8;
  }
`;

const Description = styled.div`
  padding: 24px;
  padding-left: 160px;
`;

const _Avatar = styled(Avatar)`
  position: absolute;
  left: var(--margin);
  bottom: -40px;
  box-shadow: 0 2px 4px var(--shadow-color);
  z-index: 5;
`;

const DataGrid = styled.dl`
  display: grid;
  grid-template-columns: 160px 70%;
  padding: 16px 96px;
  margin: 0;
  > dt {
    font-weight: bold;
  }
  > dt,
  > dd {
    padding: 4px 0;
    margin: 0;
  }
`;

const _Tab = styled(Tab)`
  > * {
    flex: 1;
    padding: 16px 0 !important;
  }
`;

const getGender = (gender: string): [gender: string, genderIcon: string] | null => {
  switch (gender) {
  case 'male': return ['男性', 'mars'];
  case 'female': return ['女性', 'venus'];
  case 'not-applicable': return ['その他', 'genderless'];
  default: return null;
  }
};

export default function UserPage(p: {mode: 'notes' | 'following' | 'followers'}) {
  const {acct: acctString} = useParams();
  const api = useMisskeyClient();
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);

  if (!acctString) throw new TypeError();
  const {username, host} = parse(acctString);

  useEffect(() => {
    if (!api) return;
    setUser(null);
    api.request('users/show', {
      username,
      host: host ?? undefined,
    }).then(setUser);
  }, [api, username, host]);

  const detailed = user as UserDetailed;
  // TODO: Misskey.jsのGroundpolisフォーク版を作ったらこの辺まともにする
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const detailedAny = user as Record<string, any>;

  const gender = getGender(detailedAny?.sex);
  
  const onSelectTab = (mode: string) => {
    if (!user) return;
    switch (mode) {
    case 'notes': navigate(`/@${toString(user)}`); break;
    case 'following': navigate(`/@${toString(user)}/following`); break;
    case 'followers': navigate(`/@${toString(user)}/followers`); break;
    }
  };

  const SubContent = useMemo(() => {
    if (!user) return null;
    switch (p.mode) {
    case 'notes': return UserTimelineSubPage;
    case 'following': return UserFollowingSubPage;
    case 'followers': return UserFollowersSubPage;
    }

  }, [user, p.mode]);

  return user ? (
    <>
      <div className="container vstack">
        <div className="card">
          <Header headerUrl={(user as UserDetailed).bannerUrl}>
            <div className="gp-name">
              <h1 className="text-bold text-white text-200 shadow-t mb-0">
                <GpfmView plain text={getName(user)} emojis={user.emojis} />
              </h1>
              <div className="hstack slim">
                <span className="gp-acct text-white text-bold shadow-t">@{toString(user)}</span>
              </div>
            </div>
            <_Avatar size={120} user={detailed} />
            <div className="abs-top-left-2 rounded pa-1 bg-black text-white text-75">
              フォローされています
            </div>
            <div className="circle bg-black-50 abs-top-right-2 hstack dense pa-1" style={{backdropFilter: 'blur(8px)'}}>
              <button className="btn flat circle text-white">
                <i className="fas fa-ellipsis-h" />
              </button>
              <button className="btn circle outline primary">
                フォローする
              </button>
            </div>
          </Header>
          <div className="vgroup outline">
            <Description className="gp-description">
              {detailed.description ? (
                <GpfmView text={detailed.description} emojis={user.emojis} />
              ) : (
                <span className="text-dimmed">自己紹介はありません</span>
              )}
            </Description>
            <DataGrid>
              {gender ? (
                <>
                  <dt><i className={`fas fa-${gender[1]} fa-fw`}></i> 性別</dt>
                  <dd>{gender[0]}</dd>
                </>
              ) : null}
              {detailed.location ? (
                <>
                  <dt><i className="fas fa-location-dot fa-fw"></i> 場所</dt>
                  <dd>{detailed.location}</dd>
                </>
              ) : null}
              {detailed.birthday ? (
                <>
                  <dt><i className="fas fa-cake-candles fa-fw"></i> 誕生日</dt>
                  <dd>{detailed.birthday}</dd>
                </>
              ) : null}
              <dt><i className="fas fa-calendar-days fa-fw"></i> 登録日</dt>
              <dd><TimeView mode="detail" time={detailed.createdAt} /></dd>
            </DataGrid>
            <DataGrid>
              {detailed.fields.map((f, i) => (
                <>
                  <dt key={`${f.name}-${i}`}><GpfmView text={f.name} emojis={user.emojis} plain/></dt>
                  <dd key={`${f.name}-${i}`}><GpfmView text={f.value} emojis={user.emojis} /></dd>
                </>
              ))}
            </DataGrid>
            <_Tab selected={p.mode} onSelect={onSelectTab} items={[
              { key: 'notes', element: <div className="text-center">{detailed.notesCount}<br/><span className="text-75">ノート</span></div> },
              { key: 'following', element: <div className="text-center">{detailed.followingCount}<br/><span className="text-75">フォロー</span></div> },
              { key: 'followers', element: <div className="text-center">{detailed.followersCount}<br/><span className="text-75">フォロワー</span></div> },
            ]}/>
          </div>
        </div>
        {SubContent && <SubContent user={user} />}
      </div>
    </>
  ) : (
    <div className="container flex f-center">
      <Spinner size={160}/>;
    </div>
  );
}
