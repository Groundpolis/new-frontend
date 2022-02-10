import React from 'react';
import styled from 'styled-components';
import ActionBar from '../components/common/action-bar/ActionBar';
import { Spinner } from '../components/common/Spinner';

const Frame = styled.iframe`
  width: 100%;
  height: 3000px;
  border: none;
`;

export default function FeedbackPage() {
  return (
    <>
      <ActionBar>
        <h1>フィードバック</h1>
      </ActionBar>
      <div className="container">
        <p>Groundpolis NEW をご体験いただきありがとうございます。</p>
        <p>フィードバックを提出していただけると、今後の開発の参考になりますので、よろしくおねがいします。</p>
      </div>
      <Frame className="fluid" src="https://docs.google.com/forms/d/e/1FAIpQLSd-CWaBMh-iXSJUe1jH6AIXoALrv1NOnUT45jly2tV83BdcMA/viewform?embedded=true">
        <Spinner size={128} />
      </Frame>
    </>
  );
}
