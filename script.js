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
      <a href="${a.url}" target="_blank" style="position: absolute; inset: 0; display: flex; align-items: center; padding: 0 20px; text-decoration: none; transition: opacity 0.8s; ${i === idx ? 'opacity: 1;' : 'opacity: 0;'} background: rgba(7,20,40,0.9);">
        <div style="font-weight: 700; color: #f5c542;">${a.titulo}</div>
      </a>`).join('');
  }
  render();
  setInterval(() => { idx = (idx + 1) % anuncios.length; render(); }, 4500);
}

// ===== INICIALIZAÇÃO =====
document.addEventListener("DOMContentLoaded", () => {
  criarCarousel('carousel-top');
  
  // Preencher Dias
  const selectDia = document.getElementById("select-dia");
  if (selectDia) {
    for (let d = 1; d <= 31; d++) {
      let v = d < 10 ? "0" + d : "" + d;
      selectDia.add(new Option(v, v));
    }
  }
  // Preencher Anos
  const selectAno = document.getElementById("select-ano");
  if (selectAno) {
    for (let a = 2026; a >= 1900; a--) selectAno.add(new Option(a, a));
  }
});

// ===== TABELA DE ANJOS E LÓGICA DE CÁLCULO =====
const tabelaAnjos = [
  { inicio: "03-20", fim: "03-24", nome: "VEHUIAH", msg: "Espírito empreendedor." },
  { inicio: "03-25", fim: "03-29", nome: "JELIEL", msg: "Paz e fidelidade." }
];

function processarCalculoSorte() {
  const nome = document.getElementById("input-nome")?.value;
  if (!nome) { alert("Preencha o nome!"); return; }

  document.getElementById("tela-formulario").style.display = "none";
  document.getElementById("tela-carregamento").style.display = "block";

  setTimeout(() => {
    document.getElementById("tela-carregamento").style.display = "none";
    document.getElementById("tela-resultado").style.display = "block";
    jogosUsados++;
    document.getElementById("contador-jogos").innerText = `Você usou ${jogosUsados} de 30 consultas.`;
  }, 2000);
}

function voltarParaInicio() {
  document.getElementById("tela-resultado").style.display = "none";
  document.getElementById("tela-formulario").style.display = "block";
}

// ===== MODAIS JURÍDICOS =====
function abrirModalJuridico(tipo) {
  const janelas = { termos: "Termos", privacidade: "Privacidade", aviso: "Aviso" };
  document.getElementById("titulo-juridico").innerText = janelas[tipo];
  document.getElementById("janela-juridica").style.display = "flex";
}

function fecharModalJuridico() {
  document.getElementById("janela-juridica").style.display = "none";
}

// ===== FUNÇÃO DE ENVIO ANUNCIANTE (REMASTERIZADA) =====
async function enviarDadosPlanilha(event) {
  event.preventDefault();
  const URL = "https://script.google.com/macros/s/AKfycbxR67mbpL9xo_eDGU6zhNOjrBDeNFFL7Wm9UZEEphA_lChpXxAyq53jiHKBCV0dW4AR/exec";
  
  const paraBase64 = file => new Promise(resolve => {
    if (!file) resolve("");
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
  });

  const dados = {
    nome: document.getElementById('anunciante-nome').value,
    whats: document.getElementById('anunciante-whats').value,
    empresa: document.getElementById('anunciante-empresa').value,
    fotoZap: await paraBase64(document.getElementById('foto-zap').files[0])
  };

  fetch(URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados)
  })
  .then(() => {
    alert('Cadastro enviado com sucesso!');
    document.getElementById('form-anunciante').reset();
    document.getElementById('modal-anunciante').classList.add('hidden');
  })
  .catch(err => { alert('Erro ao enviar.'); console.error(err); });
}
