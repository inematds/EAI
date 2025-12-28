# EAI Games - Padrões de Desenvolvimento

> Documento de referência com todos os padrões definidos para criação e alteração de jogos na plataforma EAI Games.

---

## 1. Estrutura de Arquivos

### Jogos HTML5
```
/public/games/
├── eai-wallet.js       # Sistema de moedas (obrigatório em todos os jogos)
├── eai-header.js       # Barra superior com links (obrigatório em todos os jogos)
├── [nome-do-jogo].html # Arquivo do jogo (self-contained)
```

### Dados dos Jogos
```
/src/data/
├── educational-games.ts  # Jogos educacionais
├── arcade-games.ts       # Jogos arcade
```

---

## 2. Barra Superior (Header)

**OBRIGATÓRIO em todos os jogos.**

### Incluir no HTML
```html
<script src="eai-header.js"></script>
</body>
```

### Elementos da Barra
| Posição | Elemento | Link/Ação |
|---------|----------|-----------|
| Esquerda | 🌊 INEMA.CLUB | https://inema.club (nova aba) |
| Esquerda | 🎮 EAI Games | / (página inicial) |
| Direita | 📤 Compartilhar | Menu de compartilhamento |

### Opções de Compartilhamento
- 💬 WhatsApp
- 📘 Facebook
- 🐦 Twitter / X
- ✈️ Telegram
- 🔗 Copiar Link

---

## 3. Sistema de Moedas (EAI Wallet)

**OBRIGATÓRIO em todos os jogos.**

### Incluir no HTML
```html
<script src="eai-wallet.js"></script>
```

### Tipos de Moeda
| Tipo | Emoji | Valor em Moedas | Descrição |
|------|-------|-----------------|-----------|
| Coin | 🪙 | 1 | Moeda básica |
| Diamond | 💎 | 100 | Conquistas médias |
| Gold | 🥇 | 1000 | Conquistas raras |

### Funções Disponíveis
```javascript
// Dar recompensa ao jogador
giveReward('coin', quantidade);    // Moedas
giveReward('diamond', quantidade); // Diamantes
giveReward('gold', quantidade);    // Ouro

// Obter wallet atual
const wallet = getWallet();
// wallet.coins, wallet.diamonds, wallet.gold
```

### Baú do Tesouro
- Botão flutuante no canto inferior direito (🎁)
- Abre modal mostrando moedas, diamantes e ouro
- Total convertido em moedas

---

## 4. Sistema de Recompensas

### Padrão de Recompensas por Ação

| Ação | Coins | Diamonds | Gold |
|------|-------|----------|------|
| Acerto simples | 5-15 | - | - |
| Acerto com streak | +2 por streak | - | - |
| Completar rodada | 20-50 | 1 | - |
| Performance 70%+ | - | 1 | - |
| Performance 90%+ | - | 2 | - |
| Performance 100% | - | - | 1 |
| Recorde pessoal | - | 1-2 | 1 |

### Sistema de Vidas
- Padrão: 5 vidas (❤️)
- Erro: -1 vida
- Game Over quando vidas = 0
- Pode reiniciar o jogo

### Sistema de Pontos
- Erros subtraem pontos (5-10 pontos)
- Pontuação mínima = 0 (não fica negativa)

---

## 5. Níveis Pagos com Moedas

### Estrutura de Níveis
```javascript
// Exemplo: Vocabulário Mundial
Nível 1: Grátis (aprender/acumular moedas)
Nível 2: 10.000 moedas (desafio intermediário)
Nível 3: 30.000 moedas (desafio avançado)
```

### Regras
1. **Nível 1 sempre grátis** - permite acumular moedas
2. Jogador pode repetir níveis para ganhar mais moedas
3. Moedas são compartilhadas entre todos os jogos
4. Modal de desbloqueio mostra preço e saldo atual

### Implementação
```javascript
const LEVEL_PRICES = { 2: 10000, 3: 30000 };

function confirmUnlock() {
    if (state.coins >= price) {
        state.coins -= price;
        // Atualizar wallet
        const wallet = getWallet();
        wallet.coins -= price;
        localStorage.setItem('eai_wallet', JSON.stringify(wallet));
    }
}
```

---

## 6. Design Visual

### Paleta de Cores por Categoria

| Categoria | Cor Principal | Gradiente |
|-----------|--------------|-----------|
| Matemática | #F59E0B | Amarelo/Laranja |
| Português | #EC4899 | Rosa/Magenta |
| Inglês | #14B8A6 | Turquesa |
| Ciências | #06B6D4 | Ciano |
| Geografia | #22C55E | Verde |
| Lógica | #A855F7 | Roxo |
| Arcade | #EF4444 | Vermelho |

### Padrões de UI

```css
/* Botão primário */
.btn-primary {
    background: linear-gradient(135deg, #667eea, #764ba2);
    border-radius: 25px;
    padding: 12px 30px;
    font-weight: bold;
}

/* Cartão de jogo */
.game-card {
    background: rgba(255,255,255,0.95);
    border-radius: 20px;
    padding: 25px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.2);
}

/* Feedback de sucesso */
.feedback.success {
    background: linear-gradient(135deg, #d4fc79, #96e6a1);
    color: #1a5928;
}

/* Feedback de erro */
.feedback.error {
    background: linear-gradient(135deg, #ffecd2, #fcb69f);
    color: #9a3412;
}
```

### Animações Padrão
```css
/* Bounce para emojis/ícones */
@keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
}

/* Shake para erros */
@keyframes shake {
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
}

/* Pulse para acertos */
@keyframes pulse {
    50% { transform: scale(1.1); }
}
```

---

## 7. Áudio e Fala

### Speech Synthesis (Text-to-Speech)
```javascript
function speak(text, lang) {
    if (!('speechSynthesis' in window)) return;

    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const langCodes = {
        pt: 'pt-BR',
        en: 'en-US',
        es: 'es-ES'
    };
    utterance.lang = langCodes[lang] || 'en-US';
    utterance.rate = 0.85; // Velocidade mais lenta para aprendizado

    speechSynthesis.speak(utterance);
}
```

### Padrão de Uso
- Auto-play ao mostrar palavra/pergunta
- Botão 🔊 para repetir
- Animação no botão enquanto fala

---

## 8. Armazenamento (localStorage)

### Chaves Padrão
| Chave | Descrição |
|-------|-----------|
| `eai_wallet` | Moedas, diamantes e ouro |
| `eai_favorites` | Jogos favoritos |
| `eai_history` | Histórico de jogos |
| `[jogo]_state` | Estado específico do jogo |

### Estrutura da Wallet
```javascript
{
    coins: 0,
    diamonds: 0,
    gold: 0,
    lastUpdated: "2024-01-01T00:00:00.000Z"
}
```

### Salvamento de Estado do Jogo
```javascript
function saveState() {
    localStorage.setItem('meu_jogo_state', JSON.stringify({
        score: state.score,
        level: state.level,
        unlockedLevels: state.unlockedLevels,
        // ... outros dados
    }));
}

function loadState() {
    const saved = localStorage.getItem('meu_jogo_state');
    if (saved) {
        state = { ...state, ...JSON.parse(saved) };
    }
}
```

---

## 9. Responsividade

### Breakpoints
```css
/* Mobile */
@media (max-width: 600px) {
    /* Ajustes para telas pequenas */
}

/* Tablet */
@media (max-width: 900px) {
    /* Ajustes para tablets */
}
```

### Regras
1. Jogos devem funcionar em telas de 320px+
2. Touch-friendly: botões mínimo 44x44px
3. Texto legível sem zoom
4. Scroll vertical OK, evitar scroll horizontal

---

## 10. Cadastro de Novo Jogo

### 1. Criar arquivo HTML
```
/public/games/meu-jogo.html
```

### 2. Incluir scripts obrigatórios
```html
<script src="eai-wallet.js"></script>
<!-- ... código do jogo ... -->
<script src="eai-header.js"></script>
</body>
```

### 3. Adicionar ao arquivo de dados
```typescript
// /src/data/educational-games.ts ou arcade-games.ts
{
    id: 'eai-meu-jogo',
    slug: 'meu-jogo',
    title: 'Meu Jogo',
    description: 'Descrição do jogo...',
    thumbnailUrl: 'https://placehold.co/400x300/COR/white?text=Titulo',
    embedUrl: '/games/meu-jogo.html',
    area: 'EDUCATIONAL', // ou 'ARCADE'
    category: 'Categoria',
    subject: 'Assunto',
    ageRange: '7-9',
    educationalGoal: 'Objetivo educacional',
    tags: ['tag1', 'tag2', 'eai'],
    playCount: 0,
    featured: true,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
}
```

---

## 11. Checklist para Novo Jogo

- [ ] Arquivo HTML criado em `/public/games/`
- [ ] `eai-wallet.js` incluído
- [ ] `eai-header.js` incluído (antes de `</body>`)
- [ ] Sistema de recompensas implementado (coins, diamonds, gold)
- [ ] Baú do tesouro funcionando
- [ ] Barra superior com links (INEMA.CLUB, EAI, Compartilhar)
- [ ] Design responsivo
- [ ] Cores seguindo paleta da categoria
- [ ] Feedback visual para acertos/erros
- [ ] Estado salvo em localStorage
- [ ] Jogo cadastrado no arquivo de dados (.ts)
- [ ] Testado em mobile e desktop

---

## 12. Exemplos de Código

### Template Básico de Jogo
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nome do Jogo - EAI Games</title>
    <style>
        /* Estilos do jogo */
    </style>
</head>
<body>
    <!-- Conteúdo do jogo -->

    <script src="eai-wallet.js"></script>
    <script>
        // Lógica do jogo

        // Dar recompensas
        function onCorrectAnswer() {
            giveReward('coin', 10);
        }

        function onLevelComplete() {
            giveReward('diamond', 1);
        }

        function onPerfectScore() {
            giveReward('gold', 1);
        }
    </script>
    <script src="eai-header.js"></script>
</body>
</html>
```

---

## Versão do Documento

| Versão | Data | Alterações |
|--------|------|------------|
| 1.0 | 2024-01-15 | Versão inicial |

---

**Mantenha este documento atualizado sempre que novos padrões forem definidos!**
