/**
 * EAI Games - Contador de Jogadas com Firebase
 * Conta quantas vezes cada jogo foi jogado
 */

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCYurXxeGx6bOb7hgm2rwk09NI4TN8CFcM",
  authDomain: "inematds-80d25.firebaseapp.com",
  databaseURL: "https://inematds-80d25-default-rtdb.firebaseio.com",
  projectId: "inematds-80d25",
  storageBucket: "inematds-80d25.firebasestorage.app",
  messagingSenderId: "807705373058",
  appId: "1:807705373058:web:cd5ed3acfeb4a3eef6c79b"
};

// Variáveis globais
let eaiDatabase = null;
let gameId = null;

// Inicializar Firebase (usando SDK via CDN)
function initEaiCounter(gameSlug) {
  gameId = gameSlug;

  // Carregar Firebase SDK se ainda não foi carregado
  if (typeof firebase === 'undefined') {
    // Carregar script do Firebase
    const script = document.createElement('script');
    script.src = 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js';
    script.onload = () => {
      const dbScript = document.createElement('script');
      dbScript.src = 'https://www.gstatic.com/firebasejs/9.23.0/firebase-database-compat.js';
      dbScript.onload = () => {
        setupFirebase();
      };
      document.head.appendChild(dbScript);
    };
    document.head.appendChild(script);
  } else {
    setupFirebase();
  }
}

function setupFirebase() {
  try {
    // Inicializar app se não existir
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    eaiDatabase = firebase.database();

    // Incrementar contador de visualizações
    incrementViewCount();

    // Exibir contador atual
    displayPlayCount();
  } catch (error) {
    console.log('EAI Counter: Firebase não disponível', error);
  }
}

// Incrementar contador de visualizações (quando abre o jogo)
function incrementViewCount() {
  if (!eaiDatabase || !gameId) return;

  const viewRef = eaiDatabase.ref(`games/${gameId}/views`);
  viewRef.transaction((current) => (current || 0) + 1);
}

// Incrementar contador de jogadas (quando começa a jogar de fato)
function incrementPlayCount() {
  if (!eaiDatabase || !gameId) return;

  const playRef = eaiDatabase.ref(`games/${gameId}/plays`);
  playRef.transaction((current) => (current || 0) + 1);
}

// Exibir contador de jogadas
function displayPlayCount() {
  if (!eaiDatabase || !gameId) return;

  const playRef = eaiDatabase.ref(`games/${gameId}/plays`);
  playRef.on('value', (snapshot) => {
    const count = snapshot.val() || 0;
    updateCounterDisplay(count);
  });
}

// Atualizar display do contador na UI
function updateCounterDisplay(count) {
  // Formatar número
  const formattedCount = formatNumber(count);

  // Atualizar contador no header (se existir)
  const headerCount = document.getElementById('eai-header-count-value');
  if (headerCount) {
    headerCount.textContent = formattedCount;
  }
}

// Formatar número grande (1500 -> 1.5k, 1500000 -> 1.5M)
function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace('.0', '') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace('.0', '') + 'k';
  }
  return num.toLocaleString('pt-BR');
}

// Expor funções globalmente
window.initEaiCounter = initEaiCounter;
window.incrementPlayCount = incrementPlayCount;
