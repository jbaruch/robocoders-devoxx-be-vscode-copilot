package com.vibecoding.rgbw.controller;

import com.vibecoding.rgbw.model.ColorRequest;
import com.vibecoding.rgbw.model.ColorResponse;
import com.vibecoding.rgbw.service.ShellyBulbService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class ColorController {
    
    private final ShellyBulbService shellyBulbService;
    
    public ColorController(ShellyBulbService shellyBulbService) {
        this.shellyBulbService = shellyBulbService;
    }
    
    @PostMapping("/color")
    public ColorResponse setColor(@RequestBody ColorRequest colorRequest) {
        boolean success = shellyBulbService.setColor(colorRequest);
        String message = success ? "Color sent successfully" : "Failed to send color";
        return new ColorResponse(success, message);
    }
}
