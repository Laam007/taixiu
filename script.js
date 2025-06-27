const dicePatterns = {
  1: [4],
  2: [0, 8],
  3: [0, 4, 8],
  4: [0, 2, 6, 8],
  5: [0, 2, 4, 6, 8],
  6: [0, 2, 3, 5, 6, 8],
};

let playCount = 10;

const rollBtn = document.getElementById('rollBtn');
const diceContainer = document.getElementById('diceContainer');
const diceValues = document.getElementById('diceValues');
const totalValue = document.getElementById('totalValue');
const betResult = document.getElementById('betResult');
const playCountDisplay = document.getElementById('playCount');
const results = document.getElementById('results');
const gameContainer = document.getElementById('gameContainer');
const finalMessage = document.getElementById('finalMessage');
const bgMusic = document.getElementById('bgMusic');

// Phát nhạc khi người dùng click lần đầu
document.addEventListener('click', () => {
  if (bgMusic.paused) {
    bgMusic.play().catch(err => console.warn('Không thể phát nhạc:', err));
  }
}, { once: true });

// Tạo chấm cho xúc xắc
function createDotsForDice(dice, number) {
  dice.innerHTML = '';
  for (let i = 0; i < 9; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (dicePatterns[number].includes(i)) dot.classList.add('active');
    dice.appendChild(dot);
  }
}

function rollDice() {
  if (playCount <= 0) return;

  const bet = document.querySelector('input[name="bet"]:checked').value;
  const diceElements = document.querySelectorAll('.dice');
  const rollResults = [];

  results.style.display = 'none';
  diceElements.forEach(d => d.classList.add('shake'));

  setTimeout(() => {
    diceElements.forEach(d => d.classList.remove('shake'));

    let total = 0;
    diceElements.forEach(dice => {
      const roll = Math.floor(Math.random() * 6) + 1;
      createDotsForDice(dice, roll);
      rollResults.push(roll);
      total += roll;
    });

    diceValues.textContent = rollResults.join(', ');
    totalValue.textContent = total;

    const actualResult = total >= 11 ? 'tài' : 'xỉu';

    // Tỷ lệ 70% thua
    let finalResult;
    if (Math.random() < 0.7) {
      finalResult = bet === 'tài' ? 'xỉu' : 'tài';
    } else {
      finalResult = actualResult;
    }

    if (bet === finalResult) {
      betResult.innerHTML = `✅ Bạn đã <b>THẮNG</b> cược (${finalResult.toUpperCase()})`;
      betResult.style.color = 'lime';
    } else {
      betResult.innerHTML = `❌ Bạn đã <b>THUA</b> cược (${finalResult.toUpperCase()})`;
      betResult.style.color = 'red';
    }

    results.style.display = 'block';

    playCount--;
    playCountDisplay.innerText = playCount;

    if (playCount <= 0) {
      rollBtn.disabled = true;
      rollBtn.innerText = "🚫 Hết lượt";

      // Ẩn game, hiện thông điệp
      gameContainer.style.display = "none";
      finalMessage.style.display = "flex";
    }
  }, 2000); // Lắc trong 2 giây
}

rollBtn.addEventListener('click', rollDice);
