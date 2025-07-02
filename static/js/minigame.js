const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Menstruation cycle terms and their positions
const dots = [
    {x: 200, y: 60, label: "Uterus"},
    {x: 320, y: 120, label: "Egg"},
    {x: 340, y: 250, label: "Hormones"},
    {x: 200, y: 340, label: "Blood"},
    {x: 60, y: 250, label: "Cycle"},
    {x: 80, y: 120, label: "Ovary"}
];

// The correct order to connect (by index)
const correctOrder = [0, 1, 2, 3, 4, 5];

let lines = [];
let dragging = false;
let dragStart = null;
let dragEnd = null;
let current = 0;

function drawDots() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw lines
    ctx.strokeStyle = '#d72660';
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let i = 0; i < lines.length; i++) {
        const [from, to] = lines[i];
        ctx.moveTo(dots[from].x, dots[from].y);
        ctx.lineTo(dots[to].x, dots[to].y);
    }
    ctx.stroke();

    // Draw dragging line
    if (dragging && dragStart !== null && dragEnd !== null) {
        ctx.beginPath();
        ctx.moveTo(dots[dragStart].x, dots[dragStart].y);
        ctx.lineTo(dragEnd.x, dragEnd.y);
        ctx.strokeStyle = '#888';
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    // Draw dots and labels
    for (let i = 0; i < dots.length; i++) {
        ctx.beginPath();
        ctx.arc(dots[i].x, dots[i].y, 18, 0, 2 * Math.PI);
        ctx.fillStyle = (i === current) ? '#d72660' : '#fff';
        ctx.strokeStyle = '#d72660';
        ctx.lineWidth = 2;
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#222';
        ctx.font = 'bold 13px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(dots[i].label, dots[i].x, dots[i].y);
    }
}

function getDotAt(x, y) {
    for (let i = 0; i < dots.length; i++) {
        const dx = x - dots[i].x;
        const dy = y - dots[i].y;
        if (dx * dx + dy * dy < 18 * 18) {
            return i;
        }
    }
    return null;
}

// Mouse and touch events
function startDrag(x, y) {
    const dotIdx = getDotAt(x, y);
    if (dotIdx === correctOrder[current]) {
        dragging = true;
        dragStart = dotIdx;
        dragEnd = {x, y};
    }
}

function moveDrag(x, y) {
    if (dragging) {
        dragEnd = {x, y};
        drawDots();
    }
}

function endDrag(x, y) {
    if (!dragging) return;
    const dotIdx = getDotAt(x, y);
    if (dotIdx === correctOrder[current + 1]) {
        lines.push([dragStart, dotIdx]);
        current++;
        if (current === correctOrder.length - 1) {
            setTimeout(() => {
                alert('Great job! You connected the menstruation cycle terms!');
            }, 200);
        }
    }
    dragging = false;
    dragStart = null;
    dragEnd = null;
    drawDots();
}

canvas.addEventListener('mousedown', e => {
    const rect = canvas.getBoundingClientRect();
    startDrag(e.clientX - rect.left, e.clientY - rect.top);
});
canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    moveDrag(e.clientX - rect.left, e.clientY - rect.top);
});
canvas.addEventListener('mouseup', e => {
    const rect = canvas.getBoundingClientRect();
    endDrag(e.clientX - rect.left, e.clientY - rect.top);
});

// Touch support (long press to start)
let touchTimeout = null;
canvas.addEventListener('touchstart', e => {
    if (e.touches.length === 1) {
        const rect = canvas.getBoundingClientRect();
        const x = e.touches[0].clientX - rect.left;
        const y = e.touches[0].clientY - rect.top;
        touchTimeout = setTimeout(() => {
            startDrag(x, y);
        }, 200); // long press
    }
});
canvas.addEventListener('touchmove', e => {
    if (dragging && e.touches.length === 1) {
        const rect = canvas.getBoundingClientRect();
        moveDrag(e.touches[0].clientX - rect.left, e.touches[0].clientY - rect.top);
    }
});
canvas.addEventListener('touchend', e => {
    clearTimeout(touchTimeout);
    if (dragging) {
        const rect = canvas.getBoundingClientRect();
        // Use last known dragEnd position
        endDrag(dragEnd.x, dragEnd.y);
    }
});

function resetGame() {
    lines = [];
    dragging = false;
    dragStart = null;
    dragEnd = null;
    current = 0;
    drawDots();
}

drawDots();