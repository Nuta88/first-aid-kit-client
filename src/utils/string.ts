export const replaceUnderscoreToSpace = (str: string = ''): string => {
  return str.replaceAll('_', ' ');
};

export const replaceSpaceToUnderscore = (str: string): string => {
  return str.replaceAll(' ', '_');
};
