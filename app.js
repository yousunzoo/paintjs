// canvas 요소는 두가지 사이즈를 가짐. 1) css에서 조정하는 사이즈, 2) js 작동을 위한 사이즈 context 속성을 가짐
//context : 요소 안에서 픽셀에 접근할 수 있는 방법

const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

// pixel modifier
canvas.width = 700;
canvas.height = 700;

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

let painting = false;

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
  if(!painting){
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
};

// 마우스 누르고 있을 때 브러쉬 동작하도록
function onMouseDown(event){
  painting = true;
}


// 이벤트 설정
if(canvas){
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
} 

