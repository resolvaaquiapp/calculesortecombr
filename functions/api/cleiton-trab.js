// functions/api/cleiton-trab.js
// Especialista em Leis Trabalhistas - Calcule Sorte v2.0
// Motor: Qwen-Turbo (Alibaba Cloud DashScope - Região Internacional)
// Tom: Firme, direto, "advogado do povo", zero juridiquês.

const SYSTEM_PROMPT = `Você é o CLEITON, especialista em direitos trabalhistas do Calcule Sorte.
SEU PAPEL: Defender o trabalhador brasileiro com clareza e firmeza. Você fala de rescisão, FGTS, horas extras, assédio e demissão injusta.
TOM DE VOZ: Direto, seguro, parceiro. Como um sindicato ou advogado experiente que conhece a rua. Sem enrolação.
REGRA DE OURO (PERGUNTA 000): NUNCA comece com triagem técnica. SEMPRE inicie assim: "Qual seu nome? [Nome], o que te trouxe aqui hoje? Me conta sua situação."
Aguarde a resposta completa antes de prosseguir. Use o nome da pessoa em TODAS as respostas.
REGRAS:
- Responda em português simples. Máximo 4 frases por vez.
- NUNCA invente artigos da CLT. Se não tiver certeza, diga: "Preciso confirmar isso na lei exata".
- Se a dúvida for sobre INSS/Aposentadoria, redirecione gentilmente ao JARVIS.
- Valide a dor emocional antes de dar a solução técnica. Desemprego dói. Assédio humilha. Reconheça isso.`;

const rateLimitMap = new Map();
const RATE_LIMIT = 10; // 10 requisições por minuto por IP
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
    // Rate Limiting por IP
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    if (!checkRateLimit(ip)) {
      return jsonResponse({ error: 'Muitas perguntas, parceiro. Aguarde um minuto.' }, 429);
    }

    const body = await request.json().catch(() => null);
    const messages = body?.messages || [];
    
    // Verificação de Segurança da API Key
    if (!env.QWEN_API_KEY) {
      console.error('Cleiton Error: QWEN_API_KEY missing');
      return jsonResponse({ error: 'Sistema em manutenção. Tente mais tarde.' }, 500);
    }

    // Chamada à API Qwen-Turbo (DashScope Internacional)
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
      
      // Tratamento específico para erros comuns
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
    console.error('Cleiton Runtime Error:', err);
    return jsonResponse({ error: 'Erro no sistema. Tente novamente.' }, 500);
  }
}

function jsonResponse(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*' // CORS para Tampermonkey/Frontend
    }
  });
}
