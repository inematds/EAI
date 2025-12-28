# EAI Games - Sistema de Economia

## Visão Geral

Este documento define as regras oficiais do sistema de economia dos jogos EAI. Todas as implementações devem seguir estas diretrizes para manter consistência.

---

## 1. Moedas (Currencies)

### Tipos de Moeda
| Moeda | Símbolo | Valor Base | Uso Principal |
|-------|---------|------------|---------------|
| **Moedas Bronze** | 🪙 | 1 | Compras básicas, desbloqueios simples |
| **Diamantes** | 💎 | 100 moedas | Itens especiais, personagens |
| **Ouro** | 🥇 | 1000 moedas | Itens premium, conteúdo exclusivo |

### Conversão
- 100 Moedas Bronze = 1 Diamante
- 1000 Moedas Bronze = 1 Ouro
- 10 Diamantes = 1 Ouro

---

## 2. Sistema de Pontuação por Jogo

### 2.1 Ganho de Moedas (Acertos)

| Desempenho | Acertos | Multiplicador | Descrição |
|------------|---------|---------------|-----------|
| **Normal** | < 90% | 1x | Ganho base |
| **Excelente** | 90-99% | 2x | Dobro de moedas |
| **Perfeito** | 100% | 3x | Triplo de moedas |

### 2.2 Perda de Moedas (Erros)

| Tipo de Erro | Penalidade | Limite |
|--------------|------------|--------|
| Erro simples | -1 moeda | Mínimo 0 (não fica negativo) |
| Erro grave | -2 moedas | Mínimo 0 |
| Game Over | -5 moedas | Mínimo 0 |

### 2.3 Recompensa Base por Tipo de Jogo

| Categoria | Base por Acerto | Bônus Conclusão |
|-----------|-----------------|-----------------|
| **Quiz/Educacional** | 2 moedas | 10 moedas |
| **Arcade** | 1 moeda | 5 moedas |
| **Puzzle** | 3 moedas | 15 moedas |
| **Memória** | 2 moedas | 10 moedas |

### 2.4 Fórmula de Cálculo

```javascript
// Cálculo de recompensa final
function calcularRecompensa(acertos, total, baseRecompensa, bonusConclusao) {
  const percentual = (acertos / total) * 100;
  const erros = total - acertos;

  // Multiplicador baseado no percentual
  let multiplicador = 1;
  if (percentual === 100) multiplicador = 3;
  else if (percentual >= 90) multiplicador = 2;

  // Ganhos
  const ganhoBase = acertos * baseRecompensa;
  const ganhoTotal = (ganhoBase + bonusConclusao) * multiplicador;

  // Penalidades
  const penalidade = erros * 1; // -1 por erro

  // Total final (nunca negativo)
  return Math.max(0, ganhoTotal - penalidade);
}
```

---

## 3. Bônus de Tempo

### Ganho Passivo
Os jogadores ganham moedas automaticamente por tempo jogado:

| Tempo | Recompensa |
|-------|------------|
| A cada 5 minutos jogando | +1 moeda |
| A cada 30 minutos jogando | +1 diamante |
| Login diário | +10 moedas |

### Bônus de Streak (Sequência)
| Dias Consecutivos | Bônus |
|-------------------|-------|
| 3 dias | +5 moedas |
| 7 dias | +1 diamante |
| 30 dias | +1 ouro |

---

## 4. Sistema de Loja

### 4.1 Categorias de Compra

#### Personagens
| Raridade | Preço | Como Desbloquear |
|----------|-------|------------------|
| Comum | 50 moedas | Compra |
| Raro | 200 moedas | Compra ou Nível 10+ |
| Épico | 2 diamantes | Compra ou Nível 25+ |
| Lendário | 1 ouro | Compra ou Nível 50+ |

#### Caminhos/Temas
| Tipo | Preço |
|------|-------|
| Tema básico | 30 moedas |
| Tema especial | 100 moedas |
| Tema sazonal | 1 diamante |

#### Níveis Extras
| Tipo | Preço |
|------|-------|
| Pack de 5 níveis | 50 moedas |
| Mundo novo | 2 diamantes |
| Expansão completa | 5 diamantes |

#### Desafios Especiais
| Tipo | Preço | Recompensa |
|------|-------|------------|
| Desafio diário | Grátis | 10-20 moedas |
| Desafio semanal | 10 moedas | 1 diamante |
| Desafio mensal | 50 moedas | 1 ouro |

### 4.2 Desbloqueio por Nível

Alguns itens podem ser desbloqueados gratuitamente ao atingir certos níveis:

| Nível | Desbloqueios |
|-------|--------------|
| 5 | 1 personagem comum |
| 10 | 1 tema básico |
| 15 | 1 personagem raro |
| 25 | 1 tema especial |
| 50 | 1 personagem épico |
| 100 | 1 personagem lendário |

---

## 5. Exibição de Ganhos (UX)

### Regras de Interface
1. **Não intrusivo**: Ganhos aparecem de forma sutil, sem interromper gameplay
2. **Rápido**: Animação dura no máximo 1.5 segundos
3. **Posição**: Canto superior direito ou inferior direito
4. **Cor**: Verde para ganhos, vermelho para perdas

### Formato Visual
```
+10 🪙  (ganho normal)
+20 🪙 2x  (bônus excelente)
+30 🪙 3x  (bônus perfeito)
-2 🪙  (penalidade)
```

### Toast de Recompensa
- Aparece por 1.5 segundos
- Fade in/out suave (0.3s)
- Não bloqueia interação
- Empilha se múltiplos ganhos

---

## 6. Armazenamento

### LocalStorage Keys
```javascript
const STORAGE_KEYS = {
  wallet: 'eai_wallet',           // { coins, diamonds, gold }
  inventory: 'eai_inventory',     // { characters: [], themes: [], levels: [] }
  progress: 'eai_progress',       // { level, xp, streak, lastLogin }
  stats: 'eai_stats',             // { totalGames, totalScore, totalTime }
  unlocks: 'eai_unlocks'          // { byLevel: [], byPurchase: [] }
};
```

### Estrutura da Carteira
```javascript
{
  coins: 0,
  diamonds: 0,
  gold: 0,
  lastUpdated: "ISO_DATE",
  totalEarned: {
    coins: 0,
    diamonds: 0,
    gold: 0
  }
}
```

---

## 7. API de Referência

### Funções Disponíveis

```javascript
// === Carteira ===
getWallet()                    // Retorna { coins, diamonds, gold }
addCoins(amount)               // Adiciona moedas
removeCoins(amount)            // Remove moedas (retorna false se insuficiente)
addDiamonds(amount)            // Adiciona diamantes
addGold(amount)                // Adiciona ouro
canAfford(type, amount)        // Verifica se pode pagar
purchase(type, amount)         // Realiza compra

// === Pontuação ===
calculateReward(config)        // Calcula recompensa baseado nas regras
giveReward(type, amount)       // Dá recompensa com animação
showRewardToast(message)       // Mostra toast de recompensa
applyPenalty(amount)           // Aplica penalidade

// === Progresso ===
getProgress()                  // Retorna nível, XP, streak
addXP(amount)                  // Adiciona experiência
checkLevelUp()                 // Verifica e aplica level up
updateStreak()                 // Atualiza streak diária

// === Loja ===
getShopItems()                 // Lista itens da loja
purchaseItem(itemId)           // Compra item
isUnlocked(itemId)             // Verifica se item está desbloqueado
getInventory()                 // Retorna itens do jogador
```

---

## 8. Exemplos de Implementação

### Quiz com Sistema de Pontuação
```javascript
function finalizarQuiz(acertos, total) {
  const config = {
    acertos: acertos,
    total: total,
    baseRecompensa: 2,      // Quiz = 2 moedas por acerto
    bonusConclusao: 10      // Quiz = 10 moedas bônus
  };

  const recompensa = EAI.calculateReward(config);
  EAI.giveReward('coins', recompensa.total);

  // Mostrar feedback
  if (recompensa.multiplicador === 3) {
    EAI.showRewardToast(`PERFEITO! +${recompensa.total} 🪙 (3x)`);
  } else if (recompensa.multiplicador === 2) {
    EAI.showRewardToast(`Excelente! +${recompensa.total} 🪙 (2x)`);
  } else {
    EAI.showRewardToast(`+${recompensa.total} 🪙`);
  }
}
```

### Jogo Arcade com Penalidades
```javascript
function onAcerto() {
  score += 10;
  EAI.addCoins(1);
  EAI.showRewardToast('+1 🪙', 'mini'); // Toast pequeno
}

function onErro() {
  lives--;
  EAI.applyPenalty(1);
  EAI.showRewardToast('-1 🪙', 'mini', 'error');
}

function onGameOver() {
  const percentual = (acertos / total) * 100;
  EAI.applyPenalty(5); // Penalidade de game over

  // Bônus de conclusão baseado no desempenho
  if (percentual >= 90) {
    EAI.giveReward('coins', 10);
  }
}
```

---

## 9. Changelog

| Versão | Data | Mudanças |
|--------|------|----------|
| 1.0.0 | 2024-12-28 | Documento inicial |

---

## 10. Notas de Implementação

1. **Sempre validar no cliente E servidor** (quando aplicável)
2. **Nunca permitir valores negativos** na carteira
3. **Logs de transação** para debug
4. **Animações não-bloqueantes** para UX fluida
5. **Fallback graceful** se localStorage não disponível
