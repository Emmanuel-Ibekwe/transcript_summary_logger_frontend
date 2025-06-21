export const capitalizeTitle = (text) => {
  const smallWords = [
    "a",
    "an",
    "the",
    "and",
    "but",
    "or",
    "for",
    "nor",
    "on",
    "at",
    "to",
    "from",
    "by",
    "in",
    "with",
    "of",
  ];

  return text
    .toLowerCase()
    .split(" ")
    .map((word, index) => {
      if (index === 0 || !smallWords.includes(word)) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
      return word;
    })
    .join(" ");
};

// console.log(capitalizeTitle("the quick brown fox jumps over the lazy dog"));
