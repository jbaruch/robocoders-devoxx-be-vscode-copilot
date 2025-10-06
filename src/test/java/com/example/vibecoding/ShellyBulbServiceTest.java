package com.example.vibecoding;

import org.junit.jupiter.api.Test;
import org.springframework.web.client.RestClient;

import static org.mockito.Mockito.mock;

class ShellyBulbServiceTest {

    @Test
    void setColor_shouldSendRequestToBulb() {
        // Given
        RestClient.Builder builder = mock(RestClient.Builder.class);
        String bulbIp = "192.168.1.100";
        ShellyBulbService service = new ShellyBulbService(builder, bulbIp);

        // When
        service.setColor(255, 0, 0);

        // Then
        // TODO: Verify RestClient call
        // This will fail until implemented
    }
}