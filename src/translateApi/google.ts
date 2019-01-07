import { translateApi } from '../utils';
const request = require('request-promise').defaults({
  simple: false,
  resolveWithFullResponse: true,
});
const urlencode = require('urlencode');
const iconv = require('iconv-lite');
const TRANSLATE_ERROR = 'Translate failed, please check your network.';
const URL_PREFIX = 'https://translate.google.cn/';
let tkk = '429175.1243284773';

const headers = {
  'User-Agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
};
async function get(url: string) {
  let options = {
    url,
    headers,
  };

  let rsp = await request.get(options);

  if (rsp.statusCode >= 400) {
    throw new Error(TRANSLATE_ERROR);
  }

  iconv.decode(new Buffer(rsp.body), 'utf-8');

  return rsp;
}

// Get Tkk value
(async () => {
  let url = URL_PREFIX;
  let rsp = await get(url);
  let tkkMat = rsp.body.match(/tkk:'([\d.]+)'/);
  tkk = tkkMat ? tkkMat[1] : tkk;
})();

// translate_m_zh-CN.js:formatted Line 8084
function Ho(a: any) {
  return function() {
    return a;
  };
}

function Io(a: any, b: any) {
  for (var c = 0; c < b.length - 2; c += 3) {
    var d = b.charAt(c + 2);
    d = 'a' <= d ? d.charCodeAt(0) - 87 : Number(d);
    d = '+' == b.charAt(c + 1) ? a >>> d : a << d;
    a = '+' == b.charAt(c) ? (a + d) & 4294967295 : a ^ d;
  }
  return a;
}

// translate_m_zh-CN.js:formatted Line 8099 fun Ko
function tk(a: any, tkk: any) {
  var b = tkk || '';
  var d: any = Ho(String.fromCharCode(116));
  var c: any = Ho(String.fromCharCode(107));
  d = [d(), d()];
  d[1] = c();
  c = '&' + d.join('') + '=';
  d = b.split('.');
  b = Number(d[0]) || 0;
  for (var e = [], f = 0, g = 0; g < a.length; g++) {
    var k = a.charCodeAt(g);
    128 > k
      ? (e[f++] = k)
      : (2048 > k
          ? (e[f++] = (k >> 6) | 192)
          : (55296 == (k & 64512) && g + 1 < a.length && 56320 == (a.charCodeAt(g + 1) & 64512)
              ? ((k = 65536 + ((k & 1023) << 10) + (a.charCodeAt(++g) & 1023)),
                (e[f++] = (k >> 18) | 240),
                (e[f++] = ((k >> 12) & 63) | 128))
              : (e[f++] = (k >> 12) | 224),
            (e[f++] = ((k >> 6) & 63) | 128)),
        (e[f++] = (k & 63) | 128));
  }
  a = b;
  for (f = 0; f < e.length; f++) {
    (a += e[f]), (a = Io(a, '+-a^+6'));
  }
  a = Io(a, '+-3^+b+-f');
  a ^= Number(d[1]) || 0;
  0 > a && (a = (a & 2147483647) + 2147483648);
  a %= 1e6;
  return c + (a.toString() + '.' + (a ^ b));
}
// function getCandidate(tran: string[][][][]) {
//   let words: string[] = [];
//   if (tran[1]) {
//     words = words.concat(tran[1][0][1]);
//   }
//   if (tran[5]) {
//     words = words.concat(tran[5][0][2].map(t => t[0]));
//   }
//   return words;
// }
export const translate: translateApi = async function(word, toLanguage) {
  let lang = {
    from: 'auto',
    to: toLanguage,
  };

  let url = `${URL_PREFIX}translate_a/single?client=webapp&sl=${lang.from}&tl=${
    lang.to
  }&hl=zh-CN&dt=at&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&dt=t&pc=1&otf=1&ssel=0&tsel=0&kc=1&tk=${tk(
    word,
    tkk
  )}&q=${urlencode(word, 'utf-8')}`;

  try {
    let rsp = await get(url);
    let tranWord = JSON.parse(rsp.body);
    // let candidate = getCandidate(tranWord);
    return {
      translation: tranWord[0][0][0],
      // candidate,
    };
  } catch (err) {
    throw new Error(TRANSLATE_ERROR);
  }
};
