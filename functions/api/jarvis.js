import { aposentadoria_idade, auxilio_doenca, bpc_loas, formatar_qwen, gerar_voz_qwen, gerar_reparo_qwen, gerar_solucao_qwen } from '../../lib/rules.js';

export async function onRequestPost(context) {
  try {
    const body = await context.request.json();
    const { tipo_calculo, idade, sexo, tempo_contribuicao, salario_medio, carencia_meses, renda_familiar, pessoas_familia, deficiencia } = body;
    
    let r;
    if (tipo_calculo === 'aposentadoria') r = aposentadoria_idade(idade, sexo, tempo_contribuicao);
    else if (tipo_calculo === 'auxilio_doenca') r = auxilio_doenca(idade, salario_medio, carencia_meses);
    else if (tipo_calculo === 'bpc_loas') r = bpc_loas(idade, renda_familiar, pessoas_familia, deficiencia);
    else throw new Error('Tipo de cálculo inválido');
    
    const resp = formatar_qwen(r, 'jarvis');
    const voz = await gerar_voz_qwen(`${resp.introducao} ${resp.resultado} ${resp.conclusao}`, 'Jarvis');
    const solucao = await gerar_solucao_qwen(r, 'Jarvis');
    
    return new Response(JSON.stringify({ ...resp, voz, solucao }), { headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    // MODO REPARO AUTOMÁTICO
    const reparo = await gerar_reparo_qwen(await context.request.json(), e.message);
    return new Response(JSON.stringify({ error: e.message, reparo }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }
}
