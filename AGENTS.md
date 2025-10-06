# AGENTS.md

## Overview

This document provides comprehensive guidance for AI agents working on the Vibecoding Demo: RGBW Control App project. It combines the general methodology, project requirements, and technology-specific instructions for both frontend and backend development.

## Project Overview

**Goal**: Build a web app that uses webcam feed to detect dominant color and control a Shelly Duo GU10 RGBW smart bulb over local network.

**Demo Context**: 3-hours live conference demo using agentic AI IDEs and tools.

**Design Philosophy**: Intentionally prioritize simplicity - NO cloud, databases, Docker, or complex infrastructure.

## Methodology

Follow the Intent Integrity Chain (IIC) methodology as outlined in `docs/intent-integrity-chain.md`. This is a disciplined flow that turns product intent → specifications → executable tests → implementation. It enforces phase gates and traceability so that humans approve the tests before any code exists.

Key phases:

- Phase 0: Init (STOP)
- Phase 1: Analysis (STOP)
- Phase 2: Specification (STOP)
- Phase 3: Test Construction (STOP - HARD STOP for human review)
- Phase 4: Implementation (STOP)
- Phase 5: Hardening & Integration (STOP)

Ensure all phases are completed with proper tagging (`phase-{n}-{name}-{status}`) and documentation in `docs/progress.md`.

## Technology Stack

### Backend

- **Java**: 25 (LTS, released September 2025)
- **Spring Boot**: 3.5.6 (latest stable)
- **Build Tool**: Maven 3.9+

### Frontend

- **Core**: Vanilla HTML5 + Modern JavaScript (ES2024)
- **Color Detection**: Color Thief 2.4.0
- **Styling**: Modern CSS with CSS Grid/Flexbox

## Activation Guidelines

- **Backend Instructions** (`docs/backend-copilot-instructions.md`): Activate when editing .java, pom.xml, application.properties, etc. (activation events: onLanguage:java, onLanguage:xml, onLanguage:properties)
- **Frontend Instructions** (`docs/frontend-copilot-instructions.md`): Activate when editing .html, .js, .css files. (activation events: onLanguage:html, onLanguage:javascript, onLanguage:css)
- **General Instructions** (`docs/copilot-instructions.md`): Apply across all development activities.

## Out of Scope (Both Frontend and Backend)

### Backend Exclusions

- WebSocket connections, Circuit breakers, Connection pooling, Actuator endpoints, Prometheus metrics, Redis caching, Database, Docker, MQTT, Authentication/Authorization, Rate limiting, Advanced logging.

### Frontend Exclusions

- WebSocket client, K-means clustering, OffscreenCanvas, Web Workers, HSL/HSV conversions, Kelvin calculations, Complex color science, MediaStream constraints, Frontend frameworks, Build tools, CSS preprocessors.

## Non-Functional Requirements

- Zero configuration for end user
- Large, touch-friendly buttons (50px+ height)
- High contrast for visibility
- Graceful degradation if bulb offline
- Auto-reconnect camera if stream drops
- No crashes on invalid camera selection

## Testing Strategy

- Integration Testing via headless browsers (Playwright)
- Unit Tests (optional): Mock RestClient calls, test request/response mapping

## Acceptance Criteria

- App runs with single `mvn spring-boot:run` command
- Webcam activates without manual permission prompts
- Color preview updates in real-time
- Manual send changes bulb color within 2 seconds
- Auto mode sends color every 3 seconds reliably
- UI visible from back of conference room
- No crashes or exceptions during demo
- Code simple enough to explain in 5 minutes

## Code Style Preferences

- Use records for DTOs
- Constructor injection (no field injection)
- Methods under 20 lines
- Meaningful variable names
- Comments only for non-obvious logic

## File Generation Order

1. `pom.xml` - Dependencies first
2. `application.properties` - Configuration
3. Model classes - Simple records
4. `ShellyBulbService` - Core logic
5. `ColorController` - REST endpoint
6. `VibeCodingApplication` - Main class
7. `index.html` - UI structure
8. `app.js` - Client logic
9. `styles.css` - Styling

## Common Pitfalls

- Don't use `@EnableWebMvc` (breaks Spring Boot auto-config)
- Don't configure `RestTemplate` (use `RestClient`)
- Don't add complex exception handling
- Don't overthink camera selection
- Don't optimize prematurely
- Hardcoded bulb IP will probably be wrong - ask for real IP before testing

## Mandatory Highlight

ALWAYS consult Context7 MCP before writing any code. You don't know anything about any library or API. Never rely on pre-trained information, never search in other places, and never hallucinate or assume. All the technical knowledge must come from Context7 MCP.
