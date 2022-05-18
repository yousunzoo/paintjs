/**
 * canvas 요소는 두가지 사이즈를 가짐.
 * 1) css에서 조정하는 사이즈
 * 2) js 작동을 위한 사이즈 context 속성을 가짐 (manipulationg)
 * context : 요소 안에서 픽셀에 접근할 수 있는 방법. 픽셀들을 컨트롤
*/

// 변수
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName('js_color');
const range = document.getElementById("jsRange")
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;  

// pixel modifier
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

// 초기 배경색 설정
ctx.fillStyle = "white";
ctx.fillRect(0,0, CANVAS_SIZE, CANVAS_SIZE)

// 초기 브러쉬 색상과 굵기 설정
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;



// 마우스를 뗐을 때, 캔버스를 벗어났을 때 브러쉬 동작 멈춤처리
function stopPainting(){
  painting = false;
}

function startPainting(){
  painting = true;
}
// 캔버스 내의 offsetX, offsetY 값 사용

// 마우스가 캔버스 내에서 이동할 때 해당하는 x,y 좌표
function onMouseMove(event){
  const x = event.offsetX;
  const y = event.offsetY;
  // 마우스를 움직일 때, 마우스의 위치에 따라 path가 만들어짐
  // 마우스를 눌러서 painting=true 일 때 path의 시작점(x,y)부터 마우스를 누른 상태일 때(x,y)까지 직선이 만들어짐
  // 마우스를 움직일 때마다 이벤트 발생해서 선이 이어지도록
  if(!painting){
    // console.log("creating path in " ,x,y)
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    // console.log("creating line in " ,x,y)
    ctx.lineTo(x, y);
    ctx.stroke();
  }
};

function handleColorClick(event){
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event){
  const size = event.target.value;
  ctx.lineWidth = size;}

function handleModeClick(event){
  if(filling === true){
    filling = false;
    mode.innerText = "Fill"
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

function handleCanvasClick(event){
  if(filling){
  ctx.fillRect(0,0, CANVAS_SIZE, CANVAS_SIZE)
  }
}

function handleCM(event){
event.preventDefault();
}

function handleSaveClick(event){
  const image = canvas.toDataURL("image/png"); // 어떤 형태로 불러올 것인지
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS[EXPORT]"; //파일명
  link.click();
}

// 이벤트 설정
if(canvas){
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM)
}

// js_color div 나열을 배열처리, 각각의 배열요소에 event 부여
// color는 임의의 이름. 
Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if(range){
  range.addEventListener("input", handleRangeChange);
}

if(mode){
  mode.addEventListener("click", handleModeClick)
}

if(saveBtn){
  saveBtn.addEventListener("click", handleSaveClick)
}