const mobileNav = document.querySelector('body > nav');
const openBtn = document.querySelector('#open');
const closeBtn = document.querySelector('#close');
const form = document.querySelector('form');
window.onload = function () {
  const lsK = Object.keys(localStorage);
  const links = [];
  lsK.forEach((x) => {
    let item = localStorage[x];
    item = JSON.parse(item);
    links.push({
      longLink: item.longUrl,
      shortUrl: item.shortUrl,
    });
  });
  const linkData = links.map((x) => {
    return `
    <li>
      <p>${x.longLink}</p>
      <div>
          <a href="${x.shortUrl}">${x.shortUrl}</a>
          <button>Copy</button>
      </div>
   </li>`;
  });
  document.querySelector('div.result').innerHTML = linkData.join(',');
};
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputValue = e.target.querySelector('input').value;
  const url = 'http://localhost:5000/api/url/shorten';

  fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      longUrl: inputValue,
    }),
  })
    .then((res) => res.json())
    .then(onSuccess)
    .catch(onError);
});
function onSuccess(param) {
  if (param.success) {
    if (!localStorage.getItem(`${param.payload.urlCode}`)) {
      localStorage[param.payload.urlCode] = JSON.stringify(param.payload);
    }
  } else {
    document.querySelector('p.error').textContent = param.msg;
  }
}
function onError(err) {
  console.log(err);
}

openBtn.addEventListener('click', () => {
  mobileNav.style.display = 'flex';
  openBtn.style.display = 'none';
  closeBtn.style.display = 'inline-block';
});

closeBtn.addEventListener('click', () => {
  mobileNav.style.display = 'none';
  openBtn.style.display = 'inline-block';
  closeBtn.style.display = 'none';
});
