import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref as dbRef, set, onValue } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// 1. PEGA AQUÍ LA CONFIGURACIÓN REAL DE TU FIREBASE
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

// 3. CATÁLOGO AGRUPADO POR TEMAS (en el orden exacto de explicación)
const CATALOGO = {
  comun: [
    // Aquí irán los temas comunes cuando los subas
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
    },
    {
      temaId: "esp_t13",
      titulo: "6. Tema 13",
      partes: [
        { id: "esp_t13_1", titulo: "Parte 1", archivo: `${BASE_URL}/6.Tema.13.-.1.mp4` },
        { id: "esp_t13_2", titulo: "Parte 2", archivo: `${BASE_URL}/6.Tema.13.-.2.mp4` },
        { id: "esp_t13_3", titulo: "Parte 3", archivo: `${BASE_URL}/6.Tema.13.-.3.mp4` },
        { id: "esp_t13_4", titulo: "Parte 4", archivo: `${BASE_URL}/6.Tema.13.-.4.mp4` },
        { id: "esp_t13_5", titulo: "Parte 5", archivo: `${BASE_URL}/6.Tema.13.-.5.mp4` }
      ]
    },
    {
      temaId: "esp_t19",
      titulo: "7. Tema 19",
      partes: [
        { id: "esp_t19_1", titulo: "Parte 1", archivo: `${BASE_URL}/7.Tema.19.-.1.mp4` },
        { id: "esp_t19_2", titulo: "Parte 2", archivo: `${BASE_URL}/7.Tema.19.-.2.mp4` },
        { id: "esp_t19_3", titulo: "Parte 3", archivo: `${BASE_URL}/7.Tema.19.-.3.mp4` },
        { id: "esp_t19_4", titulo: "Parte 4", archivo: `${BASE_URL}/7.Tema.19.-.4.mp4` }
      ]
    },
    {
      temaId: "esp_t20",
      titulo: "8. Tema 20",
      partes: [
        { id: "esp_t20_1", titulo: "Parte 1", archivo: `${BASE_URL}/8.Tema.20.-.1.mp4` },
        { id: "esp_t20_2", titulo: "Parte 2", archivo: `${BASE_URL}/8.Tema.20.-.2.mp4` },
        { id: "esp_t20_3", titulo: "Parte 3", archivo: `${BASE_URL}/8.Tema.20.-.3.mp4` },
        { id: "esp_t20_4", titulo: "Parte 4", archivo: `${BASE_URL}/8.Tema.20.-.4.mp4` }
      ]
    },
    {
      temaId: "esp_t21",
      titulo: "9. Tema 21",
      partes: [
        { id: "esp_t21_1", titulo: "Parte 1", archivo: `${BASE_URL}/9.Tema.21.-.1.mp4` },
        { id: "esp_t21_2", titulo: "Parte 2", archivo: `${BASE_URL}/9.Tema.21.-.2.mp4` },
        { id: "esp_t21_3", titulo: "Parte 3", archivo: `${BASE_URL}/9.Tema.21.-.3.mp4` },
        { id: "esp_t21_4", titulo: "Parte 4", archivo: `${BASE_URL}/9.Tema.21.-.4.mp4` }
      ]
    },
    {
      temaId: "esp_t22",
      titulo: "10. Tema 22",
      partes: [
        { id: "esp_t22_1", titulo: "Parte 1", archivo: `${BASE_URL}/10.Tema.22.-.1.mp4` },
        { id: "esp_t22_2", titulo: "Parte 2", archivo: `${BASE_URL}/10.Tema.22.-.2.mp4` }
      ]
    },
    {
      temaId: "esp_t23",
      titulo: "11. Tema 23",
      partes: [
        { id: "esp_t23_1", titulo: "Parte 1", archivo: `${BASE_URL}/11.Tema.23.-.1.mp4` },
        { id: "esp_t23_2", titulo: "Parte 2", archivo: `${BASE_URL}/11.Tema.23.-.2.mp4` },
        { id: "esp_t23_3", titulo: "Parte 3", archivo: `${BASE_URL}/11.Tema.23.-.3.mp4` }
      ]
    },
    {
      temaId: "esp_t24",
      titulo: "12. Tema 24",
      partes: [
        { id: "esp_t24_1", titulo: "Parte 1", archivo: `${BASE_URL}/12.Tema.24.-.1.mp4` },
        { id: "esp_t24_2", titulo: "Parte 2", archivo: `${BASE_URL}/12.Tema.24.-.2.mp4` }
      ]
    },
    {
      temaId: "esp_t25",
      titulo: "13. Tema 25",
      partes: [
        { id: "esp_t25_1", titulo: "Parte 1", archivo: `${BASE_URL}/13.Tema.25.-.1.mp4` }
      ]
    },
    {
      temaId: "esp_t01",
      titulo: "14. Tema 1",
      partes: [
        { id: "esp_t01_1", titulo: "Parte 1", archivo: `${BASE_URL}/14.Tema.1.-.1.mp4` }
      ]
    },
    {
      temaId: "esp_t02",
      titulo: "15. Tema 2",
      partes: [
        { id: "esp_t02_1", titulo: "Parte 1", archivo: `${BASE_URL}/15.Tema.2.-.1.mp4` }
      ]
    },
    {
      temaId: "esp_t03",
      titulo: "16. Tema 3",
      partes: [
        { id: "esp_t03_1", titulo: "Parte 1", archivo: `${BASE_URL}/16.Tema.3.-.1.mp4` }
      ]
    },
    {
      temaId: "esp_t06",
      titulo: "17. Tema 6",
      partes: [
        { id: "esp_t06_1", titulo: "Parte 1", archivo: `${BASE_URL}/17.Tema.6.-.1.mp4` }
      ]
    }
  ]
};

// 4. VARIABLES DE ESTADO Y REFERENCIAS AL DOM
let bloqueActual = "comun";
let pistaActual = null;
let temaAbiertoId = null;
let progresoGuardado = JSON.parse(localStorage.getItem("ama_podcast_progreso")) || {};
let vueltasGuardadas = JSON.parse(localStorage.getItem("ama_podcast_vueltas")) || {};
let autoPlayContinuo = JSON.parse(localStorage.getItem("ama_podcast_autoplay")) || false;

const velocidades = [1.0, 1.25, 1.5, 1.75, 2.0];
let idxVelocidad = 0;
let ultimoGuardado = 0;
let bloqueandoGuardado = false;

const audio = document.getElementById("audio-engine");
const listaEl = document.getElementById("lista-episodios");
const btnPlay = document.getElementById("btn-play");
const btnAuto = document.getElementById("btn-auto");
const progressBar = document.getElementById("progress-bar");
const timeCurrent = document.getElementById("time-current");
const timeTotal = document.getElementById("time-total");
const currentTitle = document.getElementById("current-title");
const currentPercent = document.getElementById("current-percent");

// Inicializar estado visual del botón Auto
function actualizarBotonAuto() {
  if (!btnAuto) return;
  btnAuto.textContent = autoPlayContinuo ? "Auto: ON" : "Auto: OFF";
  btnAuto.classList.toggle("active", autoPlayContinuo);
}
actualizarBotonAuto();

if (btnAuto) {
  btnAuto.onclick = () => {
    autoPlayContinuo = !autoPlayContinuo;
    localStorage.setItem("ama_podcast_autoplay", JSON.stringify(autoPlayContinuo));
    actualizarBotonAuto();
  };
}

// 5. SINCRONIZACIÓN EN TIEMPO REAL CON FIREBASE
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

// 6. LÓGICA DE CATÁLOGO, VUELTAS Y REPRODUCCIÓN
function localizarPistaEnCatalogo(parteId) {
  for (const bloque of ["comun", "especifico"]) {
    for (const tema of CATALOGO[bloque]) {
      const idx = tema.partes.findIndex(p => p.id === parteId);
      if (idx !== -1) {
        return { bloque, tema, indiceParte: idx };
      }
    }
  }
  return null;
}

function verificarTemaCompleto(parteId) {
  const info = localizarPistaEnCatalogo(parteId);
  if (!info) return false;

  const { tema } = info;
  const todasCompletadas = tema.partes.every(p => progresoGuardado[p.id]?.completed === true);

  if (todasCompletadas) {
    bloqueandoGuardado = true;
    const ahora = Date.now() + 100;
    const actual = vueltasGuardadas[tema.temaId]?.count || 0;
    const nuevoRegistroVueltas = { count: actual + 1, updatedAt: ahora };

    vueltasGuardadas[tema.temaId] = nuevoRegistroVueltas;
    localStorage.setItem("ama_podcast_vueltas", JSON.stringify(vueltasGuardadas));
    if (db) set(dbRef(db, `podcast_vueltas/${tema.temaId}`), nuevoRegistroVueltas);

    tema.partes.forEach(p => {
      const resetParte = {
        time: 0,
        duration: progresoGuardado[p.id]?.duration || 0,
        percent: 0,
        completed: false,
        updatedAt: ahora
      };
      progresoGuardado[p.id] = resetParte;
      if (db) set(dbRef(db, `podcast_progreso/${p.id}`), resetParte);
    });

    localStorage.setItem("ama_podcast_progreso", JSON.stringify(progresoGuardado));

    progressBar.style.width = "0%";
    timeCurrent.textContent = "00:00";
    currentPercent.textContent = "0%";
    currentTitle.textContent = `✓ ${tema.titulo} completado (+1 vuelta)`;
    pistaActual = null;

    setTimeout(() => { bloqueandoGuardado = false; }, 1000);
    return true;
  }
  return false;
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

function cargarPista(ep, tituloTema, esReintento = false) {
  if (pistaActual && pistaActual.id !== ep.id) {
    guardarProgreso(true);
  }

  bloqueandoGuardado = false;
  const nombreCompleto = `${tituloTema} · ${ep.titulo}`;
  pistaActual = { ...ep, nombreCompleto, tituloTema };
  currentTitle.textContent = "Cargando " + nombreCompleto + "...";

  audio.onloadedmetadata = null;
  audio.onerror = null;
  audio.pause();

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

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          btnPlay.textContent = "❚❚";
        })
        .catch(() => {
          btnPlay.textContent = "▶";
          currentTitle.textContent = "Listo: " + nombreCompleto;
        });
    }
    actualizarMediaSession(nombreCompleto);
    renderLista();
  };

  audio.onerror = () => {
    if (!esReintento) {
      setTimeout(() => cargarPista(ep, tituloTema, true), 800);
      return;
    }
    currentTitle.textContent = "⚠️ Error al cargar el audio desde GitHub";
    btnPlay.textContent = "▶";
  };

  audio.load();
}

function guardarProgreso(forzar = false, esFinDePista = false) {
  if (bloqueandoGuardado || !pistaActual || !audio.duration) return false;

  const ahora = Date.now();
  if (!forzar && ahora - ultimoGuardado < 5000) return false;
  ultimoGuardado = ahora;

  const percent = esFinDePista ? 100 : Math.min(100, Math.round((audio.currentTime / audio.duration) * 100));
  const completed = esFinDePista || percent >= 96;

  const idPista = pistaActual.id;
  const registro = {
    time: completed ? 0 : Math.floor(audio.currentTime),
    duration: Math.floor(audio.duration),
    percent: completed ? 100 : percent,
    completed: completed,
    updatedAt: ahora
  };

  progresoGuardado[idPista] = registro;
  localStorage.setItem("ama_podcast_progreso", JSON.stringify(progresoGuardado));
  if (db) set(dbRef(db, `podcast_progreso/${idPista}`), registro);

  let temaCompletado = false;
  if (completed) {
    temaCompletado = verificarTemaCompleto(idPista);
  }

  renderLista();
  return temaCompletado;
}

audio.ontimeupdate = () => {
  if (bloqueandoGuardado || !pistaActual || !audio.duration) return;
  const pct = Math.round((audio.currentTime / audio.duration) * 100);
  progressBar.style.width = `${pct}%`;
  timeCurrent.textContent = formatTime(audio.currentTime);
  currentPercent.textContent = `${pct}%`;
  guardarProgreso(false, false);
};

audio.onpause = () => {
  btnPlay.textContent = "▶";
  if (!audio.ended && !bloqueandoGuardado) {
    guardarProgreso(true, false);
  }
};

audio.onended = () => {
  btnPlay.textContent = "▶";
  if (!pistaActual) return;

  const pistaTerminadaId = pistaActual.id;
  const info = localizarPistaEnCatalogo(pistaTerminadaId);
  const temaAcabado = guardarProgreso(true, true);

  if (autoPlayContinuo && !temaAcabado && info) {
    const siguienteParte = info.tema.partes[info.indiceParte + 1];
    if (siguienteParte) {
      cargarPista(siguienteParte, info.tema.titulo);
    }
  }
};

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
  guardarProgreso(true, false);
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