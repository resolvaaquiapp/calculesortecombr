// CONTROLE DO LIMITADOR GRATUITO
let limiteJogos = 30;
let jogosUsados = 0;

// SISTEMA DOS 10 ANÚNCIOS ROTATIVOS
const listaAnuncios = [
  "anuncio1.jpg", "anuncio2.jpg", 
  "anuncio3.jpg", "anuncio4.jpg", 
  "anuncio5.jpg", "anuncio6.jpg", 
  "anuncio7.jpg", "anuncio8.jpg", 
  "anuncio9.jpg", "anuncio10.jpg"
];

function rodarAnuncios() {
  let topo = listaAnuncios[
    Math.floor(Math.random() * listaAnuncios.length)
  ];
  let rodape = listaAnuncios[
    Math.floor(Math.random() * listaAnuncios.length)
 <div class="container-banner-centralizado" style="position: relative; overflow: hidden;">
        <div id="carousel-top" style="position: absolute; inset: 0;"></div>
        <button onclick="abrirAnunciante()" style="position: absolute; top: 10px; right: 10px; z-index: 20; background: linear-gradient(135deg, #f5c542, #e0a82e); color: #071428; font-weight: 700; font-size: 11px; padding: 6px 12px; border-radius: 9999px; border: none; cursor: pointer;">
            Quero Anunciar - R$39/mês
        </button>
    </div>
  document.getElementById("banner-rodape")
    .innerHTML = `<img src="${rodape}" onerror="this.style.display='none'">`;
}

// INICIALIZAÇÃO AUTOMÁTICA DAS OPÇÕES
window.onload = function() {
  rodarAnuncios();
  
  // Alimenta os Dias (01 a 31)
  let selectDia = document.getElementById("select-dia");
  for (let d = 1; d <= 31; d++) {
    let vDia = d < 10 ? "0" + d : "" + d;
    selectDia.options[selectDia.options.length] = 
      new Option(vDia, vDia);
  }

  // Alimenta os Anos (2026 até 1900)
  let selectAno = document.getElementById("select-ano");
  for (let a = 2026; a >= 1900; a--) {
    selectAno.options[selectAno.options.length] = 
      new Option(a, a);
  }
};

// BANCO DE DADOS DOS ANJOS
const tabelaAnjos = [
  { inicio: "03-20", fim: "03-24", 
    nome: "VEHUIAH", msg: "Espírito empreendedor." },
  { inicio: "03-25", fim: "03-29", 
    nome: "JELIEL", msg: "Paz e fidelidade." },
  { inicio: "03-30", fim: "04-03", 
    nome: "SITAEL", msg: "Proteção contra adversidades." },
  { inicio: "04-04", fim: "04-08", 
    nome: "ELEMIAH", msg: "Proteção em viagens." },
  { inicio: "04-09", fim: "04-13", 
    nome: "MAHASIAH", msg: "Paz interior." },
  { inicio: "04-14", fim: "04-18", 
    nome: "LELAHEL", msg: "Arte, fama e fortuna." },
  { inicio: "04-19", fim: "04-23", 
    nome: "ACHAIAH", msg: "Paciência e estudos." },
  { inicio: "04-24", fim: "04-28", 
    nome: "CAHETHEL", msg: "Abundância e colheitas." },
  { inicio: "04-29", fim: "05-03", 
    nome: "HAZIEL", msg: "Misericórdia e promessas." },
  { inicio: "05-04", fim: "05-08", 
    nome: "ALADIAH", msg: "Saúde e regeneração." },
  { inicio: "05-09", fim: "05-13", 
    nome: "LAOVIAH", msg: "Vitória contra a inveja." },
  { inicio: "05-14", fim: "05-18", 
    nome: "HAHAIAH", msg: "Mistérios ocultos." },
  { inicio: "05-19", fim: "05-23", 
    nome: "YESALEL", msg: "Fidelidade conjugal." },
  { inicio: "05-24", fim: "05-28", 
    nome: "MEBAHEL", msg: "Justiça e verdade." },
  { inicio: "05-29", fim: "06-02", 
    nome: "HARIEL", msg: "Ciências e artes." },
  { inicio: "06-03", fim: "06-07", 
    nome: "HAKAMIAH", msg: "Proteção contra golpes." }
];

// DATAS DOS GÊNIOS DA HUMANIDADE
const datasGenios = [
  "03-19", "05-31", "08-12", 
  "10-24", "01-05"
];
// TEXTOS JURÍDICOS DOS POP-UPS
const textosJuridicos = {
  termos: "<strong>TERMOS DE USO REULAMENTADOS:</strong>" +
    "<br><br>Uso estritamente pessoal e recreativo. " +
    "Proibida reprodução comercial. Uso livre para " +
    "maiores de 18 anos, cabendo ao usuário gerenciar " +
    "seus jogos nas lotéricas oficiais.",
    
  privacidade: "<strong>POLÍTICA DE PRIVACIDADE (LGPD):</strong>" +
    "<br><br>Seus dados (Nome, Nascimento e WhatsApp) " +
    "são enviados com segurança e criptografia direto " +
    "para o banco de dados do administrador. Não há " +
    "compartilhamento com terceiros.",
    
  aviso: "<strong>AVISO LEGAL E ISENÇÃO DE PROCESSOS:</strong>" +
    "<br><br>Este site NÃO realiza apostas, NÃO recebe " +
    "dinheiro para jogos e NÃO tem vínculo com a Caixa. " +
    "Os números são meras sugestões matemáticas e místicas. " +
    "Não há garantia de acerto ou prêmios."
};

function abrirModalJuridico(tipo) {
  let titulos = { 
    termos: "Termos de Uso", 
    privacidade: "Políticas de Privacidade", 
    aviso: "Aviso Legal" 
  };
  document.getElementById("titulo-juridico")
    .innerText = titulos[tipo];
  document.getElementById("texto-juridico")
    .innerHTML = textosJuridicos[tipo];
  document.getElementById("janela-juridica")
    .style.display = "flex";
}

function fecharModalJuridico() {
  document.getElementById("janela-juridica")
    .style.display = "none";
}

// ===================== GERADOR DE DEZENAS BASEADO EM DADOS REAIS =====================
// Tabela de frequência da Mega-Sena baseada em sorteios reais (a mesma base já usada
// no painel "MEGASENA" do projeto). Fica fixa aqui — não depende de nenhum proxy externo,
// então nunca falha. Para atualizar com sorteios mais recentes, é só pedir.
const frequenciaBase = {
  1:18, 2:22, 3:19, 4:23, 5:21, 6:20, 7:18, 8:22, 9:19, 10:24,
  11:20, 12:21, 13:17, 14:23, 15:19, 16:22, 17:25, 18:21, 19:20, 20:18,
  21:22, 22:19, 23:26, 24:21, 25:20, 26:24, 27:27, 28:22, 29:19, 30:21,
  31:18, 32:20, 33:19, 34:22, 35:21, 36:23, 37:20, 38:19, 39:22, 40:21,
  41:20, 42:24, 43:19, 44:28, 45:22, 46:21, 47:26, 48:19, 49:23, 50:20,
  51:18, 52:19, 53:22, 54:21, 55:20, 56:19, 57:21, 58:25, 59:18, 60:20
};

// Gera 6 dezenas combinando a frequência histórica real com números pessoais
// calculados a partir da data de nascimento do usuário.
function gerarDezenasPonderadas(diaNascimento, mesNascimento, anoNascimento) {
  const dia = parseInt(diaNascimento);
  const mes = parseInt(mesNascimento);
  const ano = parseInt(anoNascimento);
  const idade = new Date().getFullYear() - ano;

  const diaMod = dia % 60 || 60;
  const mesMod = mes % 12 || 12;

  // Números "pessoais" do usuário — recebem peso extra no sorteio
  const pessoais = new Set([
    diaMod,
    mesMod,
    (diaMod + mesMod) % 60 || 60,
    (dia + mes + (ano % 100)) % 60 || 60,
    (idade % 60) || 60,
    Math.abs(dia - mes) % 60 || 60
  ]);

  // Monta um "saco" de bolinhas: cada número aparece repetido conforme seu peso
  const saco = [];
  for (let n = 1; n <= 60; n++) {
    const peso = (frequenciaBase[n] || 1) + (pessoais.has(n) ? 15 : 0);
    for (let p = 0; p < Math.ceil(peso / 3); p++) saco.push(n);
  }

  // Embaralha e escolhe 6 números únicos
  const embaralhado = saco.sort(() => Math.random() - 0.5);
  const escolhidos = [];
  for (const n of embaralhado) {
    if (!escolhidos.includes(n)) escolhidos.push(n);
    if (escolhidos.length === 6) break;
  }
  // Segurança extra (não deve ser necessário, mas evita travar)
  while (escolhidos.length < 6) {
    const r = Math.floor(Math.random() * 60) + 1;
    if (!escolhidos.includes(r)) escolhidos.push(r);
  }

  return escolhidos
    .sort((a, b) => a - b)
    .map(n => (n < 10 ? "0" + n : "" + n));
}

// PROCESSAMENTO PRINCIPAL DA CALCULADORA
function processarCalculoSorte() {
  const nome = document.getElementById("input-nome").value;
  const diaNascimento = document.getElementById("select-dia").value;
  const mesNascimento = document.getElementById("select-mes").value;
  const anoNascimento = document.getElementById("select-ano").value;
  const whats = document.getElementById("input-whats").value;

  if (!nome || !diaNascimento || !mesNascimento || !anoNascimento || !whats) {
    alert("Por favor, preencha todos os campos com atenção!");
    return;
  }

  // TRAVA SE PASSAR DO LIMITE DE 30 JOGOS NO MÊS
  if (jogosUsados >= limiteJogos) {
    document.getElementById("tela-formulario").style.display = "none";
    document.getElementById("tela-resultado").style.display = "none";
    document.getElementById("tela-planos").style.display = "block";
    return;
  }

  const mesDia = mesNascimento + "-" + diaNascimento;

  document.getElementById("tela-formulario").style.display = "none";
  document.getElementById("tela-carregamento").style.display = "block";
  let msgLoading = document.getElementById("mensagem-loading");
  
  setTimeout(() => { msgLoading.innerText = "Consultando o Anjo..."; }, 800);
  setTimeout(() => { msgLoading.innerText = "Alinhando dezenas estatísticas..."; }, 1800);

  setTimeout(() => {
    let anjoNome = "ANJO DA GUARDA";
    let anjoMsg = "Este anjo derrama bênçãos de proteção e intuição.";

    if (datasGenios.includes(mesDia)) {
      anjoNome = "GÊNIO DA HUMANIDADE";
      anjoMsg = "Conexão divina direta. Recebe bênçãos de todas as falanges.";
    } else {
      for (let anjo of tabelaAnjos) {
        if (mesDia >= anjo.inicio && mesDia <= anjo.fim) {
          anjoNome = anjo.nome;
          anjoMsg = anjo.msg;
          break;
        }
      }
    }

    // GERADOR DE DEZENAS DA MEGA-SENA — ponderado por frequência real + data de nascimento
    let dezenasArr = gerarDezenasPonderadas(diaNascimento, mesNascimento, anoNascimento);

    let blocoDezenas = document.getElementById("bloco-dezenas");
    blocoDezenas.innerHTML = "";
    dezenasArr.forEach(num => {
      blocoDezenas.innerHTML += `<div class="bola-dezena">${num}</div>`;
    });

    document.getElementById("nome-do-anjo").innerText = anjoNome;
    document.getElementById("mensagem-do-anjo").innerText = anjoMsg;

    // ENVIO DAS 3 COLUNAS DE DATA DIRETAMENTE PARA SUA PLANILHA (Google Sheets via Apps Script)
    const urlPlanilha = "https://script.google.com/macros/s/AKfycbxR67mbpL9xo_eDGU6zhNOjrBDeNFFL7Wm9UZEEphA_lChpXxAyq53jiHKBCV0dW4AR/exec";
    const dadosParaEnviar = new URLSearchParams({
      "nome": nome,
      "whatsapp": whats,
      "dia_nascimento": diaNascimento,
      "mes_nascimento": mesNascimento,
      "ano_nascimento": anoNascimento,
      "status": "Gratuito",
      "tipo": "Lead Site",
      "visitantes": "1"
    });

    fetch(urlPlanilha, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: dadosParaEnviar
    }).catch(err => console.log("Erro de envio: ", err));

    jogosUsados++;
    document.getElementById("contador-jogos").innerText = 
      `Você usou ${jogosUsados} de 30 consultas gratuitas este mês.`;

    if (jogosUsados >= limiteJogos) {
      let btnAcao = document.getElementById("btn-acao-resultado");
      btnAcao.innerText = "Conhecer Clube VIP / Renovar 👑";
      btnAcao.onclick = function() {
        document.getElementById("tela-resultado").style.display = "none";
        document.getElementById("tela-planos").style.display = "block";
      };
    }

    document.getElementById("tela-carregamento").style.display = "none";
    document.getElementById("tela-resultado").style.display = "block";
    rodarAnuncios();
  }, 3000);
}

function voltarParaInicio() {
  document.getElementById("tela-resultado").style.display = "none";
  document.getElementById("tela-formulario").style.display = "block";
  document.getElementById("mensagem-loading").innerText = "Conectando ao plano astral...";
  rodarAnuncios();
}
