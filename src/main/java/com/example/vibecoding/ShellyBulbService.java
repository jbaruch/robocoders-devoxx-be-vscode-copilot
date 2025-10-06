package com.example.vibecoding;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class ShellyBulbService {

    private final RestClient restClient;
    private final String bulbIp;

    public ShellyBulbService(RestClient.Builder restClientBuilder, String bulbIp) {
        this.restClient = restClientBuilder.build();
        this.bulbIp = bulbIp;
    }

    public void setColor(int r, int g, int b) {
        // TODO: Implement bulb API call
        throw new UnsupportedOperationException("Not implemented yet");
    }
}