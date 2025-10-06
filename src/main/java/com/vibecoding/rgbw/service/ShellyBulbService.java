package com.vibecoding.rgbw.service;

import com.vibecoding.rgbw.model.ColorRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class ShellyBulbService {
    
    private static final Logger log = LoggerFactory.getLogger(ShellyBulbService.class);
    
    private final RestClient restClient;
    private final String bulbIp;
    
    public ShellyBulbService(@Value("${shelly.bulb.ip}") String bulbIp) {
        this.bulbIp = bulbIp;
        this.restClient = RestClient.create();
    }
    
    public boolean setColor(ColorRequest colorRequest) {
        try {
            String url = String.format(
                "http://%s/light/0?turn=on&red=%d&green=%d&blue=%d&white=%d",
                bulbIp,
                colorRequest.red(),
                colorRequest.green(),
                colorRequest.blue(),
                colorRequest.white()
            );
            
            log.info("Sending color to bulb: R={} G={} B={} W={}", 
                colorRequest.red(), colorRequest.green(), colorRequest.blue(), colorRequest.white());
            
            restClient.get()
                .uri(url)
                .retrieve()
                .toBodilessEntity();
            
            return true;
        } catch (Exception e) {
            log.error("Failed to set bulb color: {}", e.getMessage());
            return false;
        }
    }
}
