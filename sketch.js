// 🎮 CONFIG
let imagens = [];
let sons = [];

let x = [0, 0, 0, 0];
let y = [20, 110, 200, 290];
let teclas = ["ArrowRight", "d", " ", "Enter"];

let nomes = ["Gojo", "Lilico", "GamesEdu", "Bill"];
let placar = [0, 0, 0, 0];

let fundo, pausa;

let estado = "menu"; // menu | jogando | fim

// 📦 PRELOAD
function preload() {
  imagens[0] = loadImage("img/Gojo.png");
  imagens[1] = loadImage("img/Lilico.png");
  imagens[2] = loadImage("img/GamesEduUu.png");
  imagens[3] = loadImage("img/BillCipher.png");

  fundo = loadImage("img/SoloMarcianoCorrida.png");
  pausa = loadImage("img/TelaPausa.jpeg");

  sons[0] = loadSound("aud/GojoFalando.mp3");
  sons[1] = loadSound("aud/SomGalinha.mp3");
  sons[2] = loadSound("aud/DanonaoGrosso.mp3");
  sons[3] = loadSound("aud/BillFalando.mp3");
}

// 🎯 SETUP
function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent("game");

  canvas.attribute("tabindex", "0");

  setTimeout(() => {
    canvas.elt.focus();
  }, 100);
}

// 🎮 LOOP
function draw() {

  if (estado === "menu") {
    background(pausa);
    textoCentro("Clique em Jogar", 28);
    return;
  }

  if (estado === "fim") {
    textoCentro("Clique em Reiniciar", 28);
    return;
  }

  background(fundo);

  desenharJogadores();
  desenharLinha();
  verificarVencedor();
}

// 👤 JOGADORES
function desenharJogadores() {
  for (let i = 0; i < 4; i++) {
    image(imagens[i], x[i], y[i], 100, 100);
  }
}

// 🏁 LINHA
function desenharLinha() {
  fill(255);
  rect(350, 0, 10, height);
}

// 🏆 VENCEDOR
function verificarVencedor() {
  for (let i = 0; i < 4; i++) {
    if (x[i] > 350) {
      textoCentro(nomes[i] + " venceu!", 32);

      if (!sons[i].isPlaying()) {
        sons[i].play();
      }

      placar[i]++;
      atualizarPlacar();

      estado = "fim";
      noLoop();
    }
  }
}

// 🎹 TECLADO
function keyReleased() {
  if (estado !== "jogando") return;

  for (let i = 0; i < 4; i++) {
    if (
      key === teclas[i] ||
      (teclas[i] === "d" && key.toLowerCase() === "d")
    ) {
      x[i] += random(20);
    }
  }
}

// 🎨 TEXTO
function textoCentro(txt, size) {
  fill(255);
  textAlign(CENTER);
  textSize(size);
  text(txt, width / 2, height / 2);
}

// ▶️ INICIAR
function iniciarJogo() {
  userStartAudio();
  resetar();
  estado = "jogando";
  loop();
}

// 🔄 RESET
function reiniciarJogo() {
  resetar();
  estado = "menu";
  loop();
}

// 🔧 RESET POSIÇÕES
function resetar() {
  x = [0, 0, 0, 0];
}

// 📊 PLACAR
function atualizarPlacar() {
  document.getElementById("placar").innerHTML = `
    <li>Gojo: ${placar[0]}</li>
    <li>Lilico: ${placar[1]}</li>
    <li>GamesEdu: ${placar[2]}</li>
    <li>Bill: ${placar[3]}</li>
  `;
}