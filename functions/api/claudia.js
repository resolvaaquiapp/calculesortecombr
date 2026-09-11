import { elegibilidade_cursos, sine_vagas } from '../../lib/claudia-rules.js';
import { formatar_qwen, gerar_voz_qwen } from '../../lib/rules-shared.js';

// Claudia - Especialista em Emprego e Qualificação
const SYSTEM_PROMPT = `Você é a CLAUDIA, especialista em emprego e qualificação do Calcule Sorte.
SEU PAPEL: Mostrar que sempre tem oportunidade, mesmo sem diploma fancy. Você fala de emprego, cursos, qualificação e portfólio.
TOM DE VOZ: Incentivadora, realista, como mãe que acredita no filho. Sem romantismo, mas com fé.
REGRA DE OURO (PERGUNTA 000): NUNCA comece com triagem. SEMPRE inicie assim: "Qual seu nome? [Nome], que tipo de trabalho você gostaria de fazer? Qual seu sonho?"
Aguarde a resposta completa antes de prosseguir. Use o nome da pessoa em TODAS as respostas.
REGRAS:
- Responda em português simples. Máximo 4 frases por vez.
- Fale em linguagem do povo: "qualificação" é "aprender algo novo", "portfólio" é "mostrar o que você sabe fazer", "oportunidade" é "um trampo".
- NUNCA use termos como "competências", "roadmap de carreira", "networking corporativo".
- Se a dúvida for sobre financeiro ou empreendedorismo, redirecione gentilmente ao VITÓRIA ou FERNANDA.
- Sempre reconheça o esforço, a luta. Desemprego machuca, e você sabe disso.`;

const rateLimitMap = new Map();
const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 60 * 1000;

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now - entry.windowStart > RATE_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, windowStart: now });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count += 1;
  return true;
}

export async function onRequestPost(context) {
  const { request, env } = context;
  
  try {
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    if (!checkRateLimit(ip)) {
      return jsonResponse({ error: 'Muitas perguntas, querida. Aguarde um minuto.' }, 429);
    }

    const body = await request.json().catch(() => null);
    const messages = body?.messages || [];
    
    if (!env.QWEN_API_KEY) {
      console.error('Claudia Error: QWEN_API_KEY missing');
      return jsonResponse({ error: 'Sistema em manutenção. Tente mais tarde.' }, 500);
    }

    const apiRes = await fetch('https://dashscope-intl.aliyuncs.com/api/v1/services/aigc/text-generation/generation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.QWEN_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'qwen-turbo',
        input: {
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...messages.map(m => ({ role: m.role, content: m.content }))
          ]
        },
        parameters: {
          max_tokens: 800,
          temperature: 0.7,
          top_p: 0.8
        }
      }),
    });

    if (!apiRes.ok) {
      const errText = await apiRes.text().catch(() => '');
      console.error('Qwen API Error:', apiRes.status, errText);
      
      if (apiRes.status === 401) {
        return jsonResponse({ error: 'Chave de acesso inválida. Contate o administrador.' }, 500);
      }
      if (apiRes.status === 429) {
        return jsonResponse({ error: 'Serviço temporariamente indisponível. Tente novamente em instantes.' }, 429);
      }
      
      throw new Error(`Qwen API returned ${apiRes.status}`);
    }
    
    const data = await apiRes.json();
    const answer = data.output?.text || 'Não consegui processar agora.';

    return jsonResponse({ reply: answer });

  } catch (err) {
    console.error('Claudia Runtime Error:', err);
    return jsonResponse({ error: 'Erro no sistema. Tente novamente.' }, 500);
  }
}

function jsonResponse(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
}
