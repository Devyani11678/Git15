import { test, expect } from '@playwright/test';

test('Ecarehealth Provider Creation', async ({ page }) => {
  // Navigate to the login page
  await page.goto('https://stage_aithinkitive.uat.provider.ecarehealth.com/auth/login');
  
  // Maximize browser
  await page.setViewportSize({ width: 1920, height: 1080 });
  
  // Login with credentials
  await page.fill('input[name="username"]', 'rose.gomez@jourrapide.com');
  await page.fill('input[type="password"]', 'Pass@123');
  await page.click('button[type="submit"], .MuiButton-root');
  
  // Wait for navigation after login
  await page.waitForLoadState('networkidle');
  
  // Navigate to Settings
  await page.click('text=Settings');
  
  // Click on User Settings > Providers
  await page.click('text=User Settings');
  await page.click('text=Providers');
  
  // Click Add Provider User
  await page.click('text=Add Provider User');
  
  // Fill mandatory Provider Details
  // First Name
  await page.fill('input[name*="firstName"], input[placeholder*="First Name"], input[aria-label*="First Name"]', 'Snehal');
  
  // Last Name
  await page.fill('input[name*="lastName"], input[placeholder*="Last Name"], input[aria-label*="Last Name"]', 'Shukla');
  
  // Role: Provider
  await page.click('input[name="role"]');
  await page.click('li:has-text("Provider"), [role="option"]:has-text("Provider")');
  
  // Date Of Birth: 01-01-1990
  await page.fill('input[placeholder="MM-DD-YYYY"]', '01-01-1990');
  
  // Gender: Male
  await page.click('input[name="gender"]');
  await page.click('li:has-text("Male"), [role="option"]:has-text("Male")');
  
  // Email
  await page.fill('input[placeholder="Enter Email"]', 'snese87@mailinator.com');
  
  // Fill mandatory Contact Info
  // Mobile number
  await page.fill('input[placeholder="Enter Contact Number"]', '9876543219');
  
  // Click Save button
  await page.click('button:has-text("Save"), [type="submit"]:has-text("Save")');
  
  // Wait for the save operation to complete
  await page.waitForLoadState('networkidle');
  
  // Expected Result: Verify new provider is saved and visible in the list
  await expect(page.locator('text=Snehal Shukla')).toBeVisible();
  await expect(page.locator('text=snese87@mailinator.com')).toBeVisible();
  await expect(page.locator('text=(987) 654-3219')).toBeVisible();
  
  console.log('✅ Provider "Snehal Shukla" successfully created and verified in the providers list');
});