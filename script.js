// CONTROLE DE CONSULTAS DO PLANO GRATUITO
let limiteJogos = 30;
let jogosUsados = 0;

// BANNER ROTATIVO (10 ANUNCIANTES)
const listaAnuncios = [
  "anuncio1.jpg", "anuncio2.jpg", "anuncio3.jpg", "anuncio4.jpg", "anuncio5.jpg",
  "anuncio6.jpg", "anuncio7.jpg", "anuncio8.jpg", "anuncio9.jpg", "anuncio10.jpg"
];

function rodarAnuncios() {
  let itemTopo = listaAnuncios[Math.floor(Math.random() * listaAnuncios.length)];
  let itemRodape = listaAnuncios[Math.floor(Math.random() * listaAnuncios.length)];
  document.getElementById("banner-topo").innerHTML = `<img src="${itemTopo}" alt="Publicidade" onerror="this.style.display='none'">`;
  document.getElementById("banner-rodape").innerHTML = `<img src="${itemRodape}" alt="Publicidade" onerror="this.style.display='none'">`;
}

// BANCO DE DADOS DOS ANJOS CABALÍSTICOS
const tabelaAnjos = [
  { inicio: "03-20", fim: "03-24", nome: "VEHUIAH", msg: "Concede espírito empreendedor, lucidez e sucesso em assuntos difíceis." },
  { inicio: "03-25", fim: "03-29", nome: "JELIEL", msg: "Domina a paz conjugal, acalma revoltas e traz fidelidade." },
  { inicio: "03-30", fim: "04-03", nome: "SITAEL", msg: "Protege contra as adversidades, acidentes e fraudes financeiras." },
  { inicio: "04-04", fim: "04-08", nome: "ELEMIAH", msg: "Protege nas viagens marítimas e ajuda nas descobertas úteis." },
  { inicio: "04-09", fim: "04-13", nome: "MAHASIAH", msg: "Facilita o aprendizado de altas ciências e traz paz interior." },
  { inicio: "04-14", fim: "04-18", nome: "LELAHEL", msg: "Rege as curas de doenças, as artes, a fama e a fortuna." },
  { inicio: "04-19", fim: "04-23", nome: "ACHAIAH", msg: "Promove a paciência, o gosto pelo estudo e tarefas difíceis." },
  { inicio: "04-24", fim: "04-28", nome: "CAHETHEL", msg: "Traz as bênçãos da terra, abundância e afasta maus espíritos." },
  { inicio: "04-29", fim: "05-03", nome: "HAZIEL", msg: "Domina a bondade, a reconciliação e o cumprimento de promessas." },
  { inicio: "05-04", fim: "05-08", nome: "ALADIAH", msg: "Protege contra as injustiças ocultas e auxilia na saúde." },
  { inicio: "05-09", fim: "05-13", nome: "LAOVIAH", msg: "Concede vitórias, combate a inveja e rege grandes descobertas." },
  { inicio: "05-14", fim: "05-18", nome: "HAHAIAH", msg: "Domina os mistérios ocultos e transforma inimigos em amigos." },
  { inicio: "05-19", fim: "05-23", nome: "YESALEL", msg: "Favorece a amizade, a fidelidade conjugal e a expressão." },
  { inicio: "05-24", fim: "05-28", nome: "MEBAHEL", msg: "Defensor da justiça, da verdade e da liberdade dos oprimidos." },
  { inicio: "05-29", fim: "06-02", nome: "HARIEL", msg: "Rege as ciências, as artes e inspira sentimentos de paz." },
  { inicio: "06-03", fim: "06-07", nome: "HAKAMIAH", msg: "Protege os líderes legítimos e ajuda contra traições ou golpes." }
];

const datasGenios = ["03-19", "05-31", "08-12", "10-24", "01-05"];

// TEXTOS JURÍDICOS DA CAIXA FLUTUANTE
const textosJuridicos = {
  termos: "<strong>TERMOS DE USO REGULAMENTADOS CONFORME A LEGISLAÇÃO BRASILEIRA:</strong><br><br>Ao acessar e utilizar o Calcule Sorte, o usuário declara estar ciente de que esta plataforma é estritamente de uso pessoal e recreativo. Fica vedada a reprodução comercial sem autorização expressa do proprietário. O uso do gerador e de seus relatórios místicos e estatísticos é livre para maiores de 18 anos, cabendo exclusivamente ao usuário o gerenciamento de suas dezenas em casas lotéricas credenciadas oficiais.",
  privacidade: "<strong>POLÍTICA DE PRIVACIDADE E PROTEÇÃO DE DADOS (LGPD):</strong><br><br>O Calcule Sorte protege integralmente a privacidade dos seus usuários. Declaramos que os dados cadastrados neste site (Nome, Data de Nascimento e WhatsApp) são trafegados via conexão criptografada de segurança para o banco de dados interno pessoal do administrador, não sendo vendidos, alugados ou compartilhados com nenhuma empresa terceira sob nenhuma hipótese.",
  aviso: "<strong>AVISO LEGAL E ISENÇÃO DE RESPONSABILIDADE CIVIL E PENAL:</strong><br><br>O Calcule Sorte declara publicamente que NÃO realiza jogos em dinheiro, NÃO recebe apostas e NÃO possui qualquer espécie de vínculo com a Caixa Econômica Federal. Todos os números sugeridos são gerados por combinações estatísticas baseadas em históricos numéricos combinados com regras esotéricas. Não oferecemos nenhuma promessa ou garantia de acerto, prêmio ou enriquecimento. O usuário joga por sua inteira conta, risco e livre arbítrio."
};

function abrirModalJuridico(tipo) {
  let titulos = { termos: "Termos de Uso", privacidade: "Políticas de Privacidade", aviso: "Aviso Legal" };
  document.getElementById("titulo-juridico").innerText = titulos[tipo];
  document.getElementById("texto-juridico").innerHTML = textosJuridicos[tipo];
  document.getElementById("janela-juridica").style.display = "flex";
}

function fecharModalJuridico() {
  document.getElementById("janela-juridica").style.display = "none";
}

// ALIMENTA AS CAIXAS DE DIA E ANO AUTOMATICAMENTE ASSIM QUE CARREGA O SITE
window.onload = function() {
  rodarAnuncios();
  
  // Preenche a caixa de Dias (01 a 31)
  let selectDia = document.getElementById("select-dia");
  for (let d = 1; d <= 31; d++) {
    let valorDia = d < 10 ? "0" + d : "" + d;
    selectDia.options[selectDia.options.length] = new Option(valorDia, valorDia);
  }

  // Preenche a caixa de Anos (Do ano atual 2026 até 1900)
  let selectAno = document.getElementById("select-ano");
  for (let a = 2026; a >= 1900; a--) {
    selectAno.options[selectAno.options.length] = new Option(a, a);
  }
};

// MOTOR DA CALCULADORA DE SORTE
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

  // TRAVA SE ESTOURAR OS 30 JOGOS GRÁTIS
  if (jogosUsados >= limiteJogos) {
    document.getElementById("tela-formulario").style.display = "none";
    document.getElementById("tela-resultado").style.display = "none";
    document.getElementById("tela-planos").style.display = "block";
    return;
  }

  // Cria o formato místico MM-DD para busca do anjo
  const mesDia = mesNascimento + "-" + diaNascimento;

  document.getElementById("tela-formulario").style.display = "none";
  document.getElementById("tela-carregamento").style.display = "block";
  let msgLoading = document.getElementById("mensagem-loading");
  
  setTimeout(() => { msgLoading.innerText = "Consultando o Anjo Regente da sua data..."; }, 800);
  setTimeout(() => { msgLoading.innerText = "Alinhando os Astros com as estatísticas da Mega-Sena..."; }, 1800);

  setTimeout(() => {
    let anjoNome = "ANJO DA GUARDA";
    let anjoMsg = "Este anjo derrama bênçãos de proteção, intuição acentuada e sabedoria em todas as suas escolhas financeiras cotidianas.";

    if (datasGenios.includes(mesDia)) {
      anjoNome = "GÊNIO DA HUMANIDADE";
      anjoMsg = "Parabéns! Sua data possui conexão divina direta. Você recebe as bênçãos especiais de proteção de todas as falanges celestes.";
    } else {
      for (let anjo of tabelaAnjos) {
        if (mesDia >= anjo.inicio && mesDia <= anjo.fim) {
          anjoNome = anjo.nome;
          anjoMsg = anjo.msg;
          break;
        }
      }
    }

    // GERADOR DE DEZENAS DA MEGA-SENA
    let dezenasArr = [];
    while (dezenasArr.length < 6) {
      let num = Math.floor(Math.random() * 60) + 1;
      let formatado = num < 10 ? "0" + num : "" + num;
      if (!dezenasArr.includes(formatado)) { dezenasArr.push(formatado); }
    }
    dezenasArr.sort((a, b) => a - b);

    let blocoDezenas = document.getElementById("bloco-dezenas");
    blocoDezenas.innerHTML = "";
    dezenasArr.forEach(num => {
      blocoDezenas.innerHTML += `<div class="bola-dezena">${num}</div>`;
    });

    document.getElementById("nome-do-anjo").innerText = anjoNome;
    document.getElementById("mensagem-do-anjo").innerText = anjoMsg;

    // ENVIO INTEGRADO COM A SUA URL DO GOOGLE APP SCRIPT (3 COLUNAS SEPARADAS)
    const urlPlanilha = "https://google.com";
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
    document.getElementById("contador-jogos").innerText = `Você usou ${jogosUsados} de 30 consultas gratuitas este mês.`;

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
