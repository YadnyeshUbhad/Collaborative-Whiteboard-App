const canvas = document.getElementById('drawing-canvas');
const ctx = canvas.getContext('2d');
const toolbar = document.getElementById('toolbar');
const penTool = document.getElementById('pen-tool');
const eraserTool = document.getElementById('eraser-tool');
const clearCanvasBtn = document.getElementById('clear-canvas');
const colorPicker = document.getElementById('color-picker');
const thicknessSlider = document.getElementById('thickness-slider');
const undoBtn = document.getElementById('undo');
const redoBtn = document.getElementById('redo');
const saveBtn = document.getElementById('save-drawing');
const textTool = document.getElementById('text-tool');

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let currentTool = 'pen';
let penColor = '#000000';
let lineWidth = 2;
let history = [];
let redoStack = [];
let textInput = '';  // Variable to store the text input
let isTypingText = false;  // Flag to indicate if text is being typed

function resizeCanvas() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function saveState() {
    history.push(canvas.toDataURL());
    redoStack = [];
}

undoBtn.addEventListener('click', () => {
    if (history.length > 0) {
        redoStack.push(history.pop());
        restoreState(history[history.length - 1]);
    }
});

redoBtn.addEventListener('click', () => {
    if (redoStack.length > 0) {
        const state = redoStack.pop();
        history.push(state);
        restoreState(state);
    }
});

function restoreState(state) {
    const img = new Image();
    img.src = state;
    img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
    };
}

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
    saveState();

    // Start text input if text tool is selected
    if (currentTool === 'text') {
        isTypingText = true;
        textInput = '';  // Clear previous input
        activateTool(textTool);
    }
});

canvas.addEventListener('mousemove', (e) => {
    if (!isDrawing) return;

    if (currentTool === 'pen' || currentTool === 'eraser') {
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.strokeStyle = currentTool === 'pen' ? penColor : '#ffffff';
        ctx.lineWidth = lineWidth;
        ctx.stroke();
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }
});

canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);

// Event listener for text input
canvas.addEventListener('click', (e) => {
    if (isTypingText && currentTool === 'text') {
        const textX = e.offsetX;
        const textY = e.offsetY;
        ctx.font = "20px Arial"; // Set font size
        ctx.fillStyle = penColor; // Use selected color for text
        ctx.fillText(textInput, textX, textY);  // Draw the text on the canvas
        isTypingText = false;
    }
});

penTool.addEventListener('click', () => {
    currentTool = 'pen';
    activateTool(penTool);
});

eraserTool.addEventListener('click', () => {
    currentTool = 'eraser';
    activateTool(eraserTool);
});

clearCanvasBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    saveState();
});

colorPicker.addEventListener('input', (e) => {
    penColor = e.target.value;
});

thicknessSlider.addEventListener('input', (e) => {
    lineWidth = e.target.value;
});

saveBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'drawing.png';
    link.href = canvas.toDataURL();
    link.click();
});

// Text tool activation
textTool.addEventListener('click', () => {
    currentTool = 'text';
    activateTool(textTool);
    isTypingText = true;  // Enable typing text mode
});

// Update the input text dynamically
window.addEventListener('keydown', (e) => {
    if (isTypingText && currentTool === 'text') {
        if (e.key === 'Backspace') {
            textInput = textInput.slice(0, -1);
        } else if (e.key.length === 1) {
            textInput += e.key;
        }
    }
});

function activateTool(tool) {
    const buttons = toolbar.querySelectorAll('button');
    buttons.forEach(btn => btn.classList.remove('active'));
    tool.classList.add('active');
}

activateTool(penTool);
