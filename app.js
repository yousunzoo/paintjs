const canvas = document.getElementById("jsCanvas");

let painting = false;

// 마우스를 뗐을 때, 캔버스를 벗어났을 때 브러쉬 동작 멈춤처리
function stopPainting(){
  painting = false;
}

// 캔버스 내의 offsetX, offsetY 값 사용

// 마우스가 캔버스 내에서 이동할 때 해당하는 x,y 좌표
function onMouseMove(event){
  const x = event.offsetX;
  const y = event.offsetY;
};

// 마우스 누르고 있을 때 브러쉬 동작하도록
function onMouseDown(event){
  painting = true;
}

// 마우스 뗐을 때 브러쉬 동작하도록
function onMouseUp(event){
  stopPainting();
}

// 이벤트 설정
if(canvas){
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", onMouseDown);
  canvas.addEventListener("mouseup", onMouseUp);
  canvas.addEventListener("mouseleave", stopPainting);
} 

