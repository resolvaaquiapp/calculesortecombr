// functions/api/email.js
// Serviço de Envio de Email - Integrado com SendGrid

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const body = await request.json().catch(() => null);
    const { to_email, subject, nome, especialista, mensagens } = body;

    if (!to_email || !nome || !especialista || !mensagens) {
      return jsonResponse({ error: 'Dados incompletos' }, 400);
    }

    if (!env.SENDGRID_API_KEY) {
      console.warn('SENDGRID_API_KEY não configurada - email não será enviado');
      return jsonResponse({ success: true, warning: 'Email não enviado (API não configurada)' });
    }

    const htmlContent = gerarHTMLTicket(nome, especialista, mensagens);

    const sgResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: to_email, name: nome }],
            subject: subject || `Seu Ticket CalculeSorte - ${especialista}`
          }
        ],
        from: {
          email: 'noreply@calculesorte.com.br',
          name: 'CalculeSorte'
        },
        content: [
          {
            type: 'text/html',
            value: htmlContent
          }
        ]
      })
    });

    if (!sgResponse.ok) {
      const error = await sgResponse.text();
      console.error('SendGrid Error:', error);
      return jsonResponse({ error: 'Erro ao enviar email' }, 500);
    }

    return jsonResponse({ success: true, message: 'Email enviado com sucesso!' });

  } catch (err) {
    console.error('Email Service Error:', err);
    return jsonResponse({ error: err.message }, 500);
  }
}

function gerarHTMLTicket(nome, especialista, mensagens) {
  const dataAtual = new Date().toLocaleString('pt-BR');
  const ticketID = `#CS-${Date.now()}`;

  let conversaHTML = '';
  if (Array.isArray(mensagens)) {
    conversaHTML = mensagens.map((msg, i) => `
      <div style='margin: 10px 0; padding: 12px; background: ${msg.role === 'user' ? '#e3f2fd' : '#fff3e0'}; border-radius: 5px; border-left: 4px solid ${msg.role === 'user' ? '#2196f3' : '#ff9800'};'>
        <strong>${msg.role === 'user' ? 'Você' : especialista}:</strong>
        <p style='margin: 5px 0; color: #333;'>${msg.content}</p>
      </div>
    `).join('');
  }

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset='UTF-8'>
      <style>
        body { font-family: Arial, sans-serif; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #ff006e 0%, #8338ec 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0; text-align: center; }
        .header h1 { margin: 0; font-size: 1.8rem; }
        .info-box { background: #f5f5f5; padding: 15px; margin: 0; border-radius: 0 0 0 0; }
        .info-row { margin: 8px 0; }
        .conversa { background: white; padding: 15px; border: 1px solid #ddd; margin: 20px 0; border-radius: 8px; }
        .footer { background: #ffd60a; padding: 15px; text-align: center; border-radius: 0 0 10px 10px; color: #000; }
        .footer p { margin: 0; font-weight: bold; }
        a { color: #ff006e; text-decoration: none; }
      </style>
    </head>
    <body>
      <div class='container'>
        <div class='header'>
          <h1>📋 TICKET CalculeSorte</h1>
          <p>ID: ${ticketID}</p>
        </div>
        
        <div class='info-box'>
          <div class='info-row'><strong>👤 Nome:</strong> ${nome}</div>
          <div class='info-row'><strong>🤖 Especialista:</strong> ${especialista}</div>
          <div class='info-row'><strong>📅 Data:</strong> ${dataAtual}</div>
        </div>

        <div class='conversa'>
          <h3 style='margin-top: 0;'>📝 Sua Conversa:</h3>
          ${conversaHTML || '<p style="color: #999;">Nenhuma mensagem registrada</p>'}
        </div>

        <div class='footer'>
          <p>💡 Guarde este email para referência!</p>
          <p><a href='https://calculesorte.com.br'>Voltar ao CalculeSorte</a></p>
        </div>
      </div>
    </body>
    </html>
  `;
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
