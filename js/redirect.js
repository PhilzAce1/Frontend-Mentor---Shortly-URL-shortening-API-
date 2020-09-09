const testUrl = '?l';
window.onload = onLoad;
function onLoad() {
  const { isLink, link } = isShortLink(location.search);
  if (isLink) {
    makeApiCall(link.l);
  }
}
function onerror() {
  window.location.pathname = '/404.html';
}
function onSuccess(link) {
  window.location = link;
}
function makeApiCall(param) {
  function onReq(param) {
    if (param.success) {
      return onSuccess(param.payload);
    } else return onerror();
  }
  console.log('heloow');
  // AkRNl6y_9
  const url = 'http://localhost:5000/' + param;
  console.log();
  fetch(url)
    .then((res) => res.json())
    .then(onReq)
    .catch((ex) => console.log(ex));
}

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
