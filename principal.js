// Lista dos idiomas suportados
const languages = [
  { code: 'pt-BR', label: 'Português (Brasil)', flag: 'https://flagcdn.com/w320/br.png' },
  { code: 'en-US', label: 'English (US)', flag: 'https://flagcdn.com/us.svg' },
  { code: 'es-ES', label: 'Español (España)', flag: 'https://flagcdn.com/es.svg' },
  { code: 'fr-FR', label: 'Français (France)', flag: 'https://flagcdn.com/fr.svg' },
  { code: 'it-IT', label: 'Italiano (Italia)', flag: 'https://flagcdn.com/it.svg' },
  { code: 'de-DE', label: 'Deutsch (Deutschland)', flag: 'https://flagcdn.com/de.svg' },
  { code: 'ja-JP', label: '日本語 (日本)', flag: 'https://flagcdn.com/jp.svg' },
  { code: 'pt-PT', label: 'Português (Portugal)', flag: 'https://flagcdn.com/pt.svg' },
  { code: 'en-GB', label: 'English (UK)', flag: 'https://flagcdn.com/gb.svg' },
  { code: 'es-AR', label: 'Español (Argentina)', flag: 'https://flagcdn.com/ar.svg' },
  { code: 'es-MX', label: 'Español (México)', flag: 'https://flagcdn.com/mx.svg' },
  { code: 'en-CA', label: 'English (Canada)', flag: 'https://flagcdn.com/ca.svg' },
  { code: 'hi-IN', label: 'हिन्दी (भारत)', flag: 'https://flagcdn.com/in.svg' },
  { code: 'ko-KR', label: '한국어 (대한민국)', flag: 'https://flagcdn.com/kr.svg' },
  { code: 'en-AU', label: 'English (Australia)', flag: 'https://flagcdn.com/au.svg' },
  { code: 'en-SG', label: 'English (Singapore)', flag: 'https://flagcdn.com/sg.svg'}
];

const supportedLangs = languages.map(lang => lang.code.toLowerCase());

// Tenta obter idioma do localStorage
let savedLang = localStorage.getItem('selectedLang');
if (savedLang) savedLang = savedLang.trim();

// Detecta idioma do navegador
let browserLang = (navigator.language || navigator.userLanguage || 'en-US').trim().toLowerCase();

// DEBUG
console.log('Idioma salvo:', savedLang);
console.log('Idioma do navegador:', browserLang);

// Corrige: usa savedLang se válido, senão usa browserLang se suportado, senão usa en-US
let currentLang = 'en-US';

if (savedLang && supportedLangs.includes(savedLang.toLowerCase())) {
  currentLang = languages.find(l => l.code.toLowerCase() === savedLang.toLowerCase()).code;
} else if (supportedLangs.includes(browserLang)) {
  currentLang = languages.find(l => l.code.toLowerCase() === browserLang).code;
}

// Atualiza atributo lang da tag HTML
document.documentElement.lang = currentLang;

// Atualiza interface
function updateLanguage(lang) {
  document.querySelectorAll('[data-lang]').forEach(el => {
    el.style.display = el.getAttribute('data-lang') === lang ? '' : 'none';
  });

  const helpBtn = document.getElementById('help-btn');
  if (helpBtn) {
    helpBtn.querySelectorAll('[data-lang]').forEach(el => {
      el.style.display = el.getAttribute('data-lang') === lang ? '' : 'none';
    });
  }

  // Aqui: adiciona/remover a classe no <html> para poder usar CSS condicional
  if (lang.toLowerCase() === 'ja-jp') {
    document.documentElement.classList.add('ja-jp');
  } else {
    document.documentElement.classList.remove('ja-jp');
  }
}

// Aplica idioma
updateLanguage(currentLang);

// Traduções para o texto do tooltip do botão "bola branca"
const traducaoAjuda = {
  "pt-BR": "AJUDAR",
  "en-US": "HELP",
  "es-ES": "AYUDAR",
  "fr-FR": "AIDER",
  "it-IT": "AIUTARE",
  "de-DE": "HILF",
  "ja-JP": "助ける",
  "pt-PT": "AJUDAR",
  "en-GB": "HELP",
  "es-AR": "AYUDAR",
  "es-MX": "AYUDAR",
  "en-CA": "HELP",
  "hi-IN": "मदद करें",
  "ko-KR": "도움",
  "en-AU": "HELP",
  "en-SG": "HELP"

};

// Função para atualizar tooltip do botão "bola branca" e botão "ajuda"
function atualizarTooltipsAjuda(idioma) {
  const texto = traducaoAjuda[idioma] || traducaoAjuda['pt-BR'];

  // Atualiza título (tooltip nativo) do botão original "ajudar o site"
  const btnAjuda = document.getElementById('btn-ajuda');
  if (btnAjuda) {
    btnAjuda.title = texto;
  }

  // Atualiza título (tooltip nativo) do botão da bola branca
  const btnBola = document.getElementById('contact-flag');
  if (btnBola) {
    if (btnBola) {
  btnBola.removeAttribute('title');
}

  }
}

// Chamada para atualizar tooltips do botão ajuda e bola branca
atualizarTooltipsAjuda(currentLang);

// Botão "Ajudar o Site"
const helpBtn = document.getElementById('help-btn');
if (helpBtn) {
  helpBtn.addEventListener('click', () => {
    window.location.href = 'ajuda.html';
  });
}

  // Dados dos nomes dos países traduzidos para todos os 14 países, em cada idioma
const countryNames = {
 
  'alemanha': {
    'pt-BR': 'Alemanha',       'en-US': 'Germany',      'es-ES': 'Alemania',     'fr-FR': 'Allemagne',
    'it-IT': 'Germania',       'de-DE': 'Deutschland', 'ja-JP': 'ドイツ',        'pt-PT': 'Alemanha',
    'en-GB': 'Germany',        'es-AR': 'Alemania',    'es-MX': 'Alemania',     'en-CA': 'Germany',
    'hi-IN': 'जर्मनी',          'ko-KR': '독일',         'en-AU': 'Germany',      'sg-SG': 'Germany'
  },
  'argentina': {
    'pt-BR': 'Argentina',      'en-US': 'Argentina',   'es-ES': 'Argentina',    'fr-FR': 'Argentine',
    'it-IT': 'Argentina',      'de-DE': 'Argentinien', 'ja-JP': 'アルゼンチン',  'pt-PT': 'Argentina',
    'en-GB': 'Argentina',      'es-AR': 'Argentina',   'es-MX': 'Argentina',    'en-CA': 'Argentina',
    'hi-IN': 'अर्जेंटीना',       'ko-KR': '아르헨티나',    'en-AU': 'Argentina',    'sg-SG': 'Argentina'
  },
  'brasil': {
    'pt-BR': 'Brasil',         'en-US': 'Brazil',      'es-ES': 'Brasil',       'fr-FR': 'Brésil',
    'it-IT': 'Brasile',        'de-DE': 'Brasilien',   'ja-JP': 'ブラジル',      'pt-PT': 'Brasil',
    'en-GB': 'Brazil',         'es-AR': 'Brasil',      'es-MX': 'Brasil',       'en-CA': 'Brazil',
    'hi-IN': 'ब्राज़ील',         'ko-KR': '브라질',        'en-AU': 'Brazil',       'sg-SG': 'Brazil'
  },
  'canada': {
    'pt-BR': 'Canadá',         'en-US': 'Canada',      'es-ES': 'Canadá',       'fr-FR': 'Canada',
    'it-IT': 'Canada',         'de-DE': 'Kanada',      'ja-JP': 'カナダ',        'pt-PT': 'Canadá',
    'en-GB': 'Canada',         'es-AR': 'Canadá',      'es-MX': 'Canadá',       'en-CA': 'Canada',
    'hi-IN': 'कनाडा',           'ko-KR': '캐나다',        'en-AU': 'Canada',       'sg-SG': 'Canada'
  },
  'espanha': {
    'pt-BR': 'Espanha',        'en-US': 'Spain',       'es-ES': 'España',       'fr-FR': 'Espagne',
    'it-IT': 'Spagna',         'de-DE': 'Spanien',     'ja-JP': 'スペイン',      'pt-PT': 'Espanha',
    'en-GB': 'Spain',          'es-AR': 'España',      'es-MX': 'España',       'en-CA': 'Spain',
    'hi-IN': 'स्पेन',            'ko-KR': '스페인',        'en-AU': 'Spain',        'sg-SG': 'Spain'
  },
  'eua': {
    'pt-BR': 'EUA',            'en-US': 'USA',         'es-ES': 'EE.UU.',       'fr-FR': 'États-Unis',
    'it-IT': 'USA',            'de-DE': 'USA',         'ja-JP': 'アメリカ',      'pt-PT': 'EUA',
    'en-GB': 'USA',            'es-AR': 'EE.UU.',      'es-MX': 'EE.UU.',       'en-CA': 'USA',
    'hi-IN': 'अमेरिका',         'ko-KR': '미국',          'en-AU': 'USA',          'sg-SG': 'USA'
  },
  'franca': {
    'pt-BR': 'França',         'en-US': 'France',      'es-ES': 'Francia',      'fr-FR': 'France',
    'it-IT': 'Francia',        'de-DE': 'Frankreich',  'ja-JP': 'フランス',      'pt-PT': 'França',
    'en-GB': 'France',         'es-AR': 'Francia',     'es-MX': 'Francia',      'en-CA': 'France',
    'hi-IN': 'फ्रांस',           'ko-KR': '프랑스',        'en-AU': 'France',       'sg-SG': 'France'
  },
  'india': {
    'pt-BR': 'Índia',          'en-US': 'India',       'es-ES': 'India',        'fr-FR': 'Inde',
    'it-IT': 'India',          'de-DE': 'Indien',      'ja-JP': 'インド',        'pt-PT': 'Índia',
    'en-GB': 'India',          'es-AR': 'India',       'es-MX': 'India',        'en-CA': 'India',
    'hi-IN': 'भारत',             'ko-KR': '인도',          'en-AU': 'India',        'sg-SG': 'India'
  },
  'italia': {
    'pt-BR': 'Itália',         'en-US': 'Italy',       'es-ES': 'Italia',       'fr-FR': 'Italie',
    'it-IT': 'Italia',         'de-DE': 'Italien',     'ja-JP': 'イタリア',      'pt-PT': 'Itália',
    'en-GB': 'Italy',          'es-AR': 'Italia',      'es-MX': 'Italia',       'en-CA': 'Italy',
    'hi-IN': 'इटली',             'ko-KR': '이탈리아',       'en-AU': 'Italy',        'sg-SG': 'Italy'
  },
  'japao': {
    'pt-BR': 'Japao',          'en-US': 'Japan',       'es-ES': 'Japón',        'fr-FR': 'Japon',
    'it-IT': 'Giappone',       'de-DE': 'Japan',       'ja-JP': '日本',          'pt-PT': 'Japao',
    'en-GB': 'Japan',          'es-AR': 'Japón',       'es-MX': 'Japón',        'en-CA': 'Japan',
    'hi-IN': 'जापान',             'ko-KR': '일본',           'en-AU': 'Japan',        'sg-SG': 'Japan'
  },
  'mexico': {
    'pt-BR': 'México',         'en-US': 'Mexico',      'es-ES': 'México',       'fr-FR': 'Mexique',
    'it-IT': 'Messico',        'de-DE': 'Mexiko',      'ja-JP': 'メキシコ',      'pt-PT': 'México',
    'en-GB': 'Mexico',         'es-AR': 'México',      'es-MX': 'México',       'en-CA': 'Mexico',
    'hi-IN': 'मेक्सिको',          'ko-KR': '멕시코',         'en-AU': 'Mexico',       'sg-SG': 'Mexico'
  },
  'portugal': {
    'pt-BR': 'Portugal',       'en-US': 'Portugal',    'es-ES': 'Portugal',     'fr-FR': 'Portugal',
    'it-IT': 'Portogallo',     'de-DE': 'Portugal',    'ja-JP': 'ポルトガル',    'pt-PT': 'Portugal',
    'en-GB': 'Portugal',       'es-AR': 'Portugal',    'es-MX': 'Portugal',     'en-CA': 'Portugal',
    'hi-IN': 'पुर्तगाल',          'ko-KR': '포르투갈',        'en-AU': 'Portugal',     'sg-SG': 'Portugal'
  },
  'reino-unido': {
    'pt-BR': 'Reino Unido',   'en-US': 'United Kingdom', 'es-ES': 'Reino Unido', 'fr-FR': 'Royaume-Uni',
    'it-IT': 'Regno Unito',   'de-DE': 'Vereinigtes Königreich', 'ja-JP': 'イギリス', 'pt-PT': 'Reino Unido',
    'en-GB': 'United Kingdom', 'es-AR': 'Reino Unido', 'es-MX': 'Reino Unido', 'en-CA': 'United Kingdom',
    'hi-IN': 'यूनाइटेड किंगडम',   'ko-KR': '영국',            'en-AU': 'United Kingdom', 'sg-SG': 'United Kingdom'
  },
  'coreia-do-sul': {
    'pt-BR': 'Coreia do Sul', 'en-US': 'South Korea', 'es-ES': 'Corea del Sur', 'fr-FR': 'Corée du Sud',
    'it-IT': 'Corea del Sud', 'de-DE': 'Südkorea', 'ja-JP': '韓国', 'pt-PT': 'Coreia do Sul',
    'en-GB': 'South Korea', 'es-AR': 'Corea del Sur', 'es-MX': 'Corea del Sur', 'en-CA': 'South Korea',
    'hi-IN': 'दक्षिण कोरिया', 'ko-KR': '한국',           'en-AU': 'South Korea', 'sg-SG': 'South Korea'
  },
  'australia': {
    'pt-BR': 'Austrália',     'en-US': 'Australia',   'es-ES': 'Australia',    'fr-FR': 'Australie',
    'it-IT': 'Australia',     'de-DE': 'Australien',  'ja-JP': 'オーストラリア', 'pt-PT': 'Austrália',
    'en-GB': 'Australia',     'es-AR': 'Australia',   'es-MX': 'Australia',    'en-CA': 'Australia',
    'hi-IN': 'ऑस्ट्रेलिया',       'ko-KR': '호주',          'en-AU': 'Australia', 'sg-SG': 'Australia'
  },
  'singapura': {
    'pt-BR': 'Singapura',     'en-US': 'Singapore',     'es-ES': 'Singapur',      'fr-FR': 'Singapour',
    'it-IT': 'Singapore',     'de-DE': 'Singapur',      'ja-JP': 'シンガポール',    'pt-PT': 'Singapura',
    'en-GB': 'Singapore',     'es-AR': 'Singapur',     'es-MX': 'Singapur',      'en-CA': 'Singapore',
    'hi-IN': 'सिंगापुर',        'ko-KR': '싱가포르',        'en-AU': 'Singapore',      'sg-SG': 'Singapore'
  }


};



// Função para obter idioma atual salvo no localStorage (ou padrão 'pt-BR')
function getCurrentLang() {
  return localStorage.getItem('selectedLang') || 'pt-BR';
}

// Criar elemento tooltip e adicionar ao body
const tooltip = document.createElement('div');
tooltip.className = 'tooltip';
document.body.appendChild(tooltip);

// Função para mostrar tooltip
function showTooltip(button, countryKey) {
  // Ignorar tooltip de país para botão "contact-flag" (bola branca)
  if (button.id === 'contact-flag') {
    return;
  }

  const lang = getCurrentLang();
  const name = countryNames[countryKey]?.[lang] || countryNames[countryKey]?.['pt-BR'] || '';

  tooltip.textContent = name;

  const rect = button.getBoundingClientRect();
  const scrollY = window.scrollY || window.pageYOffset;
  const scrollX = window.scrollX || window.pageXOffset;

  // Posicionar abaixo do botão, centralizado horizontalmente
  tooltip.style.top = (rect.bottom + scrollY + 15) + 'px'; // 15px abaixo do botão
  tooltip.style.left = (rect.left + scrollX + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';

  tooltip.classList.add('show');
}

// Seleciona botão da bola branca pelo id 'contact-flag'
const contactBtn = document.getElementById('contact-flag');
if (contactBtn) {
  contactBtn.addEventListener('mouseenter', () => {
    const lang = getCurrentLang();
    tooltip.textContent = traducaoAjuda[lang] || traducaoAjuda['pt-BR'];

    const rect = contactBtn.getBoundingClientRect();
    const scrollY = window.scrollY || window.pageYOffset;
    const scrollX = window.pageXOffset || window.scrollX;

    tooltip.style.top = (rect.bottom + scrollY + 15) + 'px';
    tooltip.style.left = (rect.left + scrollX + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';

    tooltip.classList.add('show');
  });

  contactBtn.addEventListener('mouseleave', () => {
    tooltip.classList.remove('show');
  });

  contactBtn.addEventListener('click', () => {
    window.location.href = 'ajuda.html';
  });
}

// Função para esconder tooltip (para os botões de países)
function hideTooltip() {
  tooltip.classList.remove('show');
}

// Adicionar eventos aos botões das bandeiras (exceto o botão da bola branca)
document.querySelectorAll('.flag-btn').forEach(btn => {
  if (btn.id === 'contact-flag') {
    // Ignorar o botão da bola branca aqui
    return;
  }

  const img = btn.querySelector('img');
  let countryKey = img.alt.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s/g, '-');
  // Exemplo: 'Reino Unido' vira 'reino-unido'

  btn.addEventListener('mouseenter', () => showTooltip(btn, countryKey));
  btn.addEventListener('mouseleave', hideTooltip);
});

// Tooltip dinâmica para o botão "Ajudar o Site"
document.addEventListener("DOMContentLoaded", () => {
  const helpBtn = document.getElementById("help-btn");
  const img = helpBtn.querySelector(".bola-ajuda");

  // Encontra o span ativo com o idioma atual
  const getTextoAjuda = () => {
    const spans = helpBtn.querySelectorAll(".ajuda-texto");
    for (const span of spans) {
      if (span.style.display !== "none") {
        return span.textContent.trim();
      }
    }
    return "Ajudar o Site"; // fallback
  };

  // Cria a tooltip
  const tooltip = document.createElement("div");
  tooltip.className = "tooltip tooltip-ajuda";
  tooltip.style.position = "absolute";
  tooltip.style.display = "none";
  tooltip.textContent = getTextoAjuda();
  helpBtn.appendChild(tooltip);

  // Mostra a tooltip ao passar o mouse
  helpBtn.addEventListener("mouseenter", () => {
    tooltip.textContent = getTextoAjuda();
    tooltip.style.display = "block";
    tooltip.classList.add("show");
  });

  // Move a tooltip junto com o botão
  helpBtn.addEventListener("mousemove", (e) => {
    const rect = helpBtn.getBoundingClientRect();
    tooltip.style.top = rect.bottom + 8 + "px";
    tooltip.style.left = rect.left + rect.width / 2 + "px";
  });

  // Esconde ao sair
  helpBtn.addEventListener("mouseleave", () => {
    tooltip.style.display = "none";
    tooltip.classList.remove("show");
  });
});

function showTooltip(button, countryKey) {
  if (button.id === 'contact-flag') {
    return;
  }

  const lang = getCurrentLang();
  const name = countryNames[countryKey]?.[lang] || countryNames[countryKey]?.['pt-BR'] || '';

  tooltip.textContent = name;

  const rect = button.getBoundingClientRect();
  const scrollY = window.scrollY || window.pageYOffset;
  const scrollX = window.pageXOffset || window.scrollX;

  // Posiciona inicialmente abaixo do botão, centralizado horizontalmente
  let top = rect.bottom + scrollY + 15; 
  let left = rect.left + scrollX + rect.width / 2 - tooltip.offsetWidth / 2;

  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const tooltipHeight = tooltip.offsetHeight;

  // Ajusta se o tooltip ultrapassar a borda direita da janela
  if (left + tooltip.offsetWidth > windowWidth) {
    left = rect.left + scrollX; // alinha tooltip à esquerda do botão
    top = top + rect.height + 5; // desce tooltip para “linha abaixo”
  }

  // Ajusta se o tooltip ultrapassar a borda esquerda (lado negativo)
  if (left < 0) {
    left = 5; // margem mínima à esquerda da tela
  }

  // Ajusta se o tooltip ultrapassar a borda inferior da janela (ex: rodapé)
  if (top + tooltipHeight > scrollY + windowHeight) {
    top = rect.top + scrollY - tooltipHeight - 10; // mostra acima do botão
  }

  // Aplica a posição calculada
  tooltip.style.top = top + 'px';
  tooltip.style.left = left + 'px';

  tooltip.classList.add('show');
}

// Mostra no botão o idioma salvo no localStorage
const currentLangBtn = document.getElementById('current-lang-btn');
if (currentLangBtn) {
  const savedLang = localStorage.getItem('selectedLang') || 'pt-BR';

  // Atualiza bandeira e texto do botão
  const langData = languages.find(l => l.code === savedLang);
  if (langData) {
    const img = currentLangBtn.querySelector('img');
    const span = currentLangBtn.querySelector('span') .textContent = langData.code .toUpperCase(); // só o código, sem "▼";
    img.src = langData.flag;
    img.alt = langData.label;
    span.textContent = `${langData.code} ▼`;
  }

  // Clicar no botão → voltar ao index.html
  currentLangBtn.addEventListener('click', () => {
    window.location.href = 'index.html';
  });
}

document.addEventListener('contextmenu', event => event.preventDefault());
