export function initSession() {
  window.localStorage.removeItem('host');
  window.location.reload();
}