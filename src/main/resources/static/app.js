let video = document.getElementById('video');
let canvas = document.getElementById('canvas');
let colorPreview = document.getElementById('color-preview');
let colorRgb = document.getElementById('color-rgb');
let sendBtn = document.getElementById('send-btn');
let autoBtn = document.getElementById('auto-btn');
let statusDiv = document.getElementById('status');
let cameraSelect = document.getElementById('camera-select');

let currentStream = null;
let autoMode = false;
let autoInterval = null;
let colorThief = new ColorThief();
let currentColor = { red: 0, green: 0, blue: 0 };

async function populateCameraList() {
    try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        
        cameraSelect.innerHTML = '';
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
        showStatus('Error accessing cameras: ' + error.message, 'error');
    }
}

async function startCamera(deviceId) {
    try {
        if (currentStream) {
            currentStream.getTracks().forEach(track => track.stop());
        }
        
        const constraints = {
            video: {
                deviceId: deviceId ? { exact: deviceId } : undefined,
                width: { ideal: 640 },
                height: { ideal: 480 }
            }
        };
        
        currentStream = await navigator.mediaDevices.getUserMedia(constraints);
        video.srcObject = currentStream;
        
        video.addEventListener('loadeddata', () => {
            startColorDetection();
        });
    } catch (error) {
        showStatus('Error starting camera: ' + error.message, 'error');
    }
}

function startColorDetection() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    setInterval(() => {
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
            detectColor();
        }
    }, 100);
}

function detectColor() {
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    try {
        const color = colorThief.getColor(canvas);
        
        currentColor = {
            red: color[0],
            green: color[1],
            blue: color[2]
        };
        
        updateColorPreview(currentColor);
    } catch (error) {
        console.error('Color detection error:', error);
    }
}

function updateColorPreview(color) {
    const rgbString = `rgb(${color.red}, ${color.green}, ${color.blue})`;
    colorPreview.style.backgroundColor = rgbString;
    colorRgb.textContent = `RGB(${color.red}, ${color.green}, ${color.blue})`;
}

async function sendColorToBulb() {
    try {
        const colorData = {
            red: currentColor.red,
            green: currentColor.green,
            blue: currentColor.blue,
            white: 0
        };
        
        const response = await fetch('/api/color', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(colorData)
        });
        
        const result = await response.json();
        
        if (result.success) {
            showStatus('✓ ' + result.message, 'success');
        } else {
            showStatus('✗ ' + result.message, 'error');
        }
    } catch (error) {
        showStatus('✗ Network error: ' + error.message, 'error');
    }
}

function toggleAutoMode() {
    autoMode = !autoMode;
    
    if (autoMode) {
        autoBtn.textContent = 'Auto Mode: ON';
        autoBtn.classList.add('active');
        autoInterval = setInterval(() => {
            sendColorToBulb();
        }, 3000);
    } else {
        autoBtn.textContent = 'Auto Mode: OFF';
        autoBtn.classList.remove('active');
        if (autoInterval) {
            clearInterval(autoInterval);
            autoInterval = null;
        }
    }
}

function showStatus(message, type) {
    statusDiv.textContent = message;
    statusDiv.className = 'status ' + type;
    
    setTimeout(() => {
        statusDiv.textContent = '';
        statusDiv.className = 'status';
    }, 3000);
}

cameraSelect.addEventListener('change', (e) => {
    startCamera(e.target.value);
});

sendBtn.addEventListener('click', sendColorToBulb);
autoBtn.addEventListener('click', toggleAutoMode);

populateCameraList();
