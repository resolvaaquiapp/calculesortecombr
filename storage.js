// ============================================================
// CALCULE SORTE · V6 · storage.js
// Controle de plano e rodadas do usuário.
// Versão inicial: guarda o estado no navegador (localStorage)
// para já funcionar de ponta a ponta enquanto a integração
// completa com Google Sheets (via api.js) ainda está em construção.
// Quando a integração real estiver pronta, estas funções vão
// passar a ler/escrever na planilha em vez do localStorage.
// ============================================================

const CHAVE_STORAGE = "calculesorte_estado_v6";

const PLANOS = {
  free:    { nome: "Plano Free",    limite: 30, jogosPorRodada: 1 },
  bonus:   { nome: "Plano Bônus",   limite: 50, jogosPorRodada: 3 },
  bonus2:  { nome: "Plano Bônus",   limite: 70, jogosPorRodada: 4 },
  expert:  { nome: "Plano Expert",  limite: Infinity, jogosPorRodada: 5 }
};

function obterEstadoBruto() {
  try {
    const dados = localStorage.getItem(CHAVE_STORAGE);
    if (dados) return JSON.parse(dados);
  } catch (e) {
    // localStorage indisponível; segue com estado padrão
  }
  return { plano: "free", rodadasUsadas: 0, dataInicio: new Date().toISOString() };
}

function salvarEstadoBruto(estado) {
  try {
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(estado));
  } catch (e) {
    // Se não conseguir salvar, a sessão simplesmente não persiste
  }
}

function obterStatusPlano() {
  const estado = obterEstadoBruto();
  const config = PLANOS[estado.plano] || PLANOS.free;
  const rodadasRestantes = config.limite === Infinity
    ? Infinity
    : Math.max(0, config.limite - estado.rodadasUsadas);

  return {
    nomePlano: config.nome,
    rodadasUsadas: estado.rodadasUsadas,
    rodadasLimite: config.limite === Infinity ? "∞" : config.limite,
    rodadasRestantes: rodadasRestantes,
    jogosPorRodada: config.jogosPorRodada
  };
}

function consumirRodada(dadosUsuario) {
  const estado = obterEstadoBruto();
  estado.rodadasUsadas += 1;
  estado.ultimoNome = dadosUsuario.nome;
  estado.ultimoWhats = dadosUsuario.whats;
  salvarEstadoBruto(estado);
  atualizarBarraStatusPlano();

  // Envia para o backend (Google Apps Script) quando api.js estiver pronto
  if (typeof salvarConsultaNoBackend === "function") {
    salvarConsultaNoBackend(dadosUsuario, estado);
  }
}

