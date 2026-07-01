// ============================================================
// CALCULE SORTE · V6 · api.js
// Integração com o backend (Google Apps Script + Google Sheets).
// AINDA NÃO CONECTADO — esta é uma versão de espera.
// Quando o Apps Script estiver pronto, esta função vai enviar
// nome, whatsapp e data de nascimento para a planilha "Usuarios".
// ============================================================

// const URL_APPS_SCRIPT = "COLAR_AQUI_A_URL_DO_APPS_SCRIPT_QUANDO_PRONTO";

function salvarConsultaNoBackend(dadosUsuario, estado) {
  // Por enquanto, apenas registra no console para debug.
  // Será substituído por um fetch() real para o Google Apps Script.
  console.log("[api.js] Consulta registrada localmente (backend ainda não conectado):", {
    nome: dadosUsuario.nome,
    whats: dadosUsuario.whats,
    plano: estado.plano,
    rodadasUsadas: estado.rodadasUsadas
  });
}
