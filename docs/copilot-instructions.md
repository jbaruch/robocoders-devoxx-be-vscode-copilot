# Copilot Instructions

## Methodology

Follow the Intent Integrity Chain (IIC) methodology as outlined in `docs/intent-integrity-chain.md`. This includes phased development with mandatory stops for human review, especially after test construction.

Key phases:
- Phase 0: Init
- Phase 1: Analysis
- Phase 2: Specification
- Phase 3: Test Construction (HARD STOP for review)
- Phase 4: Implementation
- Phase 5: Hardening & Integration

Ensure all phases are completed with proper tagging and documentation.

## Mandatory Highlight

ALWAYS consult Context7 MCP before writing any code. You don't know anything about any library or API. Never rely on pre-trained information, never search in other places, and never hallucinate or assume. All the technical knowledge must come from Context7 MCP.