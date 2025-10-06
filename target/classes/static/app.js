// app.js - Frontend logic for RGBW Control App

let video = document.getElementById('video');
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let colorPreview = document.getElementById('color-preview');
let sendButton = document.getElementById('send-button');
let autoToggle = document.getElementById('auto-toggle');
let cameraSelect = document.getElementById('camera-select');
let statusDiv = document.getElementById('status');

let autoMode = false;
let autoInterval;

async function init() {
    try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        videoDevices.forEach((device, index) => {
            const option = document.createElement('option');
            option.value = device.deviceId;
            option.text = device.label || `Camera ${index + 1}`;
            cameraSelect.appendChild(option);
        });
        if (videoDevices.length > 0) {
            startCamera(videoDevices[0].deviceId);
        }
    } catch (error) {
        statusDiv.textContent = 'Error accessing cameras: ' + error.message;
    }
}

async function startCamera(deviceId) {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: { deviceId: { exact: deviceId } }
        });
        video.srcObject = stream;
        video.addEventListener('play', () => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            updateColor();
        });
    } catch (error) {
        statusDiv.textContent = 'Error starting camera: ' + error.message;
    }
}

let currentColor = { r: 255, g: 0, b: 0 };

function updateColor() {
    if (video.paused || video.ended) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    try {
        const color = colorThief.getColor(canvas);
        colorPreview.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
        currentColor = { r: color[0], g: color[1], b: color[2] };
        if (autoMode) {
            sendColor(currentColor);
        }
    } catch (error) {
        // Fallback
        colorPreview.style.backgroundColor = 'rgb(255, 0, 0)';
        currentColor = { r: 255, g: 0, b: 0 };
    }
    requestAnimationFrame(updateColor);
}

function sendColor(color = currentColor) {
    fetch('/api/color', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(color),
    })
    .then(response => response.json())
    .then(data => {
        statusDiv.textContent = data.status;
    })
    .catch(error => {
        statusDiv.textContent = 'Error: ' + error.message;
    });
}

cameraSelect.addEventListener('change', () => {
    startCamera(cameraSelect.value);
});

sendButton.addEventListener('click', () => {
    const color = { r: 255, g: 0, b: 0 }; // From preview
    sendColor(color);
});

autoToggle.addEventListener('click', () => {
    autoMode = !autoMode;
    if (autoMode) {
        autoToggle.textContent = 'Stop Auto';
        autoInterval = setInterval(() => {
            const color = { r: 255, g: 0, b: 0 };
            sendColor(color);
        }, 3000);
    } else {
        autoToggle.textContent = 'Start Auto';
        clearInterval(autoInterval);
    }
});

init();