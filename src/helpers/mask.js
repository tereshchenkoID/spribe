export const mask = (word) => {
  if (word.length <= 2) return word;
  return word[0] + '*'.repeat(3) + word[word.length - 1];
};