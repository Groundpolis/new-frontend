export const timelineSources = [
  'home',
  'local',
  'social',
  'global',
  'list',
  'antenna',
] as const;

export type TimelineSource = typeof timelineSources[number];
