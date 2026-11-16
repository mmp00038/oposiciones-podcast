// Catálogo de ejemplo (ampliable a los 12 comunes y 25 específicos)
const CATALOGO = {
  comun: [
    { id: "comun_t01", titulo: "Tema 1. La Constitución Española de 1978", archivo: "audios/comun/tema01.mp3" },
    { id: "comun_t02", titulo: "Tema 2. El Estatuto de Autonomía para Andalucía", archivo: "audios/comun/tema02.mp3" },
    { id: "comun_t03", titulo: "Tema 3. Organización de la Junta de Andalucía", archivo: "audios/comun/tema03.mp3" }
  ],
  especifico: [
    { id: "esp_t01", titulo: "Tema 1. El medio físico de Andalucía", archivo: "audios/especifico/tema01.mp3" },
    { id: "esp_t02", titulo: "Tema 2. Espacios Naturales Protegidos (RENPA)", archivo: "audios/especifico/tema02.mp3" }
  ]
};

let bloqueActual = "comun";
let pistaActual = null;
let progresoGuardado = JSON.parse(localStorage.getItem("ama_podcast_progreso")) || {};
const velocidades = [1.0, 1.25, 1.5, 1.75, 2.0];
let idxVelocidad = 0;
let ultimoGuardado = 0;

const audio = document.getElementById("audio-engine");
const listaEl = document.getElementById("lista-episodios");
const btnPlay = document.getElementById("btn-play");
const progressBar = document.getElementById("progress-bar");
const timeCurrent = document.getElementById("time-current");
const timeTotal = document.getElementById("time-total");
const currentTitle = document.getElementById("current-title");
const currentPercent = document.getElementById("current-percent");

// Renderizar lista según pestaña
function renderLista() {
  listaEl.innerHTML = "";
  CATALOGO[bloqueActual].forEach(ep => {
    const data = progresoGuardado[ep.id] || { time: 0, duration: 0, percent: 0, completed: false };
    const isPlaying = pistaActual && pistaActual.id === ep.id;

    const card = document.createElement("div");
    card.className = `episodio-card ${isPlaying ? "playing" : ""}`;
    card.innerHTML = `
      <div class="ep-header">
        <span class="ep-title">${ep.titulo}</span>
        <span class="ep-percent ${data.completed ? "done" : ""}">
          ${data.completed ? "✓ Completado" : `${data.percent}%`}
        </span>
      </div>
      <div class="mini-progress-bg">
        <div class="mini-progress-fill" style="width: ${data.percent}%"></div>
      </div>
    `;
    card.onclick = () => cargarPista(ep);
    listaEl.appendChild(card);
  });
}

// Cargar y reanudar pista donde se quedó
function cargarPista(ep) {
  // Guardar estado de la pista anterior antes de cambiar
  if (pistaActual) guardarProgreso(true);

  pistaActual = ep;
  currentTitle.textContent = ep.titulo;
  audio.src = ep.archivo;
  audio.playbackRate = velocidades[idxVelocidad];

  const saved = progresoGuardado[ep.id];

  audio.onloadedmetadata = () => {
    timeTotal.textContent = formatTime(audio.duration);
    if (saved && !saved.completed && saved.time > 0) {
      // Retroceso inteligente de 4 segundos para retomar el hilo
      audio.currentTime = Math.max(0, saved.time - 4);
    } else {
      audio.currentTime = 0;
    }
    audio.play();
    btnPlay.textContent = "❚❚";
    actualizarMediaSession(ep);
    renderLista();
  };
}

// Guardar progreso en LocalStorage (y aquí conectaremos Firebase)
function guardarProgreso(forzar = false) {
  if (!pistaActual || !audio.duration) return;

  const ahora = Date.now();
  if (!forzar && ahora - ultimoGuardado < 4000) return; // Guardar cada 4s
  ultimoGuardado = ahora;

  const percent = Math.min(100, Math.round((audio.currentTime / audio.duration) * 100));
  const completed = percent >= 96;

  progresoGuardado[pistaActual.id] = {
    time: completed ? 0 : audio.currentTime,
    duration: audio.duration,
    percent: completed ? 100 : percent,
    completed: completed,
    updatedAt: ahora
  };

  localStorage.setItem("ama_podcast_progreso", JSON.stringify(progresoGuardado));
  renderLista();
}

// Eventos del reproductor
audio.ontimeupdate = () => {
  if (!audio.duration) return;
  const pct = Math.round((audio.currentTime / audio.duration) * 100);
  progressBar.style.width = `${pct}%`;
  timeCurrent.textContent = formatTime(audio.currentTime);
  currentPercent.textContent = `${pct}%`;
  guardarProgreso(false);
};

audio.onpause = () => {
  btnPlay.textContent = "▶";
  guardarProgreso(true);
};

audio.onended = () => {
  btnPlay.textContent = "▶";
  guardarProgreso(true);
};

btnPlay.onclick = () => {
  if (!pistaActual) return;
  if (audio.paused) {
    audio.play();
    btnPlay.textContent = "❚❚";
  } else {
    audio.pause();
  }
};

document.getElementById("btn-back").onclick = () => { if (pistaActual) audio.currentTime = Math.max(0, audio.currentTime - 15); };
document.getElementById("btn-forward").onclick = () => { if (pistaActual) audio.currentTime = Math.min(audio.duration, audio.currentTime + 15); };

document.getElementById("btn-speed").onclick = (e) => {
  idxVelocidad = (idxVelocidad + 1) % velocidades.length;
  const vel = velocidades[idxVelocidad];
  audio.playbackRate = vel;
  e.target.textContent = `${vel.toFixed(2).replace(".00", ".0")}x`;
};

document.getElementById("btn-reset").onclick = () => {
  if (!pistaActual) return;
  audio.currentTime = 0;
  progresoGuardado[pistaActual.id] = { time: 0, duration: audio.duration, percent: 0, completed: false };
  guardarProgreso(true);
};

// Barra de progreso clicable
document.getElementById("progress-container").onclick = (e) => {
  if (!pistaActual || !audio.duration) return;
  const rect = e.target.getBoundingClientRect();
  const pos = (e.clientX - rect.left) / rect.width;
  audio.currentTime = pos * audio.duration;
  guardarProgreso(true);
};

// Cambio de pestaña Común / Específico
document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    bloqueActual = btn.dataset.bloque;
    renderLista();
  };
});

// Controles en pantalla de bloqueo del móvil (Media Session API)
function actualizarMediaSession(ep) {
  if ("mediaSession" in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: ep.titulo,
      artist: "Oposiciones AMA - C1.2100",
      album: bloqueActual === "comun" ? "Temario Común" : "Temario Específico"
    });
    navigator.mediaSession.setActionHandler("play", () => audio.play());
    navigator.mediaSession.setActionHandler("pause", () => audio.pause());
    navigator.mediaSession.setActionHandler("seekbackward", () => { audio.currentTime = Math.max(0, audio.currentTime - 15); });
    navigator.mediaSession.setActionHandler("seekforward", () => { audio.currentTime = Math.min(audio.duration, audio.currentTime + 15); });
  }
}

function formatTime(sec) {
  if (isNaN(sec)) return "00:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

// Inicializar
renderLista();