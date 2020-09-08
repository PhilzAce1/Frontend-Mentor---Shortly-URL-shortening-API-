console.clear();
const testUrl = '?l';
function isShortLink(param) {
  const isLink = param
    .replace('?', '')
    .split('=')
    .reduce((a, b, c, d) => {
      if (!d[c + 1]) {
        return a;
      }
      a[b] = d[c + 1];
      return a;
    }, {});
  return {
    isLink: isLink.hasOwnProperty('l'),
    link: isLink,
  };
}

console.log(isShortLink(testUrl));
function onLoad() {
  const { isLink, link } = isShortLink(location.search);
  if (isLink) {
    makeApiCall(link.l);
  }
}
function makeApiCall(param) {
  // AkRNl6y_9
  const url = 'http://localhost:5000/' + param;
  fetch(url)
    .then((res) => console.log(res))
    .catch((ex) => console.log(ex));
}
