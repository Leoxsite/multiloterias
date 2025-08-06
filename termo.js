// Lista dos idiomas suportados com seus códigos e nomes completos
const languages = [
  { code: 'pt-BR', label: 'Português (Brasil)' },
  { code: 'en-US', label: 'English (Estados Unidos)' },
  { code: 'es-ES', label: 'Español (España)' },
  { code: 'fr-FR', label: 'Français (France)' },
  { code: 'it-IT', label: 'Italiano (Italia)' },
  { code: 'de-DE', label: 'Deutsch (Deutschland)' },
  { code: 'ja-JP', label: '日本語 (日本)' },
  { code: 'pt-PT', label: 'Português (Portugal)' },
  { code: 'en-GB', label: 'English (Reino Unido)' },
  { code: 'es-AR', label: 'Español (Argentina)' },
  { code: 'es-MX', label: 'Español (México)' },
  { code: 'en-CA', label: 'English (Canadá)' },
  { code: 'hi-IN', label: 'हिन्दी (भारत)' },
  { code: 'ko-KR', label: '한국어 (대한민국)'},
  { code: 'en-AU', label: 'English (Australia)' },
  { code: 'en-SG', label: 'English (Singapore)' }
  
];

const supportedLanguages = languages.map(function(lang) {
  return lang.code.toLowerCase();
});

function obterIdiomaPreferido() {
  const idiomaSalvo = localStorage.getItem('selectedLang');
  const idiomaSalvoTratado = idiomaSalvo ? idiomaSalvo.trim().toLowerCase() : null;
  let idiomaNavegador = (navigator.language || navigator.userLanguage || 'en-US').trim().toLowerCase();

  if (!supportedLanguages.includes(idiomaNavegador)) {
    const prefixo = idiomaNavegador.split('-')[0];
    const encontrado = supportedLanguages.find(function(code) {
      return code.startsWith(prefixo);
    });
    if (encontrado) {
      idiomaNavegador = encontrado;
    }
  }

  if (idiomaSalvoTratado && supportedLanguages.includes(idiomaSalvoTratado)) {
    return languages.find(function(l) {
      return l.code.toLowerCase() === idiomaSalvoTratado;
    }).code;
  } else if (supportedLanguages.includes(idiomaNavegador)) {
    return languages.find(function(l) {
      return l.code.toLowerCase() === idiomaNavegador;
    }).code;
  }

  return 'en-US';
}

function atualizarIdioma(idioma) {
  document.documentElement.lang = idioma;

  document.querySelectorAll('[data-lang]').forEach(function(el) {
    if (el.getAttribute('data-lang').toLowerCase() === idioma.toLowerCase()) {
      el.style.display = '';
    } else {
      el.style.display = 'none';
    }
  });

  const botaoAjuda = document.getElementById('help-btn');
  if (botaoAjuda) {
    botaoAjuda.querySelectorAll('[data-lang]').forEach(function(el) {
      if (el.getAttribute('data-lang').toLowerCase() === idioma.toLowerCase()) {
        el.style.display = '';
      } else {
        el.style.display = 'none';
      }
    });
  }

  if (idioma.toLowerCase() === 'ja-jp') {
    document.documentElement.classList.add('ja-jp');
  } else {
    document.documentElement.classList.remove('ja-jp');
  }
}

const idiomaAtual = obterIdiomaPreferido();
atualizarIdioma(idiomaAtual);

const botaoAjuda = document.getElementById('help-btn');
if (botaoAjuda) {
  botaoAjuda.addEventListener('click', function() {
    window.location.href = 'ajuda.html';
  });
}

function formatarNumero(numero) {
  return numero.toString().padStart(2, '0');
}

function esperar(tempoEmMilissegundos) {
  return new Promise(function(resolve) {
    setTimeout(resolve, tempoEmMilissegundos);
  });
}






  






