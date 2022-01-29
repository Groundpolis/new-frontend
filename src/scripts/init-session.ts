import { storage } from './storage';

export function initSession() {
  storage.remove('host');
  storage.remove('token');
  storage.remove('usercache');
  window.location.reload();
}