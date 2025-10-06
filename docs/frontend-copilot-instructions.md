# Frontend Copilot Instructions

## Methodology

Follow the Intent Integrity Chain (IIC) methodology as outlined in `docs/intent-integrity-chain.md`. This includes phased development with mandatory stops for human review, especially after test construction.

## Technology Stack

- **Core**: Vanilla HTML5 + Modern JavaScript (ES2024)
- **Color Detection**: Color Thief 2.4.0
- **Styling**: Modern CSS with CSS Grid/Flexbox

## Activation

Activate these instructions when editing frontend-related files. In VS Code extension terms, use the following activation events:

```json
"activationEvents": [
    "onLanguage:html",
    "onLanguage:javascript",
    "onLanguage:css"
]
```

This activates when opening or editing HTML files (.html), JavaScript files (.js), and CSS files (.css).

## Out of Scope

The following are explicitly excluded to maintain simplicity:
- WebSocket client
- K-means clustering for color
- OffscreenCanvas
- Web Workers
- HSL/HSV conversions
- Kelvin temperature calculations
- Complex color science
- MediaStream constraints configuration
- Frontend frameworks (React, Vue, Angular)
- Build tools (Webpack, Vite)
- CSS preprocessors (Sass, Less)

## Design Philosophy

- Prioritize simplicity - NO cloud, databases, Docker, or complex infrastructure.
- Zero configuration for end user
- Large, touch-friendly buttons (50px+ height)
- High contrast for visibility from distance
- Graceful degradation if bulb offline
- Auto-reconnect camera if stream drops
- No crashes on invalid camera selection

## Mandatory Highlight

ALWAYS consult Context7 MCP before writing any code. You don't know anything about any library or API. Never rely on pre-trained information, never search in other places, and never hallucinate or assume. All the technical knowledge must come from Context7 MCP.