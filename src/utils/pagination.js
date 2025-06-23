const getPageNumber = (position, pageSize = 10) => {
  if (position < 1) {
    return 1;
  }
  return Math.ceil(position / pageSize);
};
