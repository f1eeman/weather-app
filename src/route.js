const params = {
  appid: '517bf968ada0e1ffab311d567fe82005',
  units: 'metric',
  lang: 'ru',
};

const getRoute = (city) => {
  const url = new URL('https://api.openweathermap.org/data/2.5/weather');
  const newParams = { q: city, ...params };
  const keys = Object.keys(newParams);
  keys.forEach((key) => {
    url.searchParams.set(key, newParams[key]);
  });
  return url.href;
};

export default getRoute;
