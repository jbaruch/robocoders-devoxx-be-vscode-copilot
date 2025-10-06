// Playwright Integration Tests for RGBW Control App
// Run with: npx playwright test

import { test, expect } from '@playwright/test';

const APP_URL = 'http://localhost:8080';

test.describe('RGBW Control App Integration Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
  });

  test('should load the application successfully', async ({ page }) => {
    await expect(page).toHaveTitle('RGBW Control App');
    await expect(page.locator('h1')).toContainText('RGBW Bulb Control');
  });

  test('should have camera selection dropdown', async ({ page }) => {
    const cameraSelect = page.locator('#camera-select');
    await expect(cameraSelect).toBeVisible();
  });

  test('should display color preview section', async ({ page }) => {
    const colorPreview = page.locator('#color-preview');
    await expect(colorPreview).toBeVisible();
    
    const colorRgb = page.locator('#color-rgb');
    await expect(colorRgb).toBeVisible();
  });

  test('should have Send to Bulb button', async ({ page }) => {
    const sendBtn = page.locator('#send-btn');
    await expect(sendBtn).toBeVisible();
    await expect(sendBtn).toContainText('Send to Bulb');
  });

  test('should have Auto Mode button', async ({ page }) => {
    const autoBtn = page.locator('#auto-btn');
    await expect(autoBtn).toBeVisible();
    await expect(autoBtn).toContainText('Auto Mode: OFF');
  });

  test('should send color data when Send button is clicked', async ({ page }) => {
    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    // Listen for the API call
    const responsePromise = page.waitForResponse(
      response => response.url().includes('/api/color') && response.request().method() === 'POST'
    );
    
    // Click the send button
    await page.click('#send-btn');
    
    // Wait for the response
    const response = await responsePromise;
    expect(response.status()).toBe(200);
    
    // Verify response contains success field
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('success');
    expect(responseBody).toHaveProperty('message');
  });

  test('should toggle auto mode when Auto button is clicked', async ({ page }) => {
    const autoBtn = page.locator('#auto-btn');
    
    // Initial state
    await expect(autoBtn).toContainText('Auto Mode: OFF');
    
    // Click to enable auto mode
    await autoBtn.click();
    await expect(autoBtn).toContainText('Auto Mode: ON');
    
    // Click again to disable
    await autoBtn.click();
    await expect(autoBtn).toContainText('Auto Mode: OFF');
  });

  test('should update color preview text', async ({ page }) => {
    const colorRgb = page.locator('#color-rgb');
    const text = await colorRgb.textContent();
    
    // Should show RGB format
    expect(text).toMatch(/RGB\(\d+,\s*\d+,\s*\d+\)/);
  });

  test('should have proper styling and layout', async ({ page }) => {
    const container = page.locator('.container');
    await expect(container).toBeVisible();
    
    const controls = page.locator('.controls');
    await expect(controls).toBeVisible();
    
    const colorSection = page.locator('.color-section');
    await expect(colorSection).toBeVisible();
  });

  test('should work on different viewport sizes', async ({ page }) => {
    // Desktop
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.locator('h1')).toBeVisible();
    
    // Tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('h1')).toBeVisible();
    
    // Mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('h1')).toBeVisible();
  });
});

test.describe('API Integration Tests', () => {
  
  test('POST /api/color should accept valid color data', async ({ request }) => {
    const colorData = {
      red: 255,
      green: 128,
      blue: 64,
      white: 0
    };
    
    const response = await request.post(`${APP_URL}/api/color`, {
      data: colorData
    });
    
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('success');
    expect(body).toHaveProperty('message');
  });
  
  test('POST /api/color should handle edge case values', async ({ request }) => {
    const colorData = {
      red: 0,
      green: 0,
      blue: 0,
      white: 0
    };
    
    const response = await request.post(`${APP_URL}/api/color`, {
      data: colorData
    });
    
    expect(response.status()).toBe(200);
  });
});
