import React from 'react';
import { useAppSelector } from '../store';
import SessionPage from './index.session';
import WelcomePage from './index.welcome';

export default function IndexPage() {
  const {token} = useAppSelector(state => state.session);
  return token ? <SessionPage /> : <WelcomePage />;
}
