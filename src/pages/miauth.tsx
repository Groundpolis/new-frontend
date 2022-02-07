import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { Spinner } from '../components/common/Spinner';
import { MiAuthResponse } from '../models/miauth-response';
import { useAppSelector } from '../store';
import { setToken, setUserCache } from '../store/session';


const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

export default function MiAuthPage() {
  const [searchParam] = useSearchParams({});
  const {host} = useAppSelector(state => state.session);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [message, setMessage] = useState('Please wait...');

  useEffect(() => {
    setMessage('Please wait...');
    const session = searchParam.get('session');
    if (!session) {
      setMessage('Invalid session ID');
      return;
    }
    if (!host) {
      setMessage('Invalid Host');
      return;
    }
    fetch(`https://${host}/api/miauth/${session}/check`, {
      method: 'POST',
    }).then(data => data.json()).then(data => {
      const {token, user} = data as MiAuthResponse;
      dispatch(setToken(token));
      dispatch(setUserCache(user));
      navigate('/');
    });

  }, [searchParam, host, dispatch, navigate]);
  return (
    <LoadingWrapper>
      <div className="vstack f-middle">
        <Spinner size={128}/>
        <p>{message}</p>
      </div>
    </LoadingWrapper>
  );
}
