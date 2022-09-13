'use strict';
import PopUp from "./popup.js";
import Field from "./field.js";
import * as sound from "./sound.js";

// const CARROT_SIZE = 80;
const BUG_COUNT = 20;
const CARROT_COUNT = 15;
const GAME_DARATION_SEC = 10;

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();

const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');


// const popUp = document.querySelector('.pop-up');
// const popUpText = document.querySelector('.pop-up__message');
// const popUpRefresh = document.querySelector('.pop-up__refresh');

// Sound
// const carrotSound = new Audio('sound/carrot_pull.mp3');
// const bugSound = new Audio('sound/bug_pull.mp3');
// const bgSound = new Audio('sound/bg.mp3');
// const alertSound = new Audio('sound/alert.wav');
// const winSound = new Audio('sound/game_win.mp3');


let started = false;
let score = 0;
let timer = undefined;

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(() => startGame());

const gameField = new Field(CARROT_COUNT, BUG_COUNT);
gameField.setClickListener(onItemClick);

function onItemClick(item) {
    if (!started) {
        return;
    }
    // const item = e.target.className;
    if (item === 'carrot') {
        console.log(item);// field.js 의 onClick의 this바운딩 관련 질문하기.
        score++;
        updateScoreBoard();
        if (score === CARROT_COUNT) {
            finishGame(true);
        }
    } else if (item === 'bug') {
        console.log(item);
        finishGame(false);
    }
}

field.addEventListener('click', onItemClick);

// popUpRefresh.addEventListener('click',()=>{
//     popUp.classList.add('pop-up--hide');
// })




gameBtn.addEventListener('click', () => {
    if (started) {
        stopGame();
        console.log('stop');

    } else {
        startGame();
        console.log('start');
    }
});

function startGame() {
    started = true;
    initGame();
    showStopButton();
    showTimerAndScore();
    startGameTimer();
    sound.playBg()
}

function stopGame() {
    started = false;
    stopGameTimer();
    hideStartButton();
    gameFinishBanner.showWithText('REPLAY?');
    sound.playAlert();
    sound.stopBg();
}

function finishGame(win) {
    started = false;
    stopGameTimer();
    hideStartButton();
    if (win) {
        sound.playWin();
    } else {
        sound.playBug();
    }
    sound.stopBg();
    gameFinishBanner.showWithText(win ? 'YOU WON' : 'YOU LOST');
}

function showStopButton() {
    const icon = gameBtn.querySelector('.fa-solid');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
    gameBtn.style.visibility = 'visible';
}

function hideStartButton() {
    gameBtn.style.visibility = 'hidden';
}

function showTimerAndScore() {
    gameTimer.style.visibility = 'visible'
    gameScore.style.visibility = 'visible'
}



function startGameTimer() {
    let remainingTimeSec = GAME_DARATION_SEC;
    updateTimerText(remainingTimeSec);
    timer = setInterval(() => {
        if (remainingTimeSec <= 0) {
            clearInterval(timer);
            finishGame(CARROT_COUNT === score);
            return;
        }
        updateTimerText(--remainingTimeSec);
    }, 1000);

}

function stopGameTimer() {
    clearInterval(timer);
}

function updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    gameTimer.innerHTML = `${minutes}:${seconds}`
}

function initGame() {
    gameScore.innerHTML = CARROT_COUNT;
    score = 0;
    gameField.init();
}

function updateScoreBoard() {
    gameScore.innerText = CARROT_COUNT - score;
}





