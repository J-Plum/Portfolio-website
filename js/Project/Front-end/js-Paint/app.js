const $jsCanvas = document.querySelector('#jsCanvas');
const $jsRange = document.querySelector('#jsRange');
const colors = document.getElementsByClassName('jsColor');
const $input = document.querySelector('input');
const $jsMode = document.querySelector('#jsMode');
const $jsSave = document.querySelector('#jsSave');
const ctx = $jsCanvas.getContext('2d');

let color = '';

$jsCanvas.width = 700;
$jsCanvas.height = 700;

ctx.fillStyle ='white';
ctx.fillRect(0, 0, $jsCanvas.width, $jsCanvas.height);
ctx.strokeStyle = "#2c2c2c"
ctx.lineWidth = 2.5;
ctx.strokeStyle = "";

function startPainting(event) {
  painting = true;
}

function stopPainting() {
  painting = false;
}

let painting = false;
let filling = false;

/*  아래의 모든 이밴트는 마우스가 움직일시 계속 발생한다.
    beginPath 새로운 출발점을 만든다. .
    moveTo 그 출발점을 움직인다 x,y 좌표로
    (현재 x,y는 마우스의 위치 즉 마우스의 위치로 출발점을 움직임) (그리지는 않음)
    lineTo 도착점으로 좌표를 옮김 (그리지는 않음)
    stroke 도착점을 기준으로 그린다 */

function onMouseMove(event) {
  //마우스의 x,y 좌표
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    // console.log('creating path in', x, y);
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    /* 클릭을 하는 순간 beginPath로 만든 시작점
    그리고 moveTo로 이동한 그 시작점의 위치는 고정이 됨
    시작점을 기준으로 lineTo(도착점 = 마우스위치) 까지 storke한다 = 그린다*/
    // console.log('creating line in ', x, y);
    if(filling === false){
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  }
}

function onMouseDown(event) {
  painting = true;
}

function onMouseLeave(event) {
  stopPainting();
}

function handleColorClick(event) {
  color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleModeClick() {
  if (filling === true) {
    filling = false;
    $jsMode.textContent = "Fill"
  } else {
    filling = true;
    $jsMode.textContent = "Paint"
  }
}

function handleCanvasClick() {
  if (filling == true) {
    painting = null;
    console.log('filling~')
    ctx.fillRect(0, 0, $jsCanvas.width, $jsCanvas.height);
  }
}

function handleCM(event){
  event.preventDefault();
  painting = null;
}

function handleSaveClick(){
  //toDataURL() 의 default 값은 png이다  image/jpeg 등의 입력으로 확장자 변경가능
  const image = $jsCanvas.toDataURL("")
  const link = document.createElement('a');
  link.href = image;
  link.download = 'PaintJS[🎨]';
  link.click();
}

if ($jsCanvas) {
  $jsCanvas.addEventListener('mousemove', onMouseMove);
  $jsCanvas.addEventListener('mousedown', startPainting);
  $jsCanvas.addEventListener('mouseup', stopPainting);
  $jsCanvas.addEventListener('mouseleave', stopPainting);
  $jsCanvas.addEventListener('click', handleCanvasClick);
  $jsCanvas.addEventListener('contextmenu', handleCM);
}

const changeLineWidth = (event) => {
  ctx.lineWidth = event.target.value;
  console.log('change! width ' + $input.value);
}

$input.addEventListener('input', changeLineWidth);

const arrayColors = Array.from(colors);
arrayColors.forEach(colors => colors.addEventListener('click', handleColorClick));

$jsMode.addEventListener('click', handleModeClick);
$jsSave.addEventListener('click', handleSaveClick);