const QWEN_API_KEY = typeof process !== 'undefined' ? process.env.QWEN_ACCESS_KEY_SECRET : null;

// ... [MANTER TODAS AS FUNÇÕES DE CÁLCULO ANTERIORES: aposentadoria_idade, auxilio_doenca, etc.] ...

export const gerar_reparo_qwen = async (dados_errados, erro) => {
  if (!QWEN_API_KEY) return { sugestao: "Modo reparo offline. Verifique os dados manualmente.", voz: 'fallback' };
  try {
    const res = await fetch('https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation', {
      method: 'POST', 
      headers: { 'Authorization': `Bearer ${QWEN_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        model: 'qwen-turbo', 
        input: { messages: [
          { role: 'system', content: 'Você é um especialista em validação de dados brasileiros. Analise o erro e sugira a correção mais provável em 1 frase curta.' },
          { role: 'user', content: `Dados: ${JSON.stringify(dados_errados)}. Erro: ${erro}. Qual a correção?` }
        ]} 
      })
    });
    const data = await res.json();
    return { sugestao: data.output?.text || "Erro desconhecido.", voz: 'qwen' };
  } catch (e) { return { sugestao: "Falha na IA de reparo.", voz: 'fallback' }; }
};

export const gerar_solucao_qwen = async (resultado, persona) => {
  if (!QWEN_API_KEY) return { acao: "Consulte um especialista para próximos passos.", voz: 'fallback' };
  try {
    const res = await fetch('https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation', {
      method: 'POST', 
      headers: { 'Authorization': `Bearer ${QWEN_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        model: 'qwen-turbo', 
        input: { messages: [
          { role: 'system', content: `Você é ${persona} do CalculeSorte. Baseado neste resultado, dê UMA ação prática e imediata em português brasileiro. Máximo 20 palavras.` },
          { role: 'user', content: JSON.stringify(resultado) }
        ]} 
      })
    });
    const data = await res.json();
    return { acao: data.output?.text || "Analise seu caso com cuidado.", voz: 'qwen' };
  } catch (e) { return { acao: "Solução indisponível no momento.", voz: 'fallback' }; }
};

export const formatar_qwen = (dados, persona) => {
  const vozes = { 
    jarvis: { p: 'Analisando previdência...', s: 'Dados oficiais INSS.' }, 
    cleiton: { p: 'Calculando direitos...', s: 'Base CLT atualizada.' }, 
    vitoria: { p: 'Diagnóstico financeiro...', s: 'Informação antes da venda é VENDA!' }, 
    fernanda: { p: 'Viabilidade empresarial...', s: 'Planejamento é lucro.' }, 
    claudia: { p: 'Avaliando carreira...', s: 'Educação abre portas.' } 
  };
  const c = vozes[persona];
  return { persona: persona.toUpperCase(), introducao: c.p, resultado: dados.mensagem, conclusao: c.s, dados };
};
