let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function getRandom(min, max) {
    return min + Math.random() * (max - min + 1)
}

let points = [];

function generate(x, y) {
    const point = {
        x: x,
        y: y,
        angle: getRandom(0, 2*Math.PI)
    }
    points.push(point);
}

document.getElementById('input7').oninput = function() {
    for (let i = 0; i < document.getElementById('input7').value; i++) {
        console.log(points.length);
        points.splice(i, points.length - document.getElementById('input7').value + 1);
        generate(getRandom(0, canvas.width), getRandom(0, canvas.height));
    }
}

document.getElementById('input1').oninput = function(){
    canvas.style.backgroundColor = document.getElementById('input1').value;
}

function start() {
    document.getElementById('butt').classList.remove('on');
    document.getElementById('butt').classList.add('off');

    document.getElementById('inputDiv').classList.remove('inputOff');
    document.getElementById('inputDiv').classList.add('inputOn');

    document.getElementById('particles').classList.remove('pOff');
    document.getElementById('particles').classList.add('pOn');

    draw();
}

function menu() {
    document.getElementById('inputDiv').classList.toggle('inputOn');
    document.getElementById('inputDiv').classList.toggle('inputOn1');
}

// const speed = 3;
// const dist = 80;

function movePoints() {
    for (let point of points) {
        point.x = point.x + document.getElementById('input5').value * Math.cos(point.angle);
        point.y = point.y + document.getElementById('input5').value * Math.sin(point.angle);

        if (point.x < 0) {
            point.x = canvas.width
        }

        if (point.x > canvas.width) {
            point.x = 0;
        }

        if (point.y < 0) {
            point.y = canvas.height
        }

        if (point.y > canvas.height) {
            point.y = 0;
        }
    }
}

function drawPoints() {
    ctx.fillStyle = document.getElementById('input2').value;
    for (let point of points){
        ctx.beginPath();
        ctx.arc(point.x, point.y, document.getElementById('input3').value, 0, 360, false);
        ctx.fill();
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    movePoints();
    drawPoints();
    drawLines();
    requestAnimationFrame(draw);
}

function getDist(a, b) {
    return ((a.x - b.x)**2 + (a.y - b.y)**2)**0.5
}

function drawLines() {
    for (let pointA of points) {
        for (let pointB of points) {
            if (pointA == pointB) continue;
            let distance = getDist(pointA, pointB);
            if (distance <= document.getElementById('input6').value) {
                ctx.moveTo(pointA.x, pointA.y);
                ctx.lineTo(pointB.x, pointB.y);
                ctx.lineWidth = document.getElementById('input4').value;
                ctx.strokeStyle = document.getElementById('input2').value;
                ctx.stroke();
            }
        }
    }
}


canvas.onmousemove = function(e){
    let pos = {
        x: e.clientX,
        y: e.clientY
    }
    for (let point of points){
        let cursorDist = getDist(point, pos);
       if (cursorDist < 200){
        if (pos.x > point.x)
            point.x -=5;
        if (pos.x < point.x)
            point.x +=5;
        if (pos.y > point.y)
            point.y -=5;
        if (pos.y < point.y)
            point.y +=5;
        }
    }
}


// ctx.moveTo(point.x, point.y);
            // ctx.lineTo(pos.x, pos.y);
            // ctx.stroke();

