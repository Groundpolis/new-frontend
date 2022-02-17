import React from 'react';
import { PropsWithMeta } from '../../models/PropsWithMeta';
import { useAppSelector } from '../../store';
import { GpfmView } from '../common/GpfmView';
import { InstanceData } from './styled/InstanceData';
import { InstanceWindow } from './styled/InstanceWindow';

export default function AboutServer({meta}: PropsWithMeta) {
  const {stats} = useAppSelector(state => state.session);
  return (
    <InstanceWindow style={{backgroundImage: meta.backgroundImageUrl ? `url(${meta.backgroundImageUrl})` : 'var(--bg)'}}>
      <InstanceData style={{flex: 3}}>
        {meta.description && <GpfmView text={meta.description ?? ''} />}
      </InstanceData>
      <InstanceData style={{flex: 1}}>
        <dl>
          {meta.maintainerName && (
            <>
              <dt><i className="fas fa-star fa-fw"/>&ensp;管理者</dt>
              <dd>
                {meta.maintainerEmail ? <a style={{color: 'inherit'}} href={`mailto:${meta.maintainerEmail}`}>{meta.maintainerName}</a> : meta.maintainerName}
              </dd>
            </>
          )}
          <dt><i className="fas fa-pencil-alt fa-fw"/>&ensp;ノート数</dt>
          <dd>
            {stats ? <><span className="text-200">{stats.originalNotesCount}</span> ノート</> : '取得中…'}
          </dd>
          <dt><i className="fas fa-user fa-fw" />&ensp;ユーザー数</dt>
          <dd>
            {stats ? <><span className="text-200">{stats.originalUsersCount}</span> 人</> : '取得中…'}
          </dd>
          <dt><i className="fas fa-project-diagram fa-fw" />&ensp;連合インスタンス数</dt>
          <dd>
            {stats ? <><span className="text-200">{stats.instances}</span></> : '取得中…'}
          </dd>
        </dl>
      </InstanceData>
    </InstanceWindow>
  );
}
