import { getChannel } from './translateApi';

let lastChannel = getChannel();

export function LRUList(
  recentlyUsed: Array<{ name: string; value: string }>,
  selectedLanguage: { name: string; value: string }
) {
  if(lastChannel !== getChannel()){
    lastChannel = getChannel();
    recentlyUsed = [];
  }
  const languages = getLanguages();
  if (recentlyUsed.find(r => r.value === selectedLanguage.value)) {
    const index = recentlyUsed.findIndex(r => r.value === selectedLanguage.value);
    recentlyUsed.splice(index, 1);
  }
  if (languages.find(r => r.value === selectedLanguage.value)) {
    const index = languages.findIndex(r => r.value === selectedLanguage.value);
    languages.splice(index, 1);
  }
  recentlyUsed.splice(0, 0, selectedLanguage);
  return recentlyUsed;
}

export function getLanguages (){
  return {
    google,
    sougou,
  }[lastChannel];
}

export const google = [
  {
    name: 'Afrikaans',
    value: 'af',
  },
  {
    name: 'Albanian',
    value: 'sq',
  },
  {
    name: 'Amharic',
    value: 'am',
  },
  {
    name: 'Arabic',
    value: 'ar',
  },
  {
    name: 'Armenian',
    value: 'hy',
  },
  {
    name: 'Azeerbaijani',
    value: 'az',
  },
  {
    name: 'Basque',
    value: 'eu',
  },
  {
    name: 'Belarusian',
    value: 'be',
  },
  {
    name: 'Bengali',
    value: 'bn',
  },
  {
    name: 'Bosnian',
    value: 'bs',
  },
  {
    name: 'Bulgarian',
    value: 'bg',
  },
  {
    name: 'Catalan',
    value: 'ca',
  },
  {
    name: 'Cebuano',
    value: 'ceb',
  },
  {
    name: 'Chinese',
    value: 'zh-CN',
  },
  {
    name: 'Corsican',
    value: 'co',
  },
  {
    name: 'Croatian',
    value: 'hr',
  },
  {
    name: 'Czech',
    value: 'cs',
  },
  {
    name: 'Danish',
    value: 'da',
  },
  {
    name: 'Dutch',
    value: 'nl',
  },
  {
    name: 'English',
    value: 'en',
  },
  {
    name: 'Esperanto',
    value: 'eo',
  },
  {
    name: 'Estonian',
    value: 'et',
  },
  {
    name: 'Finnish',
    value: 'fi',
  },
  {
    name: 'French',
    value: 'fr',
  },
  {
    name: 'Frisian',
    value: 'fy',
  },
  {
    name: 'Galician',
    value: 'gl',
  },
  {
    name: 'Georgian',
    value: 'ka',
  },
  {
    name: 'German',
    value: 'de',
  },
  {
    name: 'Greek',
    value: 'el',
  },
  {
    name: 'Gujarati',
    value: 'gu',
  },
  {
    name: 'Haitian Creole',
    value: 'ht',
  },
  {
    name: 'Hausa',
    value: 'ha',
  },
  {
    name: 'Hawaiian',
    value: 'haw',
  },
  {
    name: 'Hebrew',
    value: 'he',
  },
  {
    name: 'Hindi',
    value: 'hi',
  },
  {
    name: 'Hmong',
    value: 'hmn',
  },
  {
    name: 'Hungarian',
    value: 'hu',
  },
  {
    name: 'Icelandic',
    value: 'is',
  },
  {
    name: 'Igbo',
    value: 'ig',
  },
  {
    name: 'Indonesian',
    value: 'id',
  },
  {
    name: 'Irish',
    value: 'ga',
  },
  {
    name: 'Italian',
    value: 'it',
  },
  {
    name: 'Japanese',
    value: 'ja',
  },
  {
    name: 'Javanese',
    value: 'jw',
  },
  {
    name: 'Kannada',
    value: 'kn',
  },
  {
    name: 'Kazakh',
    value: 'kk',
  },
  {
    name: 'Khmer',
    value: 'km',
  },
  {
    name: 'Korean',
    value: 'ko',
  },
  {
    name: 'Kurdish',
    value: 'ku',
  },
  {
    name: 'Kyrgyz',
    value: 'ky',
  },
  {
    name: 'Lao',
    value: 'lo',
  },
  {
    name: 'Latin',
    value: 'la',
  },
  {
    name: 'Latvian',
    value: 'lv',
  },
  {
    name: 'Lithuanian',
    value: 'lt',
  },
  {
    name: 'Luxembourgish',
    value: 'lb',
  },
  {
    name: 'Macedonian',
    value: 'mk',
  },
  {
    name: 'Malagasy',
    value: 'mg',
  },
  {
    name: 'Malay',
    value: 'ms',
  },
  {
    name: 'Malayalam',
    value: 'ml',
  },
  {
    name: 'Maltese',
    value: 'mt',
  },
  {
    name: 'Maori',
    value: 'mi',
  },
  {
    name: 'Marathi',
    value: 'mr',
  },
  {
    name: 'Mongolian',
    value: 'mn',
  },
  {
    name: 'Myanmar',
    value: 'my',
  },
  {
    name: 'Nepali',
    value: 'ne',
  },
  {
    name: 'Norwegian',
    value: 'no',
  },
  {
    name: 'Nyanja',
    value: 'ny',
  },
  {
    name: 'Pashto',
    value: 'ps',
  },
  {
    name: 'Persian',
    value: 'fa',
  },
  {
    name: 'Polish',
    value: 'pl',
  },
  {
    name: 'Portuguese',
    value: 'pt',
  },
  {
    name: 'Punjabi',
    value: 'pa',
  },
  {
    name: 'Romanian',
    value: 'ro',
  },
  {
    name: 'Russian',
    value: 'ru',
  },
  {
    name: 'Samoan',
    value: 'sm',
  },
  {
    name: 'Scots Gaelic',
    value: 'gd',
  },
  {
    name: 'Serbian',
    value: 'sr',
  },
  {
    name: 'Sesotho',
    value: 'st',
  },
  {
    name: 'Shona',
    value: 'sn',
  },
  {
    name: 'Sindhi',
    value: 'sd',
  },
  {
    name: 'Sinhala',
    value: 'si',
  },
  {
    name: 'Slovak',
    value: 'sk',
  },
  {
    name: 'Slovenian',
    value: 'sl',
  },
  {
    name: 'Somali',
    value: 'so',
  },
  {
    name: 'Spanish',
    value: 'es',
  },
  {
    name: 'Sundanese',
    value: 'su',
  },
  {
    name: 'Swahili',
    value: 'sw',
  },
  {
    name: 'Swedish',
    value: 'sv',
  },
  {
    name: 'Tagalog',
    value: 'tl',
  },
  {
    name: 'Tajik',
    value: 'tg',
  },
  {
    name: 'Tamil',
    value: 'ta',
  },
  {
    name: 'Telugu',
    value: 'te',
  },
  {
    name: 'Thai',
    value: 'th',
  },
  {
    name: 'Turkish',
    value: 'tr',
  },
  {
    name: 'Ukrainian',
    value: 'uk',
  },
  {
    name: 'Urdu',
    value: 'ur',
  },
  {
    name: 'Uzbek',
    value: 'uz',
  },
  {
    name: 'Vietnamese',
    value: 'vi',
  },
  {
    name: 'Welsh',
    value: 'cy',
  },
  {
    name: 'Xhosa',
    value: 'xh',
  },
  {
    name: 'Yiddish',
    value: 'yi',
  },
  {
    name: 'Yoruba',
    value: 'yo',
  },
  {
    name: 'Zulu',
    value: 'zu',
  },
];

export const sougou = [
  { "value": "ar", "name": "阿拉伯语" },
  { "value": "et", "name": "爱沙尼亚语" },
  { "value": "bg", "name": "保加利亚语" },
  { "value": "pl", "name": "波兰语" },
  { "value": "bs-Latn", "name": "波斯尼亚语" },
  { "value": "fa", "name": "波斯语" },
  { "value": "mww", "name": "白苗文" },
  { "value": "da", "name": "丹麦语" },
  { "value": "de", "name": "德语" },
  { "value": "ru", "name": "俄语" },
  { "value": "fr", "name": "法语" },
  { "value": "fi", "name": "芬兰语" },
  { "value": "fj", "name": "斐济语" },
  { "value": "fil", "name": "菲律宾语" },
  { "value": "ht", "name": "海地克里奥尔语" },
  { "value": "ko", "name": "韩语" },
  { "value": "nl", "name": "荷兰语" },
  { "value": "ca", "name": "加泰隆语" },
  { "value": "cs", "name": "捷克语" },
  { "value": "tlh", "name": "克林贡语" },
  { "value": "tlh-Qaak", "name": "克林贡语(piqaD)" },
  { "value": "hr", "name": "克罗地亚语" },
  { "value": "otq", "name": "克雷塔罗奥托米语" },
  { "value": "ro", "name": "罗马尼亚语" },
  { "value": "lv", "name": "拉脱维亚语" },
  { "value": "lt", "name": "立陶宛语" },
  { "value": "ms", "name": "马来语" },
  { "value": "mt", "name": "马耳他语" },
  { "value": "mg", "name": "马尔加什语" },
  { "value": "bn", "name": "孟加拉语" },
  { "value": "af", "name": "南非荷兰语" },
  { "value": "no", "name": "挪威语" },
  { "value": "pt", "name": "葡萄牙语" },
  { "value": "ja", "name": "日语" },
  { "value": "sv", "name": "瑞典语" },
  { "value": "sl", "name": "斯洛文尼亚语" },
  { "value": "sr-Latn", "name": "塞尔维亚语(拉丁文)" },
  { "value": "sr-Cyrl", "name": "塞尔维亚语(西里尔文)" },
  { "value": "sk", "name": "斯洛伐克语" },
  { "value": "sw", "name": "斯瓦希里语" },
  { "value": "sm", "name": "萨摩亚语" },
  { "value": "th", "name": "泰语" },
  { "value": "tr", "name": "土耳其语" },
  { "value": "to", "name": "汤加语" },
  { "value": "ty", "name": "塔希提语" },
  { "value": "yua", "name": "尤卡坦玛雅语" },
  { "value": "cy", "name": "威尔士语" },
  { "value": "uk", "name": "乌克兰语" },
  { "value": "ur", "name": "乌尔都语" },
  { "value": "es", "name": "西班牙语" },
  { "value": "el", "name": "希腊语" },
  { "value": "hu", "name": "匈牙利语" },
  { "value": "he", "name": "希伯来语" },
  { "value": "en", "name": "英语" },
  { "value": "it", "name": "意大利语" },
  { "value": "hi", "name": "印地语" },
  { "value": "id", "name": "印度尼西亚语" },
  { "value": "vi", "name": "越南语" },
  { "value": "yue", "name": "粤语(繁体)" },
  { "value": "zh-CHS", "name": "中文" },
  { "value": "zh-CHT", "name": "中文繁体" }
];
