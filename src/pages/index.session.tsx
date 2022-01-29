import React from 'react';
import { useAppSelector } from '../store';

export default function SessionPage() {
  const {userCache} = useAppSelector(state => state.session);
  return <h1>Hello, {userCache?.username}</h1>;
}
