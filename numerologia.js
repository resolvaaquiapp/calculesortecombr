// ============================================================
// CALCULE SORTE · V6 · numerologia.js
// Cálculos de numerologia, astrologia e índice de sorte
// a partir da data de nascimento e nome da pessoa.
// ============================================================

// ===== NUMEROLOGIA (NÚMERO PESSOAL) =====
function calcularNumerologia(dia, mes, ano, nome) {
  const soma = somarDigitos(`${dia}${mes}${ano}`);
  const numeroPessoal = reduzirNumero(soma);

  const significados = {
    1: "Liderança e iniciativa marcam seu caminho. Você tende a abrir novos ciclos.",
    2: "Sensibilidade e cooperação guiam suas escolhas. Parcerias trazem boas oportunidades.",
    3: "Comunicação e criatividade estão em alta. Momento favorável para se expressar.",
    4: "Estabilidade e organização sustentam seus planos. Construção sólida no presente ciclo.",
    5: "Mudança e liberdade pedem espaço. Boas chances em decisões ousadas.",
    6: "Harmonia e responsabilidade marcam suas relações. Cuidado com quem está à sua volta.",
    7: "Introspecção e busca por respostas profundas. Momento de confiar na intuição.",
    8: "Conquistas materiais e reconhecimento em destaque. Ciclo de colher resultados.",
    9: "Generosidade e visão ampla guiam este ciclo. Boas energias para recomeços.",
    11: "Intuição elevada e sensibilidade especial. Um número-mestre de inspiração.",
    22: "Potencial de grandes realizações práticas. Um número-mestre de construção."
  };

  return {
    valor: `Número ${numeroPessoal}`,
    texto: significados[numeroPessoal] || "Seu número pessoal revela um momento único em seu ciclo."
  };
}

function somarDigitos(texto) {
  return texto
    .replace(/\D/g, "")
    .split("")
    .reduce((acc, d) => acc + parseInt(d, 10), 0);
}

function reduzirNumero(num) {
  // Mantém números-mestre (11, 22) sem reduzir
  while (num > 9 && num !== 11 && num !== 22) {
    num = somarDigitos(String(num));
  }
  return num;
}

// ===== ASTROLOGIA (SIGNO SOLAR) =====
function calcularAstrologia(dia, mes) {
  const d = parseInt(dia, 10);
  const m = parseInt(mes, 10);

  const signos = [
    { nome: "Capricórnio", de: [12, 22], ate: [1, 19], texto: "Disciplina e foco em metas de longo prazo marcam seu momento." },
    { nome: "Aquário", de: [1, 20], ate: [2, 18], texto: "Originalidade e visão de futuro favorecem decisões fora do comum." },
    { nome: "Peixes", de: [2, 19], ate: [3, 20], texto: "Intuição em alta. Confie nos seus instintos neste período." },
    { nome: "Áries", de: [3, 21], ate: [4, 19], texto: "Energia e iniciativa abrem portas para novos começos." },
    { nome: "Touro", de: [4, 20], ate: [5, 20], texto: "Persistência e estabilidade trazem segurança nas suas escolhas." },
    { nome: "Gêmeos", de: [5, 21], ate: [6, 20], texto: "Comunicação favorecida. Bom momento para trocar ideias e negociar." },
    { nome: "Câncer", de: [6, 21], ate: [7, 22], texto: "Sensibilidade e cuidado com o lar e a família ganham destaque." },
    { nome: "Leão", de: [7, 23], ate: [8, 22], texto: "Confiança e brilho pessoal em alta. Momento de se destacar." },
    { nome: "Virgem", de: [8, 23], ate: [9, 22], texto: "Atenção aos detalhes traz resultados práticos e concretos." },
    { nome: "Libra", de: [9, 23], ate: [10, 22], texto: "Equilíbrio e parcerias favorecidas neste ciclo." },
    { nome: "Escorpião", de: [10, 23], ate: [11, 21], texto: "Intensidade e transformação marcam suas decisões." },
    { nome: "Sagitário", de: [11, 22], ate: [12, 21], texto: "Expansão e otimismo abrem caminho para novas oportunidades." }
  ];

  const signo = signos.find(s => {
    const [deM, deD] = s.de;
    const [ateM, ateD] = s.ate;
    if (deM === ateM) return m === deM && d >= deD && d <= ateD;
    if (deM > ateM) {
      // Signo que cruza a virada do ano (Capricórnio)
      return (m === deM && d >= deD) || (m === ateM && d <= ateD);
    }
    return (m === deM && d >= deD) || (m === ateM && d <= ateD) || (m > deM && m < ateM);
  });

  return {
    valor: signo ? signo.nome : "Seu signo",
    texto: signo ? signo.texto : "Seu mapa astral indica um momento particular para suas decisões."
  };
}

// ===== ÍNDICE DE SORTE =====
function calcularIndiceSorte(dia, mes, ano) {
  const numeroPessoal = reduzirNumero(somarDigitos(`${dia}${mes}${ano}`));
  const hoje = new Date();
  const diaDoAno = Math.floor((hoje - new Date(hoje.getFullYear(), 0, 0)) / 86400000);

  // Combina o número pessoal com o dia do ano atual para gerar variação a cada consulta
  const base = (numeroPessoal * 7 + diaDoAno) % 41;
  const indice = 55 + base; // intervalo aproximado: 55% a 95%

  let texto;
  if (indice >= 85) {
    texto = "Seu índice está bastante elevado hoje — ótimo momento para tentar a sorte.";
  } else if (indice >= 70) {
    texto = "Seu índice combina favoravelmente sua numerologia com o ciclo atual.";
  } else {
    texto = "Seu índice está em ciclo de equilíbrio. Bom momento para manter a constância.";
  }

  return { valor: Math.min(indice, 98), texto };
}

