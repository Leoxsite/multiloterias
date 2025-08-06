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

// Ajustado para aceitar incluirZero e gerar números únicos conforme regra
function gerarNumerosUnicos(quantidade, maximo, usarDigitoSimples, incluirZero = false) {
  if (usarDigitoSimples === undefined) usarDigitoSimples = false;
  const numeros = new Set();
  while (numeros.size < quantidade) {
    let numero;
    if (usarDigitoSimples) {
      numero = Math.floor(Math.random() * 9) + 1;
    } else {
      if (incluirZero) {
        numero = Math.floor(Math.random() * (maximo + 1)); // inclui zero
      } else {
        numero = Math.floor(Math.random() * maximo) + 1;
      }
    }
    numeros.add(numero);
  }
  return Array.from(numeros);
}

const somEstrela = new Audio('sons/estrela.mp3');

function criarBolaComAnimacao(container, numero, dourada = false) {
  return new Promise(function(resolve) {
    const bola = document.createElement('div');
    bola.className = 'bola';
    bola.style.width = '150px';
    bola.style.height = '150px';
    bola.style.borderRadius = '50%';
    bola.style.margin = '0 3px';
    bola.style.display = 'flex';
    bola.style.alignItems = 'center';
    bola.style.justifyContent = 'center';
    bola.style.fontSize = '48px';
    bola.style.fontWeight = 'bold';
    bola.style.transform = 'rotateY(0deg) rotateX(0deg)';
    bola.style.backfaceVisibility = 'hidden';
    bola.style.position = 'relative';
    bola.style.perspective = '1000px';

    if (dourada) {
      bola.style.background = 'radial-gradient(circle at 30% 30%, #FFD700, #FFA500)';
      bola.style.color = 'black';
      bola.style.boxShadow = '0 0 30px 6px rgba(255, 215, 0, 0.95)';
    } else {
      bola.style.background = 'radial-gradient(circle at 30% 30%, #fff, #bbb 60%, #888 90%)';
      bola.style.color = '#222';
      bola.style.boxShadow = '0 0 26px rgba(0, 0, 0, 0.3)';
    }

    container.appendChild(bola);

    const numeroTexto = document.createElement('div');
    numeroTexto.textContent = '';
    numeroTexto.style.transition = 'opacity 0.2s';
    numeroTexto.style.opacity = '0';
    bola.appendChild(numeroTexto);

    setTimeout(function() {
      setTimeout(function() {
        numeroTexto.textContent = formatarNumero(numero);
        numeroTexto.style.opacity = '1';

        somEstrela.currentTime = 0;
        somEstrela.play();
        animarEstrelas(bola);

        resolve();
      }, 300);
    }, 100);
  });
}

function animarEstrelas(bola) {
  for (let i = 0; i < 7; i++) {
    const estrela = document.createElement('div');
    estrela.className = 'estrela';
    bola.appendChild(estrela);

    const angulo = Math.random() * 2 * Math.PI;
    const distancia = 60 + Math.random() * 40;
    const direcaoX = Math.cos(angulo) * distancia;
    const direcaoY = Math.sin(angulo) * distancia;
    const duracao = 800 + Math.random() * 300;
    const inicio = performance.now();

    function animar(timestamp) {
      const tempo = timestamp - inicio;
      const progresso = Math.min(tempo / duracao, 1);
      const easeOut = 1 - Math.pow(1 - progresso, 2);

      const movimentoX = direcaoX * easeOut;
      const movimentoY = direcaoY * easeOut;
      const escala = 1 - progresso * 0.8;
      const opacidade = 1 - progresso;

      estrela.style.transform = `translate(calc(-50% + ${movimentoX}px), calc(-50% + ${movimentoY}px)) scale(${escala})`;
      estrela.style.opacity = opacidade;

      if (progresso < 1) {
        requestAnimationFrame(animar);
      } else {
        estrela.remove();
      }
    }

    requestAnimationFrame(animar);
  }
}

async function sortearNumeros(jogoId, quantidadePrincipal, maximoPrincipal, quantidadeExtra, maximoExtra, usarDigitoSimples, incluirZero) {
  if (quantidadeExtra === undefined) quantidadeExtra = 0;
  if (maximoExtra === undefined) maximoExtra = 0;
  if (usarDigitoSimples === undefined) usarDigitoSimples = false;
  if (incluirZero === undefined) incluirZero = false;

  const container = document.querySelector('#' + jogoId + ' .resultado-bolas');
  container.innerHTML = '';

  let numerosPrincipais = gerarNumerosUnicos(quantidadePrincipal, maximoPrincipal, usarDigitoSimples, incluirZero);
  numerosPrincipais = numerosPrincipais.sort(function() {
    return Math.random() - 0.5;
  });

  let numerosExtras = [];
  if (quantidadeExtra > 0 && maximoExtra > 0) {
    numerosExtras = gerarNumerosUnicos(quantidadeExtra, maximoExtra);
    numerosExtras = numerosExtras.sort(function() {
      return Math.random() - 0.5;
    });
  }

  for (let i = 0; i < numerosPrincipais.length; i++) {
    await criarBolaComAnimacao(container, numerosPrincipais[i]);
    await esperar(700);
  }

  if (numerosExtras.length > 0) {
    const separadorVisual = document.createElement('div');
    separadorVisual.style.width = '12px';
    container.appendChild(separadorVisual);

    for (let i = 0; i < numerosExtras.length; i++) {
      const dourada = (jogoId === 'eurojackpot' && i >= numerosExtras.length - 2);
      await criarBolaComAnimacao(container, numerosExtras[i], dourada);
      await esperar(700);
    }
  }
}

async function sortearDuplaSena(jogoId) {
  const container = document.querySelector('#' + jogoId + ' .resultado-bolas');
  container.innerHTML = '';

  const sorteios = [gerarNumerosUnicos(6, 50), gerarNumerosUnicos(6, 50)];

  for (let idx = 0; idx < sorteios.length; idx++) {
    const divSorteio = document.createElement('div');
    divSorteio.style.display = 'flex';
    divSorteio.style.marginBottom = '10px';
    container.appendChild(divSorteio);

    for (const numero of sorteios[idx]) {
      await criarBolaComAnimacao(divSorteio, numero);
      await esperar(600); // Aumenta o tempo para a animação ficar visível
    }

    await esperar(200); // Pequena pausa entre as duas linhas
  }
}

function sortearMilionaria() {
  const container = document.querySelector('#milionaria .resultado-bolas');
  container.innerHTML = '';

  const numerosPrincipais = gerarNumerosUnicos(6, 50);
  const trevos = gerarNumerosUnicos(2, 6);

  const todasAsBolas = [...numerosPrincipais, ...trevos];

  todasAsBolas.forEach((numero, index) => {
    const bola = document.createElement('div');
    bola.classList.add('bola');
    if (index >= 6) bola.classList.add('trevo'); // As duas últimas são "trevos"
    bola.textContent = formatarNumero(numero);
    container.appendChild(bola);
  });
}


async function sortearLotofacil(jogoId) {
  const container = document.querySelector('#' + jogoId + ' .resultado-bolas');
  container.innerHTML = '';

  let numeros = gerarNumerosUnicos(15, 25);
  numeros = numeros.sort(() => Math.random() - 0.5);

  // Cria as 3 linhas primeiro e adiciona no container
  const linhasDivs = [];
  for (let linha = 0; linha < 3; linha++) {
    const linhaDiv = document.createElement('div');
    linhaDiv.style.display = 'flex';
    linhaDiv.style.justifyContent = 'center';
    linhaDiv.style.marginBottom = '5px';
    container.appendChild(linhaDiv);
    linhasDivs.push(linhaDiv);
  }

  // Agora cria as bolas para cada linha, aguardando animação sequencial
  for (let linha = 0; linha < 3; linha++) {
    for (let i = linha * 5; i < linha * 5 + 5; i++) {
      await criarBolaComAnimacao(linhasDivs[linha], numeros[i]);
      await esperar(600);
    }
  }
}




document.addEventListener('DOMContentLoaded', function() {
  const botoesSortear = document.querySelectorAll('.btn-sortear');
  botoesSortear.forEach(function(botao) {
    botao.addEventListener('click', async function() {
      if (botao.disabled) return;
      botao.disabled = true;

      const blocoJogo = botao.closest('.linha-jogo') || botao.closest('.jogo-bloco');
      if (!blocoJogo) {
        botao.disabled = false;
        return;
      }

      const idJogo = blocoJogo.id;

      switch (idJogo) {
  case 'euromillones':
    await sortearNumeros(idJogo, 5, 50, 2, 12);
    break; 

  case 'eurojackpot':
    await sortearNumeros(idJogo, 5, 50, 2, 12); 
    break;


  case 'eurodreams':
    await sortearNumeros(idJogo, 6, 40, 1, 5); 
    break;

  case 'bonoloto':
    await sortearNumeros(idJogo, 6, 49); 
    break;

  case 'la-primitiva':
    await sortearNumeros(idJogo, 6, 49); 
    break;

  case 'lototurf':
    await sortearNumeros(idJogo, 6, 31, 2, 12); 
    break;

  case 'super-once':
    await sortearNumeros(idJogo, 11, 80); 
    break;

  case 'la-6-49-de-catalunya':
    await sortearNumeros(idJogo, 6, 49); 
    break;

  case 'la-grossa-del-divendres-de-catalunya':
    await sortearNumeros(idJogo, 5, 54); 
    break;

  

  

  default:
    await sortearNumeros(idJogo, 6, 49);

    
}

// Ativa novamente o botão após o sorteio
botao.disabled = false;




    });
  });
});

