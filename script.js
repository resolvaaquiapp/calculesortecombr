// ===== CONFIGURAÇÕES GERAIS =====
let limiteJogos = 30;
let jogosUsados = 0;

// ===== CAROUSEL DE ANÚNCIOS =====
function criarCarousel(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const anuncios = [
    { titulo: "PATROCINADOR PREMIUM 1", texto: "Loja da Sorte • Clique e confira", url: "#" },
    { titulo: "NUMEROLOGIA VIP", texto: "Descubra seu mapa astral completo", url: "#" }
  ];
  let idx = 0;
  function render() {
    el.innerHTML = anuncios.map((a, i) => `
      <a href="${a.url}" target="_blank" style="position: absolute; inset: 0; width: 100%; height: 100%; display: flex; align-items: center; gap: 15px; padding: 0 20px; text-decoration: none; transition: opacity 0.8s; ${i === idx ? 'opacity: 1;' : 'opacity: 0;'} background: rgba(7,20,40,0.9);">
        <div style="font-weight: 700; color: #f5c542;">${a.titulo}</div>
      </a>`).join('');
  }
  render();
  setInterval(() => { idx = (idx + 1) % anuncios.length; render(); }, 4500);
}

// ===== INICIALIZAÇÃO =====
document.addEventListener("DOMContentLoaded", () => {
  criarCarousel('carousel-top');
  
  let selectDia = document.getElementById("select-dia");
  if (selectDia) {
    for (let d = 1; d <= 31; d++) selectDia.options.add(new Option(d < 10 ? "0" + d : d, d < 10 ? "0" + d : d));
  }
  
  let selectAno = document.getElementById("select-ano");
  if (selectAno) {
    for (let a = 2026; a >= 1900; a--) selectAno.options.add(new Option(a, a));
  }
});

// ===== GERADOR DE DEZENAS E LÓGICA DE ANJOS =====
function processarCalculoSorte() {
  const nome = document.getElementById("input-nome")?.value;
  const dia = document.getElementById("select-dia")?.value;
  const mes = document.getElementById("select-mes")?.value;
  const ano = document.getElementById("select-ano")?.value;
  const whats = document.getElementById("input-whats")?.value;

  if (!nome || !dia || !mes || !ano || !whats) {
    alert("Preencha todos os campos!");
    return;
  }

  const mesDia = mes + "-" + dia;
  document.getElementById("tela-formulario").style.display = "none";
  document.getElementById("tela-carregamento").style.display = "block";

  setTimeout(() => {
    let anjoMsg = "Este anjo derrama bênçãos de proteção e intuição.";
    const datasGenios = ["03-19", "05-31", "08-12", "10-24", "01-05"];
    
    if (datasGenios.includes(mesDia)) {
      anjoMsg = "DATAS EXCLUDENTES: Conexão direta com o divino. Recebe a benção de todos os anjos.";
    }

    document.getElementById("mensagem-do-anjo").innerText = anjoMsg;
    document.getElementById("tela-carregamento").style.display = "none";
    document.getElementById("tela-resultado").style.display = "block";
    jogosUsados++;
  }, 2000);
}

// ===== FUNÇÃO CORRETA DE ENVIO DO ANUNCIANTE =====
async function enviarAnuncio() {
  const URL = "https://script.google.com/macros/s/AKfycbyr4fDVFOFjlHgRStoVfOXM6-ZwIKearSj2B97tjEzeVKfq-6zoYbolwEfPtFo10mEI/exec";
  
  const payload = {
    origem: 'anunciante',
    Nome: document.getElementById('ad-nome-empresa')?.value || '',
    whats: document.getElementById('ad-whatsapp')?.value || '',
    empresa: document.getElementById('ad-nome-empresa')?.value || '',
    LinkZap: document.getElementById('ad-link')?.value || '',
    fotoZap: document.getElementById('ad-fotos')?.value || ''
  };

  try {
    const response = await fetch(URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    if (response.ok) {
      alert('Enviado com sucesso!');
      fecharModal('modal-anunciante');
    }
  } catch (error) {
    console.error('Erro:', error);
    alert('Erro ao conectar.');
  }
}

function fecharModal(id) {
  document.getElementById(id)?.classList.add('hidden');
}
