/**
 * インポートが禁止される絵文字かどうかを取得します。
 */
export function isBlacklistedEmojiName(emojiName: string) {
  if (emojiName.endsWith('misskeyio')) return true;
  return false;
}