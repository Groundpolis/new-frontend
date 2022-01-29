import React from 'react';
import { FaPencilAlt, FaProjectDiagram, FaUser } from 'react-icons/fa';
import { PropsWithMeta } from '../../models/PropsWithMeta';
import { useAppSelector } from '../../store';
import { InstanceData } from './styled/InstanceData';
import { InstanceWindow } from './styled/InstanceWindow';

export default function AboutServer({meta}: PropsWithMeta) {
  const {stats} = useAppSelector(state => state.session);
  return (
    <InstanceWindow style={{background: meta.backgroundImageUrl ? `url(${meta.backgroundImageUrl})` : 'var(--bg)'}}>
      <InstanceData style={{flex: 3}}>
        {meta.description && <div dangerouslySetInnerHTML={{__html: meta.description}} />}
      </InstanceData>
      <InstanceData style={{flex: 1}}>
        <dl>
          <dt><FaPencilAlt/>&ensp;ノート数</dt>
          <dd>
            {stats ? <><span className="text-200">{stats.originalNotesCount}</span> ノート</> : '取得中…'}
          </dd>
          <dt><FaUser />&ensp;ユーザー数</dt>
          <dd>
            {stats ? <><span className="text-200">{stats.originalUsersCount}</span> 人</> : '取得中…'}
          </dd>
          <dt><FaProjectDiagram />&ensp;連合インスタンス数</dt>
          <dd>
            {stats ? <><span className="text-200">{stats.instances}</span></> : '取得中…'}
          </dd>
        </dl>
      </InstanceData>
    </InstanceWindow>
  );
}