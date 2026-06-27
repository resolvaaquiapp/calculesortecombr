// ============================================================
// CALCULE SORTE · V6 · megasena.js
// Geração de jogos da Mega-Sena combinando data de nascimento
// com (futuramente) estatísticas reais da Caixa.
// Versão inicial: gera jogos válidos com semente pessoal.
// A integração completa com api.js (dados reais da Caixa) e o
// módulo de frequências será adicionada na próxima etapa.
// ============================================================

async function gerarJogosMegaSena(dia, mes, ano, quantidade) {
  const jogos = [];
  for (let i = 0; i < quantidade; i++) {
    jogos.push(gerarUmJogo(dia, mes, ano, i));
  }
  return jogos;
}

function gerarUmJogo(dia, mes, ano, indice) {
  const semente = numSeed(dia, mes, ano, indice);
  const rng = seededRandom(semente);

  const numeros = new Set();
  while (numeros.size < 6) {
    const n = Math.floor(rng() * 60) + 1;
    numeros.add(n);
  }

  return Array.from(numeros).sort((a, b) => a - b);
}

function numSeed(dia, mes, ano, idx) {
  const d = parseInt(dia, 10);
  const m = parseInt(mes, 10);
  const a = parseInt(ano, 10);
  return d * 1000000 + m * 10000 + a + idx * 137;
}

function seededRandom(seed) {
  let s = seed;
  return function () {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 4294967296;
  };
}

