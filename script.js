// ============================================================
// CALCULE SORTE · V6 · script.js
// Orquestra a interface: preenchimento de campos, navegação
// entre telas, e o fluxo principal de cálculo.
// As funções de cálculo real (numerologia, astrologia, mega-sena)
// vivem em numerologia.js e megasena.js — este arquivo só comanda.
// ============================================================

// ===== INICIALIZAÇÃO =====
document.addEventListener("DOMContentLoaded", () => {
  preencherSelectDia();
  preencherSelectAno();
  atualizarBarraStatusPlano();
});

// ===== PREENCHIMENTO AUTOMÁTICO DE DIA =====
function preencherSelectDia() {
  const selectDia = document.getElementById("select-dia");
  if (!selectDia) return;
  for (let d = 1; d <= 31; d++) {
    const v = d < 10 ? "0" + d : "" + d;
    selectDia.add(new Option(v, v));
  }
}

// ===== PREENCHIMENTO AUTOMÁTICO DE ANO =====
function preencherSelectAno() {
  const selectAno = document.getElementById("select-ano");
  if (!selectAno) return;
  const anoAtual = new Date().getFullYear();
  for (let a = anoAtual; a >= 1900; a--) {
    selectAno.add(new Option(a, a));
  }
}

// ===== VALIDAÇÃO DO FORMULÁRIO =====
function validarFormulario() {
  const nome = document.getElementById("input-nome").value.trim();
  const dia = document.getElementById("select-dia").value;
  const mes = document.getElementById("select-mes").value;
  const ano = document.getElementById("select-ano").value;
  const whats = document.getElementById("input-whats").value.trim();
  const erro = document.getElementById("erro-formulario");

  erro.classList.remove("show");

  if (!nome) {
    erro.textContent = "Por favor, preencha seu nome completo.";
    erro.classList.add("show");
    return null;
  }
  if (!dia || !mes || !ano) {
    erro.textContent = "Por favor, selecione dia, mês e ano de nascimento.";
    erro.classList.add("show");
    return null;
  }
  if (!whats || whats.length < 10) {
    erro.textContent = "Por favor, preencha um WhatsApp válido com DDD.";
    erro.classList.add("show");
    return null;
  }

  return { nome, dia, mes, ano, whats };
}

// ===== FLUXO PRINCIPAL: PROCESSAR CÁLCULO =====
async function processarCalculoSorte() {
  const dados = validarFormulario();
  if (!dados) return;

  // Verifica se ainda há rodadas disponíveis antes de processar
  const statusPlano = obterStatusPlano();
  if (statusPlano.rodadasRestantes <= 0) {
    mostrarTelaPlanos();
    return;
  }

  document.getElementById("tela-formulario").classList.add("hidden");
  document.getElementById("tela-carregamento").style.display = "block";

  // Pequeno atraso visual para a tela de carregamento (sensação de "processamento")
  await new Promise(resolve => setTimeout(resolve, 1800));

  // ----- Cálculos reais (definidos em numerologia.js / megasena.js) -----
  const resultadoNumerologia = calcularNumerologia(dados.dia, dados.mes, dados.ano, dados.nome);
  const resultadoAstrologia = calcularAstrologia(dados.dia, dados.mes);
  const indiceSorte = calcularIndiceSorte(dados.dia, dados.mes, dados.ano);

  const jogosPorRodada = statusPlano.jogosPorRodada || 1;
  const jogosGerados = await gerarJogosMegaSena(dados.dia, dados.mes, dados.ano, jogosPorRodada);

  // ----- Preenche a tela de resultado -----
  exibirResultado({
    indiceSorte,
    numerologia: resultadoNumerologia,
    astrologia: resultadoAstrologia,
    jogos: jogosGerados
  });

  // ----- Consome uma rodada e salva no backend -----
  consumirRodada(dados);

  document.getElementById("tela-carregamento").style.display = "none";
  document.getElementById("tela-resultado").style.display = "block";
}

// ===== EXIBIÇÃO DO RESULTADO =====
function exibirResultado({ indiceSorte, numerologia, astrologia, jogos }) {
  document.getElementById("valor-indice-sorte").textContent = indiceSorte.valor + "%";
  document.getElementById("texto-indice-sorte").textContent = indiceSorte.texto;

  document.getElementById("valor-numerologia").textContent = numerologia.valor;
  document.getElementById("texto-numerologia").textContent = numerologia.texto;

  document.getElementById("valor-astrologia").textContent = astrologia.valor;
  document.getElementById("texto-astrologia").textContent = astrologia.texto;

  const container = document.getElementById("container-jogos-gerados");
  container.innerHTML = jogos.map(jogo => {
    const bolinhas = jogo.map(n =>
      `<div class="bola-dezena">${String(n).padStart(2, "0")}</div>`
    ).join("");
    return `<div class="linha-jogo">${bolinhas}</div>`;
  }).join("");

  const statusPlano = obterStatusPlano();
  document.getElementById("rodadas-usadas").textContent = statusPlano.rodadasUsadas;
  document.getElementById("rodadas-limite").textContent = statusPlano.rodadasLimite;
}

// ===== NAVEGAÇÃO ENTRE TELAS =====
function voltarParaInicio() {
  document.getElementById("tela-resultado").style.display = "none";
  document.getElementById("tela-planos").style.display = "none";
  document.getElementById("tela-formulario").classList.remove("hidden");
}

function mostrarTelaPlanos() {
  document.getElementById("tela-formulario").classList.add("hidden");
  document.getElementById("tela-resultado").style.display = "none";
  document.getElementById("tela-planos").style.display = "block";
}

// ===== BARRA DE STATUS DO PLANO =====
function atualizarBarraStatusPlano() {
  const status = obterStatusPlano();
  document.getElementById("tag-plano").textContent = status.nomePlano;
  document.getElementById("rodadas-disponiveis").textContent = status.rodadasRestantes;
}

// ===== MODAIS JURÍDICOS =====
function abrirModalJuridico(tipo) {
  const titulo = document.getElementById("titulo-juridico");
  const texto = document.getElementById("texto-juridico");
  const janela = document.getElementById("janela-juridica");

  if (tipo === "termos") {
    titulo.innerText = "Termos de Uso";
    texto.innerText = "Estes são os termos de uso do site Calcule Sorte. Ao utilizar nossos serviços, você concorda em jogar de forma responsável. Nossos cálculos baseiam-se em numerologia, astrologia e probabilidades matemáticas e estatísticas públicas.";
  } else if (tipo === "privacidade") {
    titulo.innerText = "Políticas de Privacidade";
    texto.innerText = "Sua privacidade é importante para nós. Os dados preenchidos como Nome, Data de Nascimento e WhatsApp são utilizados estritamente para a geração das suas dezenas da sorte e personalização da experiência.";
  } else if (tipo === "aviso") {
    titulo.innerText = "Aviso Legal";
    texto.innerText = "O Calcule Sorte é uma ferramenta de entretenimento baseada em numerologia, astrologia e estatística. Não garantimos resultados em loterias. Jogue com responsabilidade.";
  }

  janela.style.display = "flex";
}

function fecharModalJuridico() {
  document.getElementById("janela-juridica").style.display = "none";
}

// Inicializa o modal jurídico como fechado ao carregar a página
window.addEventListener("load", () => {
  fecharModalJuridico();
});
