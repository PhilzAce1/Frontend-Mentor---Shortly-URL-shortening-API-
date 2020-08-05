const mobileNav = document.querySelector('body > nav');
const openBtn = document.querySelector('#open');
const closeBtn = document.querySelector('#close');

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
