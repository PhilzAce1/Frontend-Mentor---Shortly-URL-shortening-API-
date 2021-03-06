const mobileNav = document.querySelector('body > nav');
const openBtn = document.querySelector('#open');
const closeBtn = document.querySelector('#close');
const form = document.querySelector('form');

function onUpdateDom() {
  document.querySelector('.result button').addEventListener('click', (e) => {
    const refLink = e.target.parentElement.querySelector('a').href;
    copy(refLink);
  });
}

function linkEl(data) {
  return `
  <li>
    <p>${data.longUrl}</p>
    <div>
        <a href="${location.toString()}/?l=${data.urlCode}">${
    location.origin
  }/?l=${data.urlCode}</a>
        <button>Copy</button>
    </div>
 </li>`;
}
function copy(text) {
  var input = document.createElement('input');
  input.setAttribute('value', text);
  document.body.appendChild(input);
  input.select();
  var result = document.execCommand('copy');
  document.body.removeChild(input);
  return result;
}
window.onload = function () {
  const lsK = Object.keys(localStorage);
  const links = [];
  lsK.forEach((x) => {
    let item = localStorage[x];
    item = JSON.parse(item);
    links.push({
      longUrl: item.longUrl,
      shortUrl: item.shortUrl,
      urlCode: item.urlCode,
    });
  });
  // return;
  const linkData = links.map((x) => {
    return linkEl(x);
  });
  document.querySelector('div.result ul').innerHTML = linkData.join(',');
  onUpdateDom();
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
    const resultEl = document.querySelector('.result ul');
    const currentInner = resultEl.innerHTML;
    document.querySelector('form input').value = '';
    if (!localStorage.getItem(`${param.payload.urlCode}`)) {
      localStorage[param.payload.urlCode] = JSON.stringify(param.payload);
    }
    resultEl.innerHTML = linkEl(param.payload) + currentInner;
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
