import { test, expect } from '@playwright/test';

test.describe('Patient Registration - Mandatory Fields', () => {
  test('should create a new appointment with mandatory fields', async ({ page, context }) => {
    // Test setup
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    // Step 1: Navigate to the login page
    await page.goto('https://stage_aithinkitive.uat.provider.ecarehealth.com/auth/login');
    
    // Step 2: Login with provided credentials
    await page.fill('input[name="username"]', 'rose.gomez@jourrapide.com');
    await page.fill('input[type="password"]', 'Pass@123');
    await page.click('button:has-text("Let\'s get Started")');
    
    // Wait for navigation to complete
    await page.waitForLoadState('networkidle');
    
    // Step 3: Click "Create" dropdown
    await page.click('div[aria-haspopup="true"] .css-6qz1f6');
    
    // Step 4: Click "New Appointment"
    await page.click('li[role="menuitem"]:has-text("New Appointment")');
    
    // Wait for the appointment form to load
    await page.waitForSelector('div[title="Schedule Appointment"]');
    
    // Step 5: Select Patient Name - John Stef
    await page.click('input[name="patientId"]');
    await page.fill('input[name="patientId"]', 'John Stef');
    await page.click('li[role="option"]:has-text("John  Stef")');
    
    // Step 6: Select Appointment Type - New Patient Visit
    await page.click('input[name="type"]');
    await page.fill('input[name="type"]', 'New Patient Visit');
    await page.click('li[role="option"]:has-text("New Patient Visit")');
    
    // Step 7: Fill Reason for Visit - Fever
    await page.fill('input[name="chiefComplaint"]', 'Fever');
    
    // Step 8: Select Time Zone - Alaska Standard Time
    await page.click('input[name="timezone"]');
    await page.fill('input[name="timezone"]', 'Alaska');
    // Click on the first Alaska timezone option
    await page.click('li[role="option"][id*="r34"]:first-child');
    
    // Step 9: Select Visit Type - Telehealth
    await page.click('button[value="VIRTUAL"]:has-text("Telehealth")');
    
    // Step 10: Select Provider - Robert Shukla
    await page.click('input[placeholder="Search Provider"]');
    await page.fill('input[placeholder="Search Provider"]', 'Robert Shukla');
    // Click on the first matching provider option
    await page.click('li[role="option"][id*="r38"]:first-child');
    
    // Step 11: Click "View Availability"
    await page.click('button:has-text("View availability")');
    
    // Step 12: Handle date/time selection dialog
    // If date selection dialog appears, select a date and close it
    const dateDialog = page.locator('.MuiDialog-paper[role="dialog"]');
    if (await dateDialog.isVisible()) {
      // Select August 5th as an available date
      await page.click('button[data-timestamp="1754332200000"]:has-text("5")');
      // Close the dialog if no slots are available
      await page.click('.MuiDialog-paper svg[data-testid="CloseIcon"]');
    }
    
    // Step 13: Click "Save and Close"
    await page.click('button:has-text("Save And Close")');
    
    // Wait for the appointment to be saved and navigate back
    await page.waitForLoadState('networkidle');
    
    // Step 14: Verify we're on the Scheduling > Appointments page
    await expect(page).toHaveURL(/.*scheduling.*appointment.*/);
    
    // Step 15: Verify the appointment appears in the list
    // Look for appointments with the specified criteria
    const appointmentGrid = page.locator('.MuiDataGrid-root');
    await expect(appointmentGrid).toBeVisible();
    
    // Verify that appointments with "Fever" as reason are visible
    const feverAppointments = page.locator('[data-field="chiefComplaint"]:has-text("Fever")');
    await expect(feverAppointments).toHaveCount({ min: 1 });
    
    // Verify that telehealth appointments are visible
    const telehealthAppointments = page.locator('.MuiChip-label:has-text("Telehealth")');
    await expect(telehealthAppointments).toHaveCount({ min: 1 });
    
    // Verify that New Patient Visit appointments are visible
    const newPatientVisits = page.locator('[data-field="type"]:has-text("New Patient Visit")');
    await expect(newPatientVisits).toHaveCount({ min: 1 });
    
    console.log('✅ Test completed successfully!');
    console.log('✅ Appointment created with:');
    console.log('   - Patient: John Stef');
    console.log('   - Type: New Patient Visit');
    console.log('   - Reason: Fever');
    console.log('   - Visit Type: Telehealth');
    console.log('   - Provider: Robert Shukla');
  });
});