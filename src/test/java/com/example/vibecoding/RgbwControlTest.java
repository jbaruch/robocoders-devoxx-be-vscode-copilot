package com.example.vibecoding;

import com.microsoft.playwright.*;
import org.junit.jupiter.api.*;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class RgbwControlTest {

    private Playwright playwright;
    private Browser browser;
    private Page page;

    @BeforeAll
    void setUp() {
        playwright = Playwright.create();
        browser = playwright.chromium().launch();
    }

    @AfterAll
    void tearDown() {
        browser.close();
        playwright.close();
    }

    @BeforeEach
    void setUpPage() {
        page = browser.newPage();
    }

    @AfterEach
    void tearDownPage() {
        page.close();
    }

    @Test
    void cameraDropdownPopulates() {
        // Given
        page.navigate("http://localhost:8082");

        // When
        // Page loads

        // Then
        // TODO: Check dropdown has options
        // assertTrue(page.locator("#camera-select option").count() > 0);
    }

    @Test
    void videoStreamDisplays() {
        // Given
        page.navigate("http://localhost:8082");

        // When
        page.selectOption("#camera-select", "0");

        // Then
        // TODO: Check video has stream
        // assertTrue(page.locator("video").isVisible());
    }

    @Test
    void manualSendColor() {
        // Given
        page.navigate("http://localhost:8082");

        // When
        page.click("#send-button");

        // Then
        // TODO: Check status or bulb response
        // For now, just check no error
    }
}