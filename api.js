// Substitua o link abaixo pela sua URL real do Google (ela deve ficar exatamente aqui)
const URL_APPS_SCRIPT = "https://script.google.com/macros/s/AKfycbw1zA9We9Y6J-keatb3OPYCRkLkPDHJ2GhFZ1Tsje_fV5g5nvUvvbcmnGVHJbI2L-ba/exec";

function salvarConsultaNoBackend(dadosUsuario, estado) {
  // Se a URL estiver vazia ou não configurada, interrompe
  if (!URL_APPS_SCRIPT || URL_APPS_SCRIPT === "") {
    console.log("[api.js] URL do Apps Script não configurada.");
    return;
  }

  // Prepara o pacote de dados exatamente como a planilha espera receber
  const payload = {
    nome: dadosUsuario.nome,
    whats: dadosUsuario.whats,
    plano: estado.plano,
    rodadasUsadas: estado.rodadasUsadas
  };
  // Envia as informações em segundo plano para o Google Sheets
  fetch(URL_APPS_SCRIPT, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    },
    body: JSON.stringify(payload)
  })
  .then(resposta => {
    console.log("[api.js] Dados enviados com sucesso para a planilha!");
  })
  .catch(erro => {
    console.error("[api.js] Erro ao conectar com o servidor Google:", erro);
  });
}
