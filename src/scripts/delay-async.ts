export function delayAsync(duration: number) {
  return new Promise<void>(res => setTimeout(res, duration));
}