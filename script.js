const canvas  = document.getElementById('whiteboard');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let isDrawing = false;
let lastX = 0;
let lastY =0;

function startDrawing(e) {
    isDrawing =true;
    [lastX,lastY]=[e.clientX, e.clientY];
}

function draw(e) {
    if(!isDrawing) return;

    ctx.beginPath();
    ctx.strokeStyle =  "black";
    ctx.lineWidth = 2;
    ctx.moveTo(lastX,lastY);
    ctx.lineTo(e.clientX , e.clientY);
    ctx.stroke();
    [lastX,lastY]=[e.clientX, e.clientY];

}

canvas.addEventListener('mousedown',startDrawing);
canvas.addEventListener('mousemove',draw);
canvas.addEventListener('mouseup', ()=>isDrawing=false);
canvas.addEventListener('mouseout', ()=>isDrawing=false);

canvas.addEventListener('touchstart', (e)=>{
    e.preventDefault();
    startDrawing(e.touches[0]);
});
canvas.addEventListener('touchmove', (e)=>{
    e.preventDefault();
    draw(e.touches[0]);
});

canvas.addEventListener('touchend', ()=>isDrawing=false);
canvas.addEventListener('touchcancel', ()=>isDrawing=false);

window.addEventListener('resize', () => {
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    tempCanvas.getContext('2d').drawImage(canvas, 0, 0);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.drawImage(tempCanvas, 0, 0);
});