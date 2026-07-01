// Substitua o link abaixo pela sua URL real do Google (ela deve ficar exatamente aqui)
const URL_APPS_SCRIPT = "https://script.google.com/macros/s/AKfycbw3RixJ_mq2W-Ro9YZbEeGJZdOV8VkKq-ZpXg4frqLDuFuymCoHKx1UhIEYtMz3wqV-/exec";

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
    // Envia as informações em modo "no-cors" para o navegador não bloquear o envio
  fetch(URL_APPS_SCRIPT, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    },
    body: JSON.stringify(payload)
  })
  .then(() => {
    // Como usamos "no-cors", assumimos que o envio foi feito com sucesso (Status 200)
    console.log("[api.js] Dados transmitidos com sucesso para a planilha!");
  })
  .catch(erro => {
    console.error("[api.js] Erro crítico ao disparar requisição:", erro);
  });
}


