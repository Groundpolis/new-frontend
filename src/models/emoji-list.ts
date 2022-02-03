// eslint-disable-next-line @typescript-eslint/no-var-requires
export const emojiList = require('../assets/emojilist.json') as {
	name: string;
	keywords: string[];
	char: string;
	category: 'people' | 'animals_and_nature' | 'food_and_drink' | 'activity' | 'travel_and_places' | 'objects' | 'symbols' | 'flags';
}[];
