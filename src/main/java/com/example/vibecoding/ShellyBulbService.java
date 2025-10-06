package com.example.vibecoding;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.Map;

@Service
public class ShellyBulbService {

    private final RestClient restClient;
    private final String bulbIp;

    public ShellyBulbService(RestClient.Builder restClientBuilder, @Value("${shelly.bulb.ip}") String bulbIp) {
        this.restClient = restClientBuilder.build();
        this.bulbIp = bulbIp;
    }

    public void setColor(int r, int g, int b) {
        String url = "http://" + bulbIp + "/light/0";
        Map<String, Object> payload = Map.of(
            "turn", "on",
            "mode", "color",
            "red", r,
            "green", g,
            "blue", b
        );
        restClient.post()
                .uri(url)
                .body(payload)
                .retrieve()
                .toBodilessEntity();
    }
}