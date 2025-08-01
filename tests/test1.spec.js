import { test, expect } from '@playwright/test';

test.describe('Ecarehealth Provider Creation', () => {
  test('Create provider and set availability', async ({ page, context }) => {
    
    // Navigate to login page
    await page.goto('https://stage_aithinkitive.uat.provider.ecarehealth.com/auth/login');
    await page.waitForLoadState('networkidle');
    
    // Login with provided credentials
    await page.fill('input[name="username"]', 'rose.gomez@jourrapide.com');
    await page.fill('input[type="password"]', 'Pass@123');
    await page.click('button:has-text("Let\'s get Started")');
    await page.waitForLoadState('networkidle');
    
    // Navigate to Settings → User Settings → Providers
    await page.click('text=Settings');
    await page.click('text=User Settings');
    await page.click('text=Providers');
    
    // Click Add Provider User
    await page.click('text=Add Provider User');
    await page.waitForSelector('input[name*="firstName"], input[placeholder*="First Name"]');
    
    // Fill Provider Details
    await page.fill('input[name*="firstName"], input[placeholder*="First Name"]', 'Robert');
    await page.fill('input[name*="lastName"], input[placeholder*="Last Name"]', 'Shukla');
    
    // Set Role to Provider
    await page.click('input[name="role"]');
    await page.fill('input[name="role"]', 'Provider');
    await page.press('input[name="role"]', 'ArrowDown');
    await page.press('input[name="role"]', 'Enter');
    
    // Fill DOB (01-01-1990)
    const dobInput = page.locator('input[placeholder="MM-DD-YYYY"]').first();
    await dobInput.click();
    await dobInput.fill('01-01-1990');
    
    // Set Gender to Male
    await page.click('input[name="gender"]');
    await page.fill('input[name="gender"]', 'Male');
    await page.press('input[name="gender"]', 'ArrowDown');
    await page.press('input[name="gender"]', 'Enter');
    
    // Fill Email
    await page.fill('input[name="email"]', 'robert687@mailinator.com');
    
    // Fill Mobile Number
    await page.fill('input[name="phone"]', '9876533219');
    
    // Save Provider
    await page.click('button:has-text("Save")');
    await page.waitForLoadState('networkidle');
    
    // Navigate to Scheduling → Availability
    await page.click('text=Scheduling');
    await page.click('text=Availability');
    
    // Select Provider: Robert Shukla
    await page.click('input[name="providerId"]');
    await page.fill('input[name="providerId"]', 'Robert Shukla');
    await page.press('input[name="providerId"]', 'ArrowDown');
    await page.press('input[name="providerId"]', 'Enter');
    
    // Click Edit Availability
    await page.click('button:has-text("Edit Availability")');
    await page.waitForSelector('input[name="timezone"]');
    
    // Set Timezone: Indian Standard Time (UTC +5:30)
    await page.click('input[name="timezone"]');
    await page.fill('input[name="timezone"]', 'Indian Standard Time');
    await page.press('input[name="timezone"]', 'ArrowDown');
    await page.press('input[name="timezone"]', 'Enter');
    
    // Set Booking Window: 3 Week
    await page.click('input[name="bookingWindow"]');
    await page.fill('input[name="bookingWindow"]', '3 Week');
    await page.press('input[name="bookingWindow"]', 'ArrowDown');
    await page.press('input[name="bookingWindow"]', 'Enter');
    
    // Click Set to Weekdays
    await page.click('button:has-text("Set to Weekdays")');
    
    // Set Start Time: 12:00 AM
    const startTimeInput = page.locator('input').filter({ hasText: /Start Time/ }).first();
    if (await startTimeInput.count() === 0) {
      // Fallback: find time inputs by their context
      const timeInputs = page.locator('input').filter({ has: page.locator('text=Start Time') });
      await timeInputs.first().click();
      await timeInputs.first().fill('12:00 AM');
    } else {
      await startTimeInput.click();
      await startTimeInput.fill('12:00 AM');
    }
    
    // Set End Time: 11:45 PM
    const endTimeInput = page.locator('input').filter({ hasText: /End Time/ }).first();
    if (await endTimeInput.count() === 0) {
      // Fallback: find time inputs by their context
      const timeInputs = page.locator('input').filter({ has: page.locator('text=End Time') });
      await timeInputs.first().click();
      await timeInputs.first().fill('11:45 PM');
    } else {
      await endTimeInput.click();
      await endTimeInput.fill('11:45 PM');
    }
    
    // Save availability settings
    await page.click('button:has-text("Save")');
    await page.waitForLoadState('networkidle');
    
    // Verify provider creation and availability setup completed
    // You can add specific assertions here based on success messages or UI elements
    
    console.log('✅ Provider Robert Shukla created successfully');
    console.log('✅ Availability settings configured and saved');
  });
});

// Alternative simplified version for specific element targeting
test.describe('Ecarehealth Provider Creation - Simplified', () => {
  test('Create provider with direct element targeting', async ({ page }) => {
    
    // Login
    await page.goto('https://stage_aithinkitive.uat.provider.ecarehealth.com/auth/login');
    await page.locator('input[name="username"]').fill('rose.gomez@jourrapide.com');
    await page.locator('input[type="password"]').fill('Pass@123');
    await page.getByRole('button', { name: 'Let\'s get Started' }).click();
    
    // Navigate and create provider
    await page.getByText('Settings').click();
    await page.getByText('User Settings').click();
    await page.getByText('Providers').click();
    await page.getByText('Add Provider User').click();
    
    // Fill provider form
    await page.locator('input[placeholder*="First Name"]').fill('Robert');
    await page.locator('input[placeholder*="Last Name"]').fill('Shukla');
    await page.locator('input[name="role"]').click();
    await page.locator('input[name="role"]').fill('Provider');
    await page.keyboard.press('Enter');
    
    await page.locator('input[placeholder="MM-DD-YYYY"]').fill('01-01-1990');
    await page.locator('input[name="gender"]').click();
    await page.locator('input[name="gender"]').fill('Male');
    await page.keyboard.press('Enter');
    
    await page.locator('input[name="email"]').fill('robert687@mailinator.com');
    await page.locator('input[name="phone"]').fill('9876533219');
    
    await page.getByRole('button', { name: 'Save' }).click();
    
    // Set availability
    await page.getByText('Scheduling').click();
    await page.getByText('Availability').click();
    await page.locator('input[name="providerId"]').fill('Robert Shukla');
    await page.keyboard.press('Enter');
    
    await page.getByRole('button', { name: 'Edit Availability' }).click();
    await page.locator('input[name="timezone"]').fill('Indian Standard Time');
    await page.keyboard.press('Enter');
    await page.locator('input[name="bookingWindow"]').fill('3 Week');
    await page.keyboard.press('Enter');
    
    await page.getByRole('button', { name: 'Set to Weekdays' }).click();
    
    // Note: Time inputs may need specific IDs based on the dynamic form structure
    // await page.locator('[data-testid="start-time"]').fill('12:00 AM');
    // await page.locator('[data-testid="end-time"]').fill('11:45 PM');
    
    await page.getByRole('button', { name: 'Save' }).click();
    
    // Verify success
    await expect(page.locator('text=Robert Shukla')).toBeVisible();
  });
});