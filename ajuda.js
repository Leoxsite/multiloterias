// Lista dos idiomas suportados com seus códigos e nomes completos
const languages = [
  { code: 'pt-BR', label: 'Português (Brasil)' },
  { code: 'en-US', label: 'English (US)' },
  { code: 'es-ES', label: 'Español (España)' },
  { code: 'fr-FR', label: 'Français (France)' },
  { code: 'it-IT', label: 'Italiano (Italia)' },
  { code: 'de-DE', label: 'Deutsch (Deutschland)' },
  { code: 'ja-JP', label: '日本語 (日本)' },
  { code: 'pt-PT', label: 'Português (Portugal)' },
  { code: 'en-GB', label: 'English (UK)' },
  { code: 'es-AR', label: 'Español (Argentina)' },
  { code: 'es-MX', label: 'Español (México)' },
  { code: 'en-CA', label: 'English (Canada)' },
  { code: 'hi-IN', label: 'हिन्दी (भारत)' },
  { code: 'ko-KR', label: '한국어 (대한민국)'},
  { code: 'en-AU', label: 'English (Australia)' },
  { code: 'en-SG', label: 'English (Singapore)' }

  
];

// Cria uma lista apenas com os códigos em minúsculo para facilitar comparações
const supportedLangs = languages.map(lang => lang.code.toLowerCase());

// Função para obter o idioma preferido do usuário:
// Prioriza o idioma salvo no localStorage, depois o idioma do navegador e se nenhum for suportado, usa 'en-US' como padrão
function getPreferredLanguage() {
  const savedLang = localStorage.getItem('selectedLang')?.trim().toLowerCase();
  const browserLang = (navigator.language || navigator.userLanguage || 'en-US').trim().toLowerCase();

  if (savedLang && supportedLangs.includes(savedLang)) {
    // Retorna o código original com a capitalização correta
    return languages.find(l => l.code.toLowerCase() === savedLang).code;
  } else if (supportedLangs.includes(browserLang)) {
    return languages.find(l => l.code.toLowerCase() === browserLang).code;
  }
  // Idioma padrão caso nenhum seja suportado
  return 'en-US';
}

// Função que atualiza a interface multilíngue na página,
// exibindo apenas os elementos cujo atributo data-lang bate com o idioma atual,
// comparando ignorando maiúsculas e minúsculas
function updateLanguage(lang) {
  // Define o atributo lang no elemento <html>
  document.documentElement.lang = lang;

  // Seleciona todos os elementos que possuem o atributo data-lang
  document.querySelectorAll('[data-lang]').forEach(el => {
    // Exibe somente os elementos cujo data-lang é igual ao idioma atual (ignorando case)
    el.style.display = (el.getAttribute('data-lang').toLowerCase() === lang.toLowerCase()) ? '' : 'none';
  });
}

// Executa ao carregar a página para aplicar o idioma correto automaticamente
const currentLang = getPreferredLanguage();
updateLanguage(currentLang);