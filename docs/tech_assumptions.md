# Technology Assumptions

## Decisions & Trade-offs

- **Java Version**: Java 25 LTS for latest features, but keep code simple.
- **Spring Boot**: 3.5.6 latest stable, auto-config enabled (no @EnableWebMvc).
- **HTTP Client**: Use RestClient (Spring 6) instead of RestTemplate for bulb communication.
- **Frontend**: Vanilla JS to avoid build tools; Color Thief for simple color detection.
- **Error Handling**: Simple try-catch, no complex resilience patterns.
- **Testing**: Integration tests with Playwright; unit tests optional.
- **Deployment**: No Docker, run with mvn spring-boot:run.
- **Security**: No auth, local network only.
