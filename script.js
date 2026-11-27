const floatingBg = document.getElementById('floatingBg');
const confettiLayer = document.getElementById('confettiLayer');
const hugBtn = document.getElementById('hugBtn');
const hugCountEl = document.getElementById('hugCount');
const hugStatusEl = document.getElementById('hugStatus');
const drawCardBtn = document.getElementById('drawCardBtn');
const dailyCard = document.getElementById('dailyCard');
const dailyArcana = document.getElementById('dailyArcana');
const dailyEmoji = document.getElementById('dailyEmoji');
const dailyTitle = document.getElementById('dailyTitle');
const dailyText = document.getElementById('dailyText');
const checkCompatBtn = document.getElementById('checkCompatBtn');
const meterBar = document.getElementById('meterBar');
const meterResult = document.getElementById('meterResult');

// 1. Floating cute mystical background symbols
const bgSymbols = ['💖', '🔮', '✨', '🌙', '⭐', '🦋', '🃏', '💜'];
for (let i = 0; i < 22; i++) {
  const span = document.createElement('span');
  span.className = 'float-item';
  span.textContent = bgSymbols[i % bgSymbols.length];
  span.style.left = `${Math.random() * 100}%`;
  span.style.fontSize = `${1 + Math.random() * 1.3}rem`;
  span.style.animationDuration = `${12 + Math.random() * 14}s`;
  span.style.animationDelay = `${-Math.random() * 20}s`;
  floatingBg.appendChild(span);
}

// 2. Confetti burst helper
function spawnConfetti(x, y, count = 16) {
  const icons = ['💖', '✨', '🔮', '💜', '🌟', '🤗'];
  for (let i = 0; i < count; i++) {
    const piece = document.createElement('span');
    piece.className = 'confetti-piece';
    piece.textContent = icons[Math.floor(Math.random() * icons.length)];
    const angle = Math.random() * Math.PI * 2;
    const dist = 60 + Math.random() * 130;
    piece.style.left = `${x}px`;
    piece.style.top = `${y}px`;
    piece.style.setProperty('--tx', `${Math.cos(angle) * dist}px`);
    piece.style.setProperty('--ty', `${Math.sin(angle) * dist - 30}px`);
    piece.style.setProperty('--rot', `${(Math.random() - 0.5) * 320}deg`);
    confettiLayer.appendChild(piece);
    setTimeout(() => piece.remove(), 1200);
  }
}

// 3. Hug counter
let hugCount = Number(localStorage.getItem('dan_ira_hugs') || 0);
hugCountEl.textContent = hugCount;

function updateHugStatus(count) {
  if (count === 0) return '✨ Нажми кнопку, чтобы зарядить любовь!';
  if (count < 5) return '🥰 Нежное начало! Ирочка улыбнулась.';
  if (count < 15) return '🔮 Карты фиксируют мощный выброс милоты!';
  if (count < 30) return '🔥 Данильчик и Ирочка на максимальной волне любви!';
  return '♾️ Критический уровень нежности! Вселенная в восторге!';
}
hugStatusEl.textContent = updateHugStatus(hugCount);

hugBtn.addEventListener('click', (e) => {
  hugCount += 1;
  localStorage.setItem('dan_ira_hugs', hugCount);
  hugCountEl.textContent = hugCount;
  hugStatusEl.textContent = updateHugStatus(hugCount);
  const rect = hugBtn.getBoundingClientRect();
  spawnConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2, 18);
});

// 4. Tarot 3-card flip
document.querySelectorAll('.tarot-card').forEach((card) => {
  const toggleFlip = () => {
    const flipped = card.getAttribute('data-flipped') === 'true';
    card.setAttribute('data-flipped', String(!flipped));
    if (!flipped) {
      const rect = card.getBoundingClientRect();
      spawnConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2, 10);
    }
  };
  card.addEventListener('click', toggleFlip);
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleFlip();
    }
  });
});

// 5. Daily Love Card Oracle
const dailyDeck = [
  {
    arcana: 'Аркан «Обнимашки без повода»',
    emoji: '🤗',
    title: 'Срочный сеанс нежности',
    text: 'Сегодня по раскладу положено минимум 10 крепких обнимашек и один внезапный поцелуй в носик.'
  },
  {
    arcana: 'Аркан «Ночной дожор»',
    emoji: '🍕',
    title: 'Вкусное пророчество',
    text: 'Карты советуют заказать или приготовить что-нибудь безумно вкусное и съесть это вместе под сериальчик.'
  },
  {
    arcana: 'Аркан «Ирочка права»',
    emoji: '👑',
    title: 'Интуиция 100 уровня',
    text: 'Даже если Ирочка ТАРОшница просто сказала «мне так кажется» — это уже официальный закон Вселенной. Данильчик одобряет!'
  },
  {
    arcana: 'Аркан «Данильчик — опора»',
    emoji: '🛡️',
    title: 'Стена тепла и заботы',
    text: 'Сегодня Данильчик окружает Ирочку таким уютом, что любые мелкие заботы просто растворяются.'
  },
  {
    arcana: 'Аркан «Хохотушки»',
    emoji: '😂',
    title: 'Передоз смеха',
    text: 'Ожидается приступ смеха над локальными мемами, которые понимаете только вы двое.'
  },
  {
    arcana: 'Аркан «Звёздный Мэтч»',
    emoji: '✨',
    title: 'Космический бонус',
    text: 'Все планеты выстроились в сердечко. Идеальный день, чтобы просто сказать друг другу «как хорошо, что мы есть».'
  }
];

let lastDailyIndex = -1;
drawCardBtn.addEventListener('click', () => {
  let idx;
  do {
    idx = Math.floor(Math.random() * dailyDeck.length);
  } while (idx === lastDailyIndex && dailyDeck.length > 1);
  lastDailyIndex = idx;

  const picked = dailyDeck[idx];
  dailyArcana.textContent = picked.arcana;
  dailyEmoji.textContent = picked.emoji;
  dailyTitle.textContent = picked.title;
  dailyText.textContent = picked.text;

  dailyCard.classList.remove('pop');
  void dailyCard.offsetWidth;
  dailyCard.classList.add('pop');

  const rect = dailyCard.getBoundingClientRect();
  spawnConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2, 14);
});

// 6. Compatibility Meter
const compatVerdicts = [
  '100% — Абсолютная судьба! Карты даже перепроверять не стали 💖',
  '146% — Таро в шоке от того, насколько вы подходите друг другу 🔮',
  '999% — Идеальный баланс магии Ирочки и заботы Данильчика ✨',
  '∞% — Ошибка калькулятора: слишком много любви в одном месте ♾️'
];

let compatIndex = 0;
checkCompatBtn.addEventListener('click', () => {
  meterBar.style.width = '0%';
  meterResult.textContent = '🔮 Тасуем колоду и считаем звёзды...';

  setTimeout(() => {
    meterBar.style.width = '100%';
    meterResult.textContent = compatVerdicts[compatIndex % compatVerdicts.length];
    compatIndex += 1;
    const rect = checkCompatBtn.getBoundingClientRect();
    spawnConfetti(rect.left + rect.width / 2, rect.top, 20);
  }, 350);
});
