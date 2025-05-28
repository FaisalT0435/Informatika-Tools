const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const axios = require('axios');

// Kode bahasa: label
const LANGUAGES = {
  it: 'Italiano',
  zh: '中文',
  ar: 'العربية',
  ja: '日本語',
  ko: '한국어',
  hi: 'हिन्दी',
  pl: 'Polski',
  tr: 'Türkçe',
  vi: 'Tiếng Việt'
};

// Mapping kode bahasa internal (key LANGUAGES) ke kode di API LibreTranslate
const libreLangMap = {
  it: 'it',
  zh: 'zh',
  ar: 'ar',
  ja: 'ja',
  ko: 'ko',
  hi: 'hi',
  pl: 'pl',
  tr: 'tr',
  vi: 'vi'
};

// flatten/unflatten helpers
function flatten(obj, path = '', res = {}) {
  for (let key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      flatten(obj[key], path ? `${path}.${key}` : key, res);
    } else {
      res[path ? `${path}.${key}` : key] = obj[key];
    }
  }
  return res;
}
function unflatten(data) {
  let result = {};
  for (let i in data) {
    let keys = i.split('.');
    keys.reduce((r, e, j) =>
      r[e] || (r[e] = isNaN(Number(keys[j + 1])) ? (keys.length - 1 === j ? data[i] : {}) : []), result);
  }
  return result;
}

// Translate via local LibreTranslate
async function translateText(text, targetLang) {
  const url = 'http://localhost:5000/translate';
  try {
    const res = await axios.post(url, {
      q: text,
      source: "en",
      target: targetLang,
      format: "text"
    }, { headers: { accept: "application/json" }});
    if (res.data && res.data.translatedText) {
      return res.data.translatedText;
    }
    return text;
  } catch (err) {
    if (err.response) {
      console.error('Status:', err.response.status);
      console.error('Data:', err.response.data);
    } else {
      console.error('Error:', err.message);
    }
    return text;
  }
}

async function main() {
  const localesDir = __dirname;
  let enFilePath = path.join(localesDir, 'en.yml');
  if (!fs.existsSync(enFilePath)) {
    enFilePath = path.join(localesDir, 'en.yml');
    if (!fs.existsSync(enFilePath)) {
      console.error('File en.yaml atau en.yml tidak ditemukan di dalam folder locales/');
      process.exit(1);
    }
  }
  const enYaml = yaml.load(fs.readFileSync(enFilePath, 'utf8'));
  const flat = flatten(enYaml);

  // Fetch daftar bahasa yang didukung dari API
  let supportedLangs = [];
  try {
    const langs = await axios.get('http://localhost:5000/languages');
    supportedLangs = langs.data.map(l => l.code);
  } catch (err) {
    console.error('Gagal mendapatkan daftar bahasa dari LibreTranslate. Cek server & koneksi!');
    process.exit(1);
  }
  console.log('Bahasa yang didukung oleh server:', supportedLangs);

  for (const [lang, langLabel] of Object.entries(LANGUAGES)) {
    const libreCode = libreLangMap[lang] || lang;
    if (!supportedLangs.includes(libreCode)) {
      console.log(`SKIP: ${langLabel} (${lang}) tidak didukung oleh LibreTranslate server ini.`);
      continue;
    }
    console.log(`Translating to ${langLabel} (${libreCode})...`);
    const out = {};
    for (const [key, value] of Object.entries(flat)) {
      out[key] = await translateText(value, libreCode);
    }
    const nested = unflatten(out);
    const filename = path.join(localesDir, `${lang}.yaml`);
    fs.writeFileSync(filename, yaml.dump(nested, { quotingType: '"' }));
    console.log(`Generated ${filename}`);
  }
}

main();
