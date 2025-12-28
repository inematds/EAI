// Local storage utilities for favorites, history, and EAI Coins

const FAVORITES_KEY = 'eai_favorites';
const HISTORY_KEY = 'eai_history';
const ANALYTICS_KEY = 'eai_analytics';
const WALLET_KEY = 'eai_wallet';

export interface PlayHistoryItem {
  gameId: string;
  slug: string;
  area: 'ARCADE' | 'EDUCATIONAL';
  playedAt: string;
}

export interface AnalyticsData {
  totalPlays: number;
  gameClicks: Record<string, number>;
  lastUpdated: string;
}

// EAI Wallet - Coins, Diamonds, Gold
export interface EaiWallet {
  coins: number;      // Moedas básicas (bronze)
  diamonds: number;   // Diamantes (raros)
  gold: number;       // Ouro (premium)
  lastUpdated: string;
}

// Conversion rates: 1 diamond = 100 coins, 1 gold = 10 diamonds = 1000 coins
export const CURRENCY_VALUES = {
  coin: 1,
  diamond: 100,
  gold: 1000,
};

// Favorites
export function getFavorites(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function addFavorite(gameId: string): void {
  if (typeof window === 'undefined') return;
  const favorites = getFavorites();
  if (!favorites.includes(gameId)) {
    favorites.push(gameId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
}

export function removeFavorite(gameId: string): void {
  if (typeof window === 'undefined') return;
  const favorites = getFavorites().filter((id) => id !== gameId);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function isFavorite(gameId: string): boolean {
  return getFavorites().includes(gameId);
}

export function toggleFavorite(gameId: string): boolean {
  if (isFavorite(gameId)) {
    removeFavorite(gameId);
    return false;
  } else {
    addFavorite(gameId);
    return true;
  }
}

// Play History
export function getPlayHistory(): PlayHistoryItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function addToHistory(gameId: string, slug: string, area: 'ARCADE' | 'EDUCATIONAL'): void {
  if (typeof window === 'undefined') return;

  const history = getPlayHistory();

  // Remove if already exists (to move to top)
  const filtered = history.filter((item) => item.gameId !== gameId);

  // Add to beginning
  filtered.unshift({
    gameId,
    slug,
    area,
    playedAt: new Date().toISOString(),
  });

  // Keep only last 20 items
  const trimmed = filtered.slice(0, 20);

  localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));
}

export function clearHistory(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(HISTORY_KEY);
}

// Analytics
export function getAnalytics(): AnalyticsData {
  if (typeof window === 'undefined') {
    return { totalPlays: 0, gameClicks: {}, lastUpdated: new Date().toISOString() };
  }
  try {
    const data = localStorage.getItem(ANALYTICS_KEY);
    return data
      ? JSON.parse(data)
      : { totalPlays: 0, gameClicks: {}, lastUpdated: new Date().toISOString() };
  } catch {
    return { totalPlays: 0, gameClicks: {}, lastUpdated: new Date().toISOString() };
  }
}

export function trackGameClick(gameId: string): void {
  if (typeof window === 'undefined') return;

  const analytics = getAnalytics();
  analytics.totalPlays++;
  analytics.gameClicks[gameId] = (analytics.gameClicks[gameId] || 0) + 1;
  analytics.lastUpdated = new Date().toISOString();

  localStorage.setItem(ANALYTICS_KEY, JSON.stringify(analytics));
}

export function getMostPlayedGames(limit = 5): { gameId: string; plays: number }[] {
  const analytics = getAnalytics();
  return Object.entries(analytics.gameClicks)
    .map(([gameId, plays]) => ({ gameId, plays }))
    .sort((a, b) => b.plays - a.plays)
    .slice(0, limit);
}

// EAI Wallet Functions
export function getWallet(): EaiWallet {
  if (typeof window === 'undefined') {
    return { coins: 0, diamonds: 0, gold: 0, lastUpdated: new Date().toISOString() };
  }
  try {
    const data = localStorage.getItem(WALLET_KEY);
    return data
      ? JSON.parse(data)
      : { coins: 0, diamonds: 0, gold: 0, lastUpdated: new Date().toISOString() };
  } catch {
    return { coins: 0, diamonds: 0, gold: 0, lastUpdated: new Date().toISOString() };
  }
}

export function addCoins(amount: number): EaiWallet {
  if (typeof window === 'undefined') return getWallet();
  const wallet = getWallet();
  wallet.coins += amount;
  wallet.lastUpdated = new Date().toISOString();
  localStorage.setItem(WALLET_KEY, JSON.stringify(wallet));
  return wallet;
}

export function addDiamonds(amount: number): EaiWallet {
  if (typeof window === 'undefined') return getWallet();
  const wallet = getWallet();
  wallet.diamonds += amount;
  wallet.lastUpdated = new Date().toISOString();
  localStorage.setItem(WALLET_KEY, JSON.stringify(wallet));
  return wallet;
}

export function addGold(amount: number): EaiWallet {
  if (typeof window === 'undefined') return getWallet();
  const wallet = getWallet();
  wallet.gold += amount;
  wallet.lastUpdated = new Date().toISOString();
  localStorage.setItem(WALLET_KEY, JSON.stringify(wallet));
  return wallet;
}

export function getTotalInCoins(): number {
  const wallet = getWallet();
  return wallet.coins + (wallet.diamonds * CURRENCY_VALUES.diamond) + (wallet.gold * CURRENCY_VALUES.gold);
}
