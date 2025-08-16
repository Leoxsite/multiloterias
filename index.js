// Lista dos idiomas suportados e dados para bandeira/nome
const languages = [
  { code: 'pt-BR', label: 'Português (Brasil)', flag: 'https://flagcdn.com/w640/br.png' },
  { code: 'en-US', label: 'English (US)', flag: 'https://flagcdn.com/w320/us.png' },
  { code: 'es-ES', label: 'Español (España)', flag: 'https://flagcdn.com/es.svg' },
  { code: 'fr-FR', label: 'Français (France)', flag: 'https://flagcdn.com/fr.svg' },
  { code: 'it-IT', label: 'Italiano (Italia)', flag: 'https://flagcdn.com/it.svg' },
  { code: 'de-DE', label: 'Deutsch (Deutschland)', flag: 'https://flagcdn.com/de.svg' },
  { code: 'ja-JP', label: '日本語 (日本)', flag: 'https://flagcdn.com/jp.svg' },
  { code: 'pt-PT', label: 'Português (Portugal)', flag: 'https://flagcdn.com/pt.svg' },
  { code: 'en-GB', label: 'English (UK)', flag: 'https://flagcdn.com/w320/gb.png' },
  { code: 'es-AR', label: 'Español (Argentina)', flag: 'https://flagcdn.com/ar.svg' },
  { code: 'es-MX', label: 'Español (México)', flag: 'https://flagcdn.com/mx.svg' },
  { code: 'en-CA', label: 'English (Canada)', flag: 'https://flagcdn.com/w320/ca.png' },
  { code: 'hi-IN', label: 'हिन्दी (भारत)', flag: 'https://flagcdn.com/in.svg' },
  { code: 'ko-KR', label: '한국어 (대한민국)', flag: 'https://flagcdn.com/kr.svg' },
  { code: 'en-AU', label: 'English (Australia)', flag: 'https://flagcdn.com/w640/au.png' },
  { code: 'en-SG', label: 'English (Singapore)', flag: 'https://flagcdn.com/sg.svg'}
  

];

const currentLangBtn = document.getElementById('current-lang-btn');
const langList = document.getElementById('language-list');
const titleElements = document.querySelectorAll('.title');
const subtitleElements = document.querySelectorAll('.subtitle');
const noticeLists = document.querySelectorAll('.notices');
const agreeBtns = document.querySelectorAll('.agree-btn');
const exitBtns = document.querySelectorAll('.exit-btn');

// Lista de idiomas suportados
const supportedLangs = languages.map(l => l.code);

// Atualiza interface para o idioma selecionado
function updateLanguage(lang) {
  currentLang = lang;

  // Atualiza textos multilíngues visíveis
  titleElements.forEach(el => {
    el.style.display = el.getAttribute('data-lang') === lang ? '' : 'none';
  });
  subtitleElements.forEach(el => {
    el.style.display = el.getAttribute('data-lang') === lang ? '' : 'none';
  });
  noticeLists.forEach(el => {
    el.style.display = el.getAttribute('data-lang') === lang ? '' : 'none';
  });
  agreeBtns.forEach(el => {
    el.style.display = el.getAttribute('data-lang') === lang ? '' : 'none';
  });
  exitBtns.forEach(el => {
    el.style.display = el.getAttribute('data-lang') === lang ? '' : 'none';
  });

  // Atualiza botão principal com bandeira e código do idioma
  const langData = languages.find(l => l.code === lang);
  if (langData) {
    currentLangBtn.querySelector('img').src = langData.flag;
    currentLangBtn.querySelector('img').alt = langData.label;
    currentLangBtn.querySelector('span').textContent = langData.code.toUpperCase() + ' ▼';
  }
}

// Mostrar/ocultar lista de idiomas ao clicar no botão
currentLangBtn.addEventListener('click', () => {
  const isExpanded = currentLangBtn.getAttribute('aria-expanded') === 'true';
  if (isExpanded) {
    closeLangList();
  } else {
    openLangList();
  }
});

function openLangList() {
  langList.classList.add('show');
  currentLangBtn.setAttribute('aria-expanded', 'true');
  langList.focus();
}

function closeLangList() {
  langList.classList.remove('show');
  currentLangBtn.setAttribute('aria-expanded', 'false');
}

// Selecionar idioma ao clicar em um item da lista
langList.querySelectorAll('li').forEach(item => {
  item.addEventListener('click', () => {
    const lang = item.getAttribute('data-lang');
    updateLanguage(lang);
    localStorage.setItem('selectedLang', lang);  // salva o idioma escolhido
    closeLangList();
  });
});


// Fechar lista ao clicar fora
document.addEventListener('click', (e) => {
  if (!currentLangBtn.contains(e.target) && !langList.contains(e.target)) {
    closeLangList();
  }
});

// Inicializar idioma na carga da página
updateLanguage(currentLang);

// --- Funções dos botões ---

// Botão "Concordar e Entrar"
agreeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    localStorage.setItem('selectedLang', currentLang);

    // Detecta se está em uma pasta ou na raiz
    const isInLangFolder = window.location.pathname.split('/').filter(Boolean).length > 1;

    // Se estiver em uma pasta de idioma, sobe um nível
    const target = isInLangFolder ? '../principal.html' : 'principal.html';

    window.location.href = target;
  });
});

// Botão "Sair do Site"
exitBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const isInLangFolder = window.location.pathname.split('/').filter(Boolean).length > 1;
    const target = isInLangFolder ? '../blank.html' : 'blank.html';
    window.location.href = target;
  });
});


