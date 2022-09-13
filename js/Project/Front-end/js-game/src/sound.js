const carrotSound = new Audio('sound/carrot_pull.mp3');
const bugSound = new Audio('sound/bug_pull.mp3');
const bgSound = new Audio('sound/bg.mp3');
const alertSound = new Audio('sound/alert.wav');
const winSound = new Audio('sound/game_win.mp3');

export function playCarrot(){
    playSound(carrotSound)
}

export function playBug(){
    playSound(bugSound)
}

export function playBg(){
    playSound(bgSound)
}
export function stopBg(){
    stopSound(bgSound)
}

export function playAlert(){
    playSound(alertSound)
}

export function playWin(){
    playSound(winSound)
}


function playSound(sound) {
    sound.currentTime = 0;//음악을 처음부터
    sound.play();
}

function stopSound(sound) {
    sound.pause();
}