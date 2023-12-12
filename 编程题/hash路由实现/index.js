window.addEventListener('hashchange', e => {
  const hashVal = e.newURL.match(/#(.+)$/)[1];
  document.body.style.background = hashVal;
});
