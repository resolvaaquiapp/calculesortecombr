// Regras Claudia - Emprego e Qualificação
export const elegibilidade_cursos = (idade, escolaridade, renda) => {
  const cursos = [];
  if (idade >= 16 && escolaridade === 'medio') cursos.push('Tecnico PRONATEC');
  if (renda < 3000) cursos.push('Bolsa ProUni');
  return { modulo: 'cursos', cursos, mensagem: `${cursos.length} curso(s) disponivel(is).` };
};

export const sine_vagas = (cargo, cidade) => ({ modulo: 'vagas', vagas: 3, mensagem: `3 vagas para ${cargo} em ${cidade}.` });
