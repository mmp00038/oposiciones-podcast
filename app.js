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

  // Marca la pista como 100% terminada y comprueba si se completó el tema entero
  const temaAcabado = guardarProgreso(true, true);

  // Si Auto: ON está activo y el tema aún tiene más pistas por delante, pasa a la siguiente
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