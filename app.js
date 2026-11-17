import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref as dbRef, set, onValue } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// 1. PEGA AQUÍ LA CONFIGURACIÓN REAL DE TU FIREBASE (la de test-oposiciones)
const firebaseConfig = {
    apiKey: "AIzaSyDxijpzkKAmP85H5MqYsS_UnnmS1ySAgC0",
    authDomain: "oposiciones-tests.firebaseapp.com",
    databaseURL: "https://oposiciones-tests-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "oposiciones-tests",
    storageBucket: "oposiciones-tests.firebasestorage.app",
    messagingSenderId: "334815991038",
    appId: "1:334815991038:web:287c3c46c72ee9837ec1af",
    measurementId: "G-55K6MR5WKS"
};

let db = null;
try {
  if (firebaseConfig.apiKey !== "TU_API_KEY") {
    const app = initializeApp(firebaseConfig);
    db = getDatabase(app);
  }
} catch (error) {
  console.error("Error inicializando Firebase:", error);
}

// 2. ENLACE BASE A TU RELEASE DE GITHUB
const BASE_URL = "https://github.com/mmp00038/oposiciones-podcast/releases/download/audios";

// 3. CATÁLOGO AGRUPADO POR TEMAS
const CATALOGO = {
  comun: [
    // Ejemplo:
    // {
    //   temaId: "comun_t01",
    //   titulo: "Tema 1. La Constitución Española de 1978",
    //   partes: [
    //     { id: "comun_t01_1", titulo: "Parte 1", archivo: `${BASE_URL}/comun.Tema.1.-.1.mp4` }
    //   ]
    // }
  ],
  especifico: [
    {
      temaId: "esp_t18",
      titulo: "1. Tema 18",
      partes: [
        { id: "esp_t18_1", titulo: "Parte 1", archivo: `${BASE_URL}/1.Tema.18.-.1.mp4` },
        { id: "esp_t18_2", titulo: "Parte 2", archivo: `${BASE_URL}/1.Tema.18.-.2.mp4` },
        { id: "esp_t18_3", titulo: "Parte 3", archivo: `${BASE_URL}/1.Tema.18.-.3.mp4` }
      ]
    },
    {
      temaId: "esp_t17",
      titulo: "2. Tema 17",
      partes: [
        { id: "esp_t17_1", titulo: "Parte 1", archivo: `${BASE_URL}/2.Tema.17.-.1.mp4` },
        { id: "esp_t17_2", titulo: "Parte 2", archivo: `${BASE_URL}/2.Tema.17.-.2.mp4` }
      ]
    },
    {
      temaId: "esp_t14",
      titulo: "3. Tema 14",
      partes: [
        { id: "esp_t14_1", titulo: "Parte 1", archivo: `${BASE_URL}/3.Tema.14.-.1.mp4` },
        { id: "esp_t14_2", titulo: "Parte 2", archivo: `${BASE_URL}/3.Tema.14.-.2.mp4` },
        { id: "esp_t14_3", titulo: "Parte 3", archivo: `${BASE_URL}/3.Tema.14.-.3.mp4` },
        { id: "esp_t14_4", titulo: "Parte 4", archivo: `${BASE_URL}/3.Tema.14.-.4.mp4` }
      ]
    },
    {
      temaId: "esp_t15",
      titulo: "4. Tema 15",
      partes: [
        { id: "esp_t15_1", titulo: "Parte 1", archivo: `${BASE_URL}/4.Tema.15.-.1.mp4` },
        { id: "esp_t15_2", titulo: "Parte 2", archivo: `${BASE_URL}/4.Tema.15.-.2.mp4` },
        { id: "esp_t15_3", titulo: "Parte 3", archivo: `${BASE_URL}/4.Tema.15.-.3.mp4` },
        { id: "esp_t15_4", titulo: "Parte 4", archivo: `${BASE_URL}/4.Tema.15.-.4.mp4` }
      ]
    },
    {
      temaId: "esp_t04",
      titulo: "5. Tema 4",
      partes: [
        { id: "esp_t04_1", titulo: "Parte 1", archivo: `${BASE_URL}/5.Tema.4.-.1.mp4` },
        { id: "esp_t04_2", titulo: "Parte 2", archivo: `${BASE_URL}/5.Tema.4.-.2.mp4` },
        { id: "esp_t04_3", titulo: "Parte 3", archivo: `${BASE_URL}/5.Tema.4.-.3.mp4` },
        { id: "esp_t04_4", titulo: "Parte 4", archivo: `${BASE_URL}/5.Tema.4.-.4.mp4` },
        { id: "esp_t04_5", titulo: "Parte 5 (Anexos)", archivo: `${BASE_URL}/5.Tema.4.-.5.anexos.mp4` }
      ]
    }
  ]
};

let bloqueActual = "comun";
let pistaActual = null;
let temaAbiertoId = null;
let progresoGuardado = JSON.parse(localStorage.getItem("ama_podcast_progreso")) || {};
let vueltasGuardadas = JSON.parse(localStorage.getItem("ama_podcast_vueltas")) || {};
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

// Sincronización en tiempo real con Firebase (Progreso de pistas + Vueltas completas por tema)
if (db) {
  onValue(dbRef(db, "podcast_progreso"), (snapshot) => {
    const dataNube = snapshot.val();
    if (dataNube) {
      Object.keys(dataNube).forEach(id => {
        const local = progresoGuardado[id];
        const nube = dataNube[id];
        if (!local || (nube.updatedAt && nube.updatedAt > (local.updatedAt || 0))) {
          progresoGuardado[id] = nube;
        }
      });
      localStorage.setItem("ama_podcast_progreso", JSON.stringify(progresoGuardado));
      renderLista();
    }
  });

  onValue(dbRef(db, "podcast_vueltas"), (snapshot) => {
    const vueltasNube = snapshot.val();
    if (vueltasNube) {
      Object.keys(vueltasNube).forEach(temaId => {
        const local = vueltasGuardadas[temaId] || { count: 0, updatedAt: 0 };
        const nube = vueltasNube[temaId];
        if (nube.count > local.count || (nube.updatedAt && nube.updatedAt > (local.updatedAt || 0))) {
          vueltasGuardadas[temaId] = nube;
        }
      });
      localStorage.setItem("ama_podcast_vueltas", JSON.stringify(vueltasGuardadas));
      renderLista();
    }
  });
}

// Busca a qué tema pertenece una pista y comprueba si ya se han completado TODAS sus partes
function verificarTemaCompleto(parteId) {
  for (const bloque of ["comun", "especifico"]) {
    const tema = CATALOGO[bloque].find(t => t.partes.some(p => p.id === parteId));
    if (tema) {
      const todasCompletadas = tema.partes.every(p => progresoGuardado[p.id]?.completed === true);
      if (todasCompletadas) {
        const ahora = Date.now();
        const actual = vueltasGuardadas[tema.temaId]?.count || 0;
        const nuevoRegistroVueltas = { count: actual + 1, updatedAt: ahora };

        vueltasGuardadas[tema.temaId] = nuevoRegistroVueltas;
        localStorage.setItem("ama_podcast_vueltas", JSON.stringify(vueltasGuardadas));
        if (db) set(dbRef(db, `podcast_vueltas/${tema.temaId}`), nuevoRegistroVueltas);

        // Resetea todas las partes del tema a 0% para dejarlo listo para la siguiente vuelta
        tema.partes.forEach(p => {
          const resetParte = { time: 0, duration: progresoGuardado[p.id]?.duration || 0, percent: 0, completed: false, updatedAt: ahora };
          progresoGuardado[p.id] = resetParte;
          if (db) set(dbRef(db, `podcast_progreso/${p.id}`), resetParte);
        });
        localStorage.setItem("ama_podcast_progreso", JSON.stringify(progresoGuardado));
      }
      break;
    }
  }
}

function renderLista() {
  listaEl.innerHTML = "";
  const temas = CATALOGO[bloqueActual];

  if (!temas || temas.length === 0) {
    listaEl.innerHTML = `<p style="color: #b3b3b3; text-align: center; padding: 30px 10px;">Aún no hay audios añadidos en este bloque.</p>`;
    return;
  }

  temas.forEach(tema => {
    let sumaPorcentajes = 0;
    let contienePistaActiva = false;

    tema.partes.forEach(parte => {
      const data = progresoGuardado[parte.id] || { percent: 0, completed: false };
      sumaPorcentajes += data.completed ? 100 : (data.percent || 0);
      if (pistaActual && pistaActual.id === parte.id) {
        contienePistaActiva = true;
      }
    });

    const pctGlobal = Math.round(sumaPorcentajes / tema.partes.length);
    const estaAbierto = temaAbiertoId === tema.temaId;
    const numVueltas = vueltasGuardadas[tema.temaId]?.count || 0;
    const textoVueltas = numVueltas === 1 ? "🔄 1 vuelta" : `🔄 ${numVueltas} vueltas`;

    const grupoEl = document.createElement("div");
    grupoEl.className = `tema-grupo ${estaAbierto ? "open" : ""} ${contienePistaActiva ? "has-playing" : ""}`;

    const headerEl = document.createElement("div");
    headerEl.className = "tema-header";
    headerEl.innerHTML = `
      <div class="tema-top">
        <span class="tema-titulo">
          <span class="chevron">▶</span>
          ${tema.titulo}
        </span>
        <div class="tema-meta">
          <span class="vueltas-badge ${numVueltas === 0 ? "cero" : ""}" title="Veces completado el tema entero">${textoVueltas}</span>
          <span class="partes-badge">${tema.partes.length} ${tema.partes.length === 1 ? "pista" : "pistas"}</span>
          <span class="ep-percent">${pctGlobal}%</span>
        </div>
      </div>
      <div class="mini-progress-bg">
        <div class="mini-progress-fill" style="width: ${pctGlobal}%"></div>
      </div>
    `;

    headerEl.onclick = () => {
      temaAbiertoId = (temaAbiertoId === tema.temaId) ? null : tema.temaId;
      renderLista();
    };

    const partesContainer = document.createElement("div");
    partesContainer.className = "tema-partes";

    tema.partes.forEach(parte => {
      const data = progresoGuardado[parte.id] || { time: 0, duration: 0, percent: 0, completed: false };
      const isPlaying = pistaActual && pistaActual.id === parte.id;

      const card = document.createElement("div");
      card.className = `episodio-card ${isPlaying ? "playing" : ""}`;
      card.innerHTML = `
        <div class="ep-header">
          <span class="ep-title">${parte.titulo}</span>
          <span class="ep-percent ${data.completed ? "done" : ""}">
            ${data.completed ? "✓ Lista" : `${data.percent}%`}
          </span>
        </div>
        <div class="mini-progress-bg">
          <div class="mini-progress-fill" style="width: ${data.percent}%"></div>
        </div>
      `;
      card.onclick = (e) => {
        e.stopPropagation();
        cargarPista(parte, tema.titulo);
      };
      partesContainer.appendChild(card);
    });

    grupoEl.appendChild(headerEl);
    grupoEl.appendChild(partesContainer);
    listaEl.appendChild(grupoEl);
  });
}

function cargarPista(ep, tituloTema) {
  if (pistaActual) guardarProgreso(true);

  const nombreCompleto = `${tituloTema} · ${ep.titulo}`;
  pistaActual = { ...ep, nombreCompleto };
  currentTitle.textContent = "Cargando " + nombreCompleto + "...";
  audio.src = ep.archivo;
  audio.playbackRate = velocidades[idxVelocidad];

  const saved = progresoGuardado[ep.id];

  audio.onloadedmetadata = () => {
    currentTitle.textContent = nombreCompleto;
    timeTotal.textContent = formatTime(audio.duration);
    if (saved && !saved.completed && saved.time > 0) {
      audio.currentTime = Math.max(0, saved.time - 4);
    } else {
      audio.currentTime = 0;
    }
    audio.play();
    btnPlay.textContent = "❚❚";
    actualizarMediaSession(nombreCompleto);
    renderLista();
  };

  audio.onerror = () => {
    currentTitle.textContent = "⚠️ Error al cargar el audio desde GitHub";
    btnPlay.textContent = "▶";
  };
}

function guardarProgreso(forzar = false) {
  if (!pistaActual || !audio.duration) return;

  const ahora = Date.now();
  if (!forzar && ahora - ultimoGuardado < 5000) return;
  ultimoGuardado = ahora;

  const percent = Math.min(100, Math.round((audio.currentTime / audio.duration) * 100));
  const completed = percent >= 96;

  const registro = {
    time: completed ? 0 : Math.floor(audio.currentTime),
    duration: Math.floor(audio.duration),
    percent: completed ? 100 : percent,
    completed: completed,
    updatedAt: ahora
  };

  progresoGuardado[pistaActual.id] = registro;
  localStorage.setItem("ama_podcast_progreso", JSON.stringify(progresoGuardado));
  if (db) set(dbRef(db, `podcast_progreso/${pistaActual.id}`), registro);

  // Si esta parte acaba de completarse, comprobamos si ya están todas las partes del tema listas
  if (completed) {
    verificarTemaCompleto(pistaActual.id);
  }

  renderLista();
}

audio.ontimeupdate = () => {
  if (!audio.duration) return;
  const pct = Math.round((audio.currentTime / audio.duration) * 100);
  progressBar.style.width = `${pct}%`;
  timeCurrent.textContent = formatTime(audio.currentTime);
  currentPercent.textContent = `${pct}%`;
  guardarProgreso(false);
};

audio.onpause = () => { btnPlay.textContent = "▶"; guardarProgreso(true); };
audio.onended = () => { btnPlay.textContent = "▶"; guardarProgreso(true); };

btnPlay.onclick = () => {
  if (!pistaActual) return;
  if (audio.paused) { audio.play(); btnPlay.textContent = "❚❚"; }
  else { audio.pause(); }
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
  const registro = { time: 0, duration: Math.floor(audio.duration), percent: 0, completed: false, updatedAt: Date.now() };
  progresoGuardado[pistaActual.id] = registro;
  localStorage.setItem("ama_podcast_progreso", JSON.stringify(progresoGuardado));
  if (db) set(dbRef(db, `podcast_progreso/${pistaActual.id}`), registro);
  renderLista();
};

document.getElementById("progress-container").onclick = (e) => {
  if (!pistaActual || !audio.duration) return;
  const rect = e.target.getBoundingClientRect();
  const pos = (e.clientX - rect.left) / rect.width;
  audio.currentTime = pos * audio.duration;
  guardarProgreso(true);
};

document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    bloqueActual = btn.dataset.bloque;
    renderLista();
  };
});

function actualizarMediaSession(nombreCompleto) {
  if ("mediaSession" in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: nombreCompleto,
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

renderLista();