# Backend Copilot Instructions

## Methodology

Follow the Intent Integrity Chain (IIC) methodology as outlined in `docs/intent-integrity-chain.md`. This includes phased development with mandatory stops for human review, especially after test construction.

## Technology Stack

- **Java**: 25 (LTS, released September 2025)
- **Spring Boot**: 3.5.6 (latest stable)
- **Build Tool**: Maven 3.9+

## Activation

Activate these instructions when editing backend-related files. In VS Code extension terms, use the following activation events:

```json
"activationEvents": [
    "onLanguage:java",
    "onLanguage:xml",
    "onLanguage:properties"
]
```

This activates when opening or editing Java source files (.java), Maven POM files (pom.xml), and application properties files.

## Out of Scope

The following are explicitly excluded to maintain simplicity:
- WebSocket connections
- Circuit breakers (Resilience4j)
- Connection pooling configuration
- Actuator endpoints
- Prometheus metrics
- Redis caching
- Database (PostgreSQL, H2, etc.)
- Docker containerization
- MQTT protocol
- Authentication/Authorization
- Rate limiting
- Logging frameworks beyond SLF4J default

## Code Style Preferences

- Use records for DTOs (e.g., ColorRequest, ColorResponse)
- Use constructor injection (no field injection)
- Keep methods under 20 lines
- Use meaningful variable names
- Add comments only for non-obvious logic

## Mandatory Highlight

ALWAYS consult Context7 MCP before writing any code. You don't know anything about any library or API. Never rely on pre-trained information, never search in other places, and never hallucinate or assume. All the technical knowledge must come from Context7 MCP.