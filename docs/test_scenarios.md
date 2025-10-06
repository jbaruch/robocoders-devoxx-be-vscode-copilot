# Test Scenarios

## Testable Behaviors/Specs

### Integration Test Scenarios (Playwright)

1. **Camera dropdown populates** - Test: Verify dropdown has options on page load
2. **Video stream displays** - Test: Select camera, check video element has stream
3. **Color preview updates** - Test: Mock color detection, check preview box background
4. **Manual send works** - Test: Click send, verify API call made
5. **Auto mode sends every 3s** - Test: Enable auto, wait, verify API calls
6. **Bulb changes color** - Test: Send color, verify bulb API called (mock or real)
7. **Error on network failure** - Test: Mock network error, check error message
8. **Cross-browser support** - Test: Run on Chrome, Firefox, Safari

### Unit Test Scenarios (Optional)

1. **ShellyBulbService sends color** - Test: Mock RestClient, verify request
2. **ColorController maps request** - Test: POST /api/color, verify service called

<!-- Scenario → Test links will be added in Phase 3 -->