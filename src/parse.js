const mapping = {
  object: JSON.stringify,
  json: JSON.parse,
};

const parse = (type, data) => {
  console.log('type', type);
  console.log('data', data);
  console.log('mapping[type](data)', mapping[type](data));
  return mapping[type](data);
};

export default parse;
