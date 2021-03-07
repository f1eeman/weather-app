const mapping = {
  object: JSON.stringify,
  json: JSON.parse,
};

const parse = (type, data) => mapping[type](data);

export default parse;
