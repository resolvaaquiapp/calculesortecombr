// ============================================================
// CALCULE SORTE · V6 · Integração Frontend (api.js)
// ============================================================

const URL_APPS_SCRIPT = "https://script.google.com/macros/s/AKfycbwPzsVi-NDf48d3yIpaIvLcxXg-m8BjmVWMOcbTCrAFyK6xmOXmD7tO_2eDdI6sYkZG/exec";

function salvarConsultaNoBackend(dadosUsuario, estado) {
  // Se a URL estiver vazia ou não configurada, interrompe
  if (!URL_APPS_SCRIPT || URL_APPS_SCRIPT === "") {
    console.log("[api.js] URL do Apps Script não configurada.");
    return;
  }

  const payload = {
    nome: dadosUsuario.nome,
    whats: dadosUsuario.whats,
    dia: dadosUsuario.dia,
    mes: dadosUsuario.mes,
    ano: dadosUsuario.ano,
    plano: estado.plano,
    rodadasUsadas: estado.rodadasUsadas
  };

  // Envia como text/plain com no-cors para evitar bloqueios de segurança do navegador
  fetch(URL_APPS_SCRIPT, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "text/plain"
    },
    body: JSON.stringify(payload)
  })
  .then(() => {
    // Modo no-cors assume sucesso na transmissão inicial
    console.log("[api.js] Dados transmitidos com sucesso para a planilha!");
  })
  .catch(erro => {
    console.error("[api.js] Erro crítico ao disparar requisição:", erro);
  });
}
