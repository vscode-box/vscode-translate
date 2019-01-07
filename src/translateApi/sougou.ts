const md5 = require('md5')
const rp = require('request-promise').defaults({
  simple: false,
  resolveWithFullResponse: true,
});

function uuid() {
  let t,
    e,
    n = ''
  for (t = 0; t < 32; t++)
    (e = (16 * Math.random()) | 0),
      (8 !== t && 12 !== t && 16 !== t && 20 !== t) || (n += '-'),
      (n += (12 === t ? 4 : 16 === t ? (3 & e) | 8 : e).toString(16))
  return n
}

export default async function translate (word: string, toLanguage: string = 'zh-CHS'){
  const from = 'auto'
  const s = md5('' + from + toLanguage + word + '41ee21a5ab5a13f72687a270816d1bfd')
  const payload = {
    from,
    to: toLanguage,
    client: 'pc',
    fr: 'browser_pc',
    text: word,
    useDetect: 'on',
    useDetectResult: 'on',
    needQc: 1,
    uuid: uuid(),
    oxford: 'on',
    pid: 'sogou-dict-vr',
    isReturnSugg: 'on',
    s
  }

  try{
    const res = await rp({
      method: 'POST',
      uri: 'https://fanyi.sogou.com/reventondc/translateV1',
      form: payload,
      simple: false,
      resolveWithFullResponse: true,
    })
    const body = JSON.parse(res.body)
    console.log(body.data.translate.dit)
    return {
      translation: body.data.translate.dit,
    };
  }catch(e){
    console.log(e)
  }
}