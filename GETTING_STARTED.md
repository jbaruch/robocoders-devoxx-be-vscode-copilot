# RGBW Control App - Getting Started

This is a web application that uses your webcam to detect the dominant color and control a Shelly Duo GU10 RGBW smart bulb.

## Prerequisites

- Java 17 or higher
- Maven 3.9+
- A Shelly Duo GU10 RGBW smart bulb on the same network (optional for testing)

## Quick Start

### 1. Configure the Bulb IP Address

Edit `src/main/resources/application.properties` and set your Shelly bulb's IP address:

```properties
shelly.bulb.ip=192.168.1.100
```

Replace `192.168.1.100` with your actual bulb IP address.

### 2. Run the Application

```bash
mvn spring-boot:run
```

### 3. Open in Browser

Navigate to: http://localhost:8080

## Features

- **Camera Selection**: Choose from available cameras
- **Real-time Color Detection**: Continuously detects the dominant color from your webcam feed
- **Manual Mode**: Click "Send to Bulb" to send the current detected color
- **Auto Mode**: Automatically sends color to the bulb every 3 seconds
- **Visual Feedback**: See the detected color in real-time with RGB values

## Usage

1. **Allow Camera Access**: Your browser will prompt for camera permissions on first load
2. **Select Camera**: Use the dropdown to select which camera to use
3. **View Color Detection**: The color preview box shows the detected dominant color
4. **Manual Control**: Click "Send to Bulb" to send the current color once
5. **Auto Control**: Click "Auto Mode: OFF" to enable automatic color sending every 3 seconds

## Testing

### Integration Tests with Playwright

The project includes comprehensive Playwright tests. To run them:

```bash
cd tests
npm install
npx playwright test
```

To run tests with UI:
```bash
npx playwright test --ui
```

### Manual Testing Checklist

- [ ] Camera selection dropdown populates
- [ ] Video stream displays from selected camera
- [ ] Color preview updates continuously
- [ ] Manual mode: send button works
- [ ] Auto mode: color sends every 3 seconds
- [ ] Bulb actually changes color
- [ ] Error messages display on network failure

## Troubleshooting

### Camera Not Working

- Ensure your browser has permission to access the camera
- Check that no other application is using the camera
- Try refreshing the page
- Check browser console for errors

### Bulb Not Responding

- Verify the bulb IP address in `application.properties`
- Ensure the bulb is on the same network as your computer
- Check that the bulb is powered on
- Test the bulb API directly: `http://YOUR_BULB_IP/light/0?turn=on&red=255&green=0&blue=0&white=0`

### Build Issues

- Verify Java 17+ is installed: `java -version`
- Verify Maven is installed: `mvn -version`
- Clean and rebuild: `mvn clean compile`

## API Endpoints

### POST /api/color

Sends color data to the Shelly bulb.

**Request Body:**
```json
{
  "red": 255,
  "green": 128,
  "blue": 64,
  "white": 0
}
```

**Response:**
```json
{
  "success": true,
  "message": "Color sent successfully"
}
```

## Architecture

- **Backend**: Spring Boot 3.5.6 with Java 17
- **Frontend**: Vanilla HTML5, CSS3, and JavaScript (ES2024)
- **Color Detection**: Native canvas-based averaging algorithm
- **Bulb API**: RESTful HTTP calls to Shelly bulb

## Development

### Project Structure

```
├── src/main/java/com/vibecoding/rgbw/
│   ├── VibeCodingApplication.java      # Main application class
│   ├── controller/
│   │   └── ColorController.java        # REST API endpoint
│   ├── service/
│   │   └── ShellyBulbService.java      # Bulb integration logic
│   └── model/
│       ├── ColorRequest.java           # Request DTO
│       └── ColorResponse.java          # Response DTO
├── src/main/resources/
│   ├── application.properties          # Configuration
│   └── static/
│       ├── index.html                  # UI structure
│       ├── app.js                      # Client-side logic
│       └── styles.css                  # Styling
└── tests/
    ├── rgbw-app.spec.js               # Playwright tests
    └── playwright.config.js            # Test configuration
```

### Building

```bash
mvn clean package
```

### Running Tests

```bash
mvn test
```

## License

See LICENSE file for details.
