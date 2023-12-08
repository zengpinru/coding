const url = 'https://shangyue.tech?a=3&b=4&c=5';

function getUrlParams(targetUrl) {
  const res = {};
  const urlObj = new URL(targetUrl);
  for (const [key, val] of urlObj.searchParams.entries()) {
    res[key] = val;
  }
  return res;
}

console.log(getUrlParams(url));
