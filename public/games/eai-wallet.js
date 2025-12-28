/**
 * EAI Wallet System - Sistema de Moedas para jogos EAI
 * Guarda tudo no localStorage do navegador
 */

const WALLET_KEY = 'eai_wallet';

// Valores de conversão
const CURRENCY_VALUES = {
  coin: 1,        // Moeda bronze
  diamond: 100,   // Diamante = 100 moedas
  gold: 1000,     // Ouro = 1000 moedas
};

// Obter carteira atual
function getWallet() {
  try {
    const data = localStorage.getItem(WALLET_KEY);
    return data ? JSON.parse(data) : { coins: 0, diamonds: 0, gold: 0 };
  } catch {
    return { coins: 0, diamonds: 0, gold: 0 };
  }
}

// Salvar carteira
function saveWallet(wallet) {
  wallet.lastUpdated = new Date().toISOString();
  localStorage.setItem(WALLET_KEY, JSON.stringify(wallet));
}

// Adicionar moedas
function addCoins(amount) {
  const wallet = getWallet();
  wallet.coins += amount;
  saveWallet(wallet);
  return wallet;
}

// Adicionar diamantes
function addDiamonds(amount) {
  const wallet = getWallet();
  wallet.diamonds += amount;
  saveWallet(wallet);
  return wallet;
}

// Adicionar ouro
function addGold(amount) {
  const wallet = getWallet();
  wallet.gold += amount;
  saveWallet(wallet);
  return wallet;
}

// Total em moedas
function getTotalInCoins() {
  const wallet = getWallet();
  return wallet.coins + (wallet.diamonds * CURRENCY_VALUES.diamond) + (wallet.gold * CURRENCY_VALUES.gold);
}

// Criar e mostrar o baú do tesouro
function createTreasureChest() {
  // Estilos do baú
  const styles = `
    .eai-chest-btn {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 70px;
      height: 70px;
      background: linear-gradient(135deg, #F59E0B, #D97706);
      border: 4px solid #92400E;
      border-radius: 12px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2.5rem;
      box-shadow: 0 6px 20px rgba(0,0,0,0.3), inset 0 -4px 0 rgba(0,0,0,0.2);
      transition: transform 0.2s, box-shadow 0.2s;
      z-index: 9999;
      animation: chestBounce 2s ease-in-out infinite;
    }
    .eai-chest-btn:hover {
      transform: scale(1.1);
      box-shadow: 0 8px 25px rgba(0,0,0,0.4);
    }
    .eai-chest-btn.open {
      animation: chestOpen 0.5s ease forwards;
    }
    @keyframes chestBounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-5px); }
    }
    @keyframes chestOpen {
      0% { transform: scale(1); }
      50% { transform: scale(1.2) rotate(-5deg); }
      100% { transform: scale(1); }
    }

    .eai-chest-modal {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.7);
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      backdrop-filter: blur(5px);
    }
    .eai-chest-modal.show {
      display: flex;
      animation: fadeIn 0.3s ease;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .eai-chest-content {
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      border: 4px solid #F59E0B;
      border-radius: 20px;
      padding: 2rem;
      min-width: 320px;
      max-width: 90%;
      text-align: center;
      animation: slideUp 0.3s ease;
      box-shadow: 0 20px 50px rgba(0,0,0,0.5);
    }
    @keyframes slideUp {
      from { transform: translateY(50px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    .eai-chest-title {
      font-size: 1.8rem;
      color: #F59E0B;
      margin-bottom: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }

    .eai-currency-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .eai-currency-item {
      background: rgba(255,255,255,0.1);
      border-radius: 12px;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
    }
    .eai-currency-icon {
      font-size: 2.5rem;
      animation: coinSpin 3s linear infinite;
    }
    .eai-currency-item:nth-child(2) .eai-currency-icon {
      animation-delay: -1s;
    }
    .eai-currency-item:nth-child(3) .eai-currency-icon {
      animation-delay: -2s;
    }
    @keyframes coinSpin {
      0%, 100% { transform: rotateY(0deg); }
      50% { transform: rotateY(180deg); }
    }
    .eai-currency-value {
      font-size: 1.5rem;
      font-weight: bold;
      color: white;
    }
    .eai-currency-label {
      font-size: 0.8rem;
      color: #999;
      text-transform: uppercase;
    }
    .eai-currency-item.coins { border: 2px solid #CD7F32; }
    .eai-currency-item.coins .eai-currency-value { color: #CD7F32; }
    .eai-currency-item.diamonds { border: 2px solid #00D4FF; }
    .eai-currency-item.diamonds .eai-currency-value { color: #00D4FF; }
    .eai-currency-item.gold { border: 2px solid #FFD700; }
    .eai-currency-item.gold .eai-currency-value { color: #FFD700; }

    .eai-total-section {
      background: linear-gradient(135deg, #F59E0B, #D97706);
      border-radius: 12px;
      padding: 1rem;
      margin-bottom: 1rem;
    }
    .eai-total-label {
      font-size: 0.9rem;
      color: rgba(255,255,255,0.8);
      margin-bottom: 0.25rem;
    }
    .eai-total-value {
      font-size: 2rem;
      font-weight: bold;
      color: white;
    }

    .eai-chest-close {
      background: rgba(255,255,255,0.2);
      border: none;
      color: white;
      padding: 0.75rem 2rem;
      border-radius: 8px;
      cursor: pointer;
      font-size: 1rem;
      transition: background 0.2s;
    }
    .eai-chest-close:hover {
      background: rgba(255,255,255,0.3);
    }

    .eai-reward-popup {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0);
      background: linear-gradient(135deg, #10B981, #059669);
      color: white;
      padding: 1.5rem 2.5rem;
      border-radius: 16px;
      font-size: 1.5rem;
      font-weight: bold;
      z-index: 10001;
      box-shadow: 0 10px 40px rgba(0,0,0,0.4);
      display: flex;
      align-items: center;
      gap: 0.75rem;
      pointer-events: none;
    }
    .eai-reward-popup.show {
      animation: rewardPop 2s ease forwards;
    }
    @keyframes rewardPop {
      0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
      20% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
      30% { transform: translate(-50%, -50%) scale(1); }
      80% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
      100% { transform: translate(-50%, -60%) scale(0.8); opacity: 0; }
    }
  `;

  // Injetar estilos
  const styleEl = document.createElement('style');
  styleEl.textContent = styles;
  document.head.appendChild(styleEl);

  // Criar botão do baú
  const chestBtn = document.createElement('button');
  chestBtn.className = 'eai-chest-btn';
  chestBtn.innerHTML = '🎁';
  chestBtn.title = 'Abrir Baú do Tesouro';
  document.body.appendChild(chestBtn);

  // Criar modal
  const modal = document.createElement('div');
  modal.className = 'eai-chest-modal';
  modal.innerHTML = `
    <div class="eai-chest-content">
      <div class="eai-chest-title">🏆 Baú do Tesouro</div>
      <div class="eai-currency-grid">
        <div class="eai-currency-item coins">
          <span class="eai-currency-icon">🪙</span>
          <span class="eai-currency-value" id="wallet-coins">0</span>
          <span class="eai-currency-label">Moedas</span>
        </div>
        <div class="eai-currency-item diamonds">
          <span class="eai-currency-icon">💎</span>
          <span class="eai-currency-value" id="wallet-diamonds">0</span>
          <span class="eai-currency-label">Diamantes</span>
        </div>
        <div class="eai-currency-item gold">
          <span class="eai-currency-icon">🥇</span>
          <span class="eai-currency-value" id="wallet-gold">0</span>
          <span class="eai-currency-label">Ouro</span>
        </div>
      </div>
      <div class="eai-total-section">
        <div class="eai-total-label">Valor Total em Moedas</div>
        <div class="eai-total-value" id="wallet-total">0</div>
      </div>
      <button class="eai-chest-close">Fechar</button>
    </div>
  `;
  document.body.appendChild(modal);

  // Criar popup de recompensa
  const rewardPopup = document.createElement('div');
  rewardPopup.className = 'eai-reward-popup';
  rewardPopup.id = 'reward-popup';
  document.body.appendChild(rewardPopup);

  // Event listeners
  chestBtn.addEventListener('click', () => {
    chestBtn.classList.add('open');
    setTimeout(() => chestBtn.classList.remove('open'), 500);
    updateWalletDisplay();
    modal.classList.add('show');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('eai-chest-close')) {
      modal.classList.remove('show');
    }
  });
}

// Atualizar display da carteira
function updateWalletDisplay() {
  const wallet = getWallet();
  const coinsEl = document.getElementById('wallet-coins');
  const diamondsEl = document.getElementById('wallet-diamonds');
  const goldEl = document.getElementById('wallet-gold');
  const totalEl = document.getElementById('wallet-total');

  if (coinsEl) coinsEl.textContent = wallet.coins.toLocaleString('pt-BR');
  if (diamondsEl) diamondsEl.textContent = wallet.diamonds.toLocaleString('pt-BR');
  if (goldEl) goldEl.textContent = wallet.gold.toLocaleString('pt-BR');
  if (totalEl) totalEl.textContent = getTotalInCoins().toLocaleString('pt-BR');
}

// Mostrar popup de recompensa
function showReward(type, amount) {
  const popup = document.getElementById('reward-popup');
  if (!popup) return;

  const icons = { coins: '🪙', diamonds: '💎', gold: '🥇' };
  const names = { coins: 'Moedas', diamonds: 'Diamantes', gold: 'Ouro' };

  popup.innerHTML = `${icons[type]} +${amount} ${names[type]}!`;
  popup.classList.remove('show');

  // Force reflow
  void popup.offsetWidth;

  popup.classList.add('show');

  setTimeout(() => {
    popup.classList.remove('show');
  }, 2000);
}

// Dar recompensa e mostrar animação
function giveReward(type, amount) {
  if (type === 'coins') addCoins(amount);
  else if (type === 'diamonds') addDiamonds(amount);
  else if (type === 'gold') addGold(amount);

  showReward(type, amount);
}

// Inicializar quando o DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', createTreasureChest);
} else {
  createTreasureChest();
}
