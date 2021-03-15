const getItemsCount = (width) => {
  if (width < 768) {
    return 1;
  }
  if (width >= 768 && width < 1150) {
    return 2;
  }
  return 3;
};

export default getItemsCount;
