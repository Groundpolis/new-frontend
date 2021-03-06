import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Language, ThemeType } from '../models/unions';

interface SettingState {
	/** テーマモード */
  themeMode: ThemeType;
	/** 文字装飾のアニメーションを減らすかどうか */
	reduceTextAnimation: boolean,
	/** UIのアニメーションを減らすかどうか */
	reduceUIAnimation: boolean,
	/** 絵文字のアニメーションを減らすかどうか */
	reduceEmojiAnimation: boolean,
	/** OS標準の絵文字を使うかどうか */
	useOsNativeEmojis: boolean,
	/** 言語設定 */
	language: Language,
}

const initialState: SettingState = {
  themeMode: 'system',
  reduceTextAnimation: false,
  reduceUIAnimation: false,
  reduceEmojiAnimation: false,
  useOsNativeEmojis: false,
  language: 'ja',
};

export const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    set(state, {payload}: PayloadAction<Partial<SettingState>>) {
      state = Object.assign(state, payload);
    }
  },
});

export const { set } = settingSlice.actions;

export default settingSlice.reducer;
