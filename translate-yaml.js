const fs = require('fs');
const yaml = require('js-yaml');
const axios = require('axios');

// List bahasa dan kode ISO (Uruguay pakai es-UY)
const LANGUAGES = {
  en: 'English',
  de: 'Deutsch',
  es: 'Español',
  fr: 'Français',
  no: 'Norsk',              // 'Norsk' = Norwegian in native
  pt: 'Português',
  ru: 'Русский',
  uk: 'Українська',
  zh: '中文',                // Chinese (Simplified)
  vi: 'Tiếng Việt',
  id: 'Bahasa Indonesia'
};


// Fungsi flatten & unflatten untuk nested yaml
function flatten(obj, path = '', res = {}) {
  for (let key in obj) {
    if (typeof obj[key] === 'object') flatten(obj[key], path ? `${path}.${key}` : key, res);
    else res[path ? `${path}.${key}` : key] = obj[key];
  }
  return res;
}

function unflatten(data) {
  let result = {};
  for (let i in data) {
    let keys = i.split('.');
    keys.reduce((r, e, j) => r[e] || (r[e] = isNaN(Number(keys[j + 1])) ? (keys.length - 1 === j ? data[i] : {}) : []), result);
  }
  return result;
}

// Fungsi translate pakai LibreTranslate (free)
async function translateText(text, targetLang) {
  const url = 'https://libretranslate.de/translate';
  try {
    const res = await axios.post(url, {
      q: text,
      source: "en",
      target: targetLang,
      format: "text"
    }, { headers: { accept: "application/json" }});
    return res.data.translatedText;
  } catch (err) {
    console.error(`Translation failed: ${text}`);
    return text;
  }
}

// Map kode bahasa LibreTranslate
const libreLangMap = {
  id: 'id', de: 'de', es: 'es', fr: 'fr', no: 'no', 'es-UY': 'es' // Uruguay tetap "es"
};

async function main() {
  // 1. Baca en.yaml
const enYaml = yaml.load(fs.readFileSync('locales/en.yaml', 'utf8'));
// ...
const filename = `locales/${lang}.yaml`;
fs.writeFileSync(filename, yaml.dump(nested, { quotingType: '"' }));

  for (const [lang, langName] of Object.entries(LANGUAGES)) {
    const out = {};
    for (const [key, value] of Object.entries(flat)) {
      // Translate masing-masing string
      out[key] = await translateText(value, libreLangMap[lang]);
    }
    // 2. Kembalikan ke format nested
    const nested = unflatten(out);

    // 3. Tulis file
    const filename = `${lang}.yaml`;
    fs.writeFileSync(filename, yaml.dump(nested, { quotingType: '"' }));
    console.log(`Generated ${filename}`);
  }
}

main();
