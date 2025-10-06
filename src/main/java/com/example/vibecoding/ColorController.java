package com.example.vibecoding;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ColorController {

    private final ShellyBulbService shellyBulbService;

    public ColorController(ShellyBulbService shellyBulbService) {
        this.shellyBulbService = shellyBulbService;
    }

    @PostMapping("/api/color")
    public ResponseEntity<ColorResponse> setColor(@RequestBody ColorRequest request) {
        // TODO: Implement
        return ResponseEntity.ok(new ColorResponse("success"));
    }
}