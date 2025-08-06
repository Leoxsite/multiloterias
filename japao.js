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

function gerarNumerosUnicos(quantidade, maximo, usarDigitoSimples) {
  if (usarDigitoSimples === undefined) {
    usarDigitoSimples = false;
  }
  const numeros = new Set();
  while (numeros.size < quantidade) {
    let numero;
    if (usarDigitoSimples) {
      numero = Math.floor(Math.random() * 9) + 1;
    } else {
      numero = Math.floor(Math.random() * maximo) + 1;
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
    bola.style.margin = '0 3px'; // Espaçamento igual para todas
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
      bola.style.boxShadow = '0 0 30px 6px rgba(255, 215, 0, 0.95)'; // Contorno reforçado
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

async function sortearNumeros(jogoId, quantidadePrincipal, maximoPrincipal, quantidadeExtra, maximoExtra, usarDigitoSimplesGluck) {
  if (quantidadeExtra === undefined) {
    quantidadeExtra = 0;
  }
  if (maximoExtra === undefined) {
    maximoExtra = 0;
  }
  if (usarDigitoSimplesGluck === undefined) {
    usarDigitoSimplesGluck = false;
  }

  const container = document.querySelector('#' + jogoId + ' .resultado-bolas');
  container.innerHTML = '';

  let numerosPrincipais = gerarNumerosUnicos(quantidadePrincipal, maximoPrincipal, usarDigitoSimplesGluck);
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

async function sortearDigits(jogoId, quantidadeDigitos) {
  const container = document.querySelector('#' + jogoId + ' .resultado-bolas');
  container.innerHTML = '';

  const digitos = [];
  for (let i = 0; i < quantidadeDigitos; i++) {
    const digito = Math.floor(Math.random() * 10); // 0–9
    digitos.push(digito);
  }

  for (let i = 0; i < digitos.length; i++) {
    await criarBolaComAnimacao(container, digitos[i]);
    await esperar(700);
  }
}


document.addEventListener('DOMContentLoaded', function() {
  const botoesSortear = document.querySelectorAll('.btn-sortear');
  botoesSortear.forEach(function(botao) {
    botao.addEventListener('click', async function() {
      if (botao.disabled) {
        return;
      }
      botao.disabled = false;

      const blocoJogo = botao.closest('.linha-jogo') || botao.closest('.jogo-bloco');
      if (!blocoJogo) {
        botao.disabled = false;
        return;
      }

      const idJogo = blocoJogo.id;

  switch (idJogo) {
  case 'loto-7-jp':
    // 7 números de 1 a 37, sem bola extra
    await sortearNumeros(idJogo, 7, 37);
    break;

  case 'loto-6-jp':
    // 6 números de 1 a 43, sem bola extra
    await sortearNumeros(idJogo, 6, 43);
    break;

  case 'mini-loto-jp':
    // 5 números de 1 a 31, sem bola extra
    await sortearNumeros(idJogo, 5, 31);
    break;

  case 'bingo-5-jp':
    await sortearNumeros(idJogo, 8, 40); // ✅ 8 números (1–40) — conforme regra real do Japão
    break;

  case 'numbers-3-jp':
    // 3 dígitos de 0 a 9
    await sortearDigits(idJogo, 3);
    break;

  case 'numbers-4-jp':
    // 4 dígitos de 0 a 9
    await sortearDigits(idJogo, 4);
    break;

  default:
    // Fallback padrão: 6 números de 1 a 49
    await sortearNumeros(idJogo, 6, 49);
}

// Ativa novamente o botão após o sorteio
botao.disabled = false;


    });
  });
});

