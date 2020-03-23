const word = document.getElementById('word'),
  text = document.getElementById('text'),
  scoreEl = document.getElementById('score'),
  timeEl = document.getElementById('time'),
  endgameEl = document.getElementById('end-game-container'),
  settingsBtn = document.getElementById('settings-btn'),
  settings = document.getElementById('settings'),
  settingsForm = document.getElementById('settings-form'),
  difficultySelect = document.getElementById('difficulty'),
  instructions = document.getElementById("instructions");

const words = [
  'sigh',
  'tense',
  'airplane',
  'ball',
  'pies',
  'juice',
  'warlike',
  'bad',
  'north',
  'dependent',
  'steer',
  'silver',
  'highfalutin',
  'superficial',
  'quince',
  'eight',
  'feeble',
  'admit',
  'drag',
  'loving'
];

let randomWord,
  score = 0,
  time = 60,
  gameStarted = false,
  interval,
  charPos = 0,
  typed = 0;

let difficulty =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium';

difficultySelect.value = difficulty;

function startGame() {
  gameStarted = true;
  instructions.innerText = "Type the following:";
  interval = setInterval(updateTime, 1000);
}

displayTime();
text.focus();

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

function updateTime() {
  time--;
  displayTime();
}

function displayTime() {
  timeEl.innerHTML = time + 's';

  if (time <= 0) {
    clearInterval(interval);
    gameOver();
    typed = 0;
  }
}

function gameOver() {
  text.blur();
  gameStarted = false;
  let wpm = Math.floor(score/5);
  if (typed === 0)
    typed = 1;
  let acc = Math.floor(score/typed*100);
  endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score} words per minute</p>
    <p>Your accuracy was ${acc}%</p>
    <button onclick="location.reload()">Reload</button>
  `;

  endgameEl.style.display = 'flex';
}

addWordToDOM();

text.addEventListener('input', e => {
  if (!gameStarted) startGame();
  typed++;
  let insertedText = e.target.value;
  let lastChar = insertedText.charAt(insertedText.length-1);
  
  if (lastChar === randomWord.charAt(charPos)){
    charPos++;
    updateScore();
  } else {
    insertedText = insertedText.substring(0, insertedText.length-1)
    e.target.value = insertedText;
    if (difficulty === 'hard') {
      time -= 2;
    } else if (difficulty === 'medium') {
      time -= 1;
    } 
  }

  if (insertedText === randomWord) {
    addWordToDOM();
    charPos = 0;
    e.target.value = '';
  }

  displayTime();
});

settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

settingsForm.addEventListener('change', e => {
  difficulty = e.target.value;
  localStorage.setItem('difficulty', difficulty);
  location.reload();
});
