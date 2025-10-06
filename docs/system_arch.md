# System Architecture

## Architecture & Patterns

- **Client-Server Architecture**: Frontend (HTML/JS) communicates with Backend (Spring Boot) via REST API.
- **Frontend**: Single-page app with webcam access, real-time color detection, manual/auto send modes.
- **Backend**: REST controller receives color data, calls Shelly bulb API to set color.
- **Communication**: HTTP REST for frontend-backend; HTTP for backend-bulb.
- **Patterns**: Simple MVC on backend (Controller -> Service); Event-driven on frontend for camera updates.
