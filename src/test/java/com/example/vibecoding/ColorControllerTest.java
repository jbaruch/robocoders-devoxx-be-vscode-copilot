package com.example.vibecoding;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.doNothing;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ColorController.class)
class ColorControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ShellyBulbService shellyBulbService;

    @Test
    void setColor_shouldReturnSuccess() throws Exception {
        // Given
        String json = "{\"r\":255,\"g\":0,\"b\":0}";
        doNothing().when(shellyBulbService).setColor(255, 0, 0);

        // When & Then
        mockMvc.perform(post("/api/color")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("success"));
    }
}