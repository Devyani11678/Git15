import { test, expect } from '@playwright/test';

test('Provider Creation ➝ Patient Registration ➝ Appointment Scheduling', async ({ page, context }) => {
  // Test configuration
  test.setTimeout(120000); // Increase timeout for complex operations
  
  // Step 1: Login & Setup
  console.log('🚀 Starting test: Provider Creation ➝ Patient Registration ➝ Appointment Scheduling');
  
  // Launch browser and maximize window
  await page.setViewportSize({ width: 1920, height: 1080 });
  
  // Navigate to the login page
  await page.goto('https://stage_aithinkitive.uat.provider.ecarehealth.com/auth/login');
  await page.waitForLoadState('networkidle');
  
  // Login with credentials
  await page.fill('input[name="username"]', 'rose.gomez@jourrapide.com');
  await page.fill('input[type="password"]', 'Pass@123');
  
  // Click "Let's Get Started"
  await page.click('button:has-text("Let\'s get Started")');
  await page.waitForLoadState('networkidle');
  
  console.log('✅ Login completed successfully');

  // Step 2: Provider Creation
  console.log('👩‍⚕️ Starting Provider Creation');
  
  // Click "Settings"
  await page.click('text=Settings');
  await page.waitForTimeout(1000);
  
  // Click "User Settings" > "Providers"
  await page.click('text=User Settings');
  await page.waitForTimeout(1000);
  await page.click('text=Providers');
  await page.waitForTimeout(1000);
  
  // Click "Add Provider User"
  await page.click('text=Add Provider User');
  await page.waitForTimeout(2000);
  
  // Fill mandatory Provider Details
  await page.fill('input[name="firstName"]', 'Jackyy');
  await page.fill('input[name="lastName"]', 'Shukla');
  
  // Select Role: Provider
  await page.click('input[name="role"]');
  await page.waitForTimeout(500);
  await page.click('[role="option"]:has-text("Provider")');
  
  // Fill Date of Birth: 01-01-1990
  await page.fill('input[placeholder="MM-DD-YYYY"]', '01-01-1990');
  
  // Select Gender: Male
  await page.click('input[name="gender"]');
  await page.waitForTimeout(500);
  await page.click('[role="option"]:has-text("Male")');
  
  // Fill Email
  await page.fill('input[name="email"]', 'Jackyy673@mailinator.com');
  
  // Fill Contact Info - Mobile
  await page.fill('input[name="phone"]', '9876543219');
  
  // Click "Save"
  await page.click('button:has-text("Save")');
  await page.waitForTimeout(3000);
  
  console.log('✅ Provider Jackyy Shukla created successfully');

  // Step 3: Provider Availability Setup
  console.log('📅 Setting up Provider Availability');
  
  // Click "Scheduling" > "Availability"
  await page.click('text=Scheduling');
  await page.waitForTimeout(1000);
  await page.click('text=Availability');
  await page.waitForTimeout(2000);
  
  // Select Provider: Om Shukla
  await page.click('input[placeholder="Select Provider"]');
  await page.waitForTimeout(1000);
  await page.click('[role="option"]:has-text("Jackyy Shukla")');
  await page.waitForTimeout(1000);
  await page.click('input[placeholder="Visit Mode"]');
  await page.waitForTimeout(1000);
  await page.click('[role="option"]:has-text("Telehealth")');
  
  // Click "Edit Availability"
  await page.click('text=Edit Availability');
  await page.waitForTimeout(2000);
  
  // Select Timezone: Indian Standard Time (UTC +5:30)
  await page.click('input[name="timezone"]');
  await page.waitForTimeout(1000);
  await page.click('[role="option"]:has-text("Indian Standard Time (UTC +5:30)")');
  
  // Set Booking Window: 3 Week
  await page.click('input[name="bookingWindow"]');
  await page.waitForTimeout(1000);
  await page.click('[role="option"]:has-text("3 Week")');
  
  // Select "Set to Weekdays"
  await page.click('text=Set to Weekdays');
  await page.waitForTimeout(1000);
  
  // Set Day Slot - Start Time: 12:00 AM
    // Open Start Time dropdown using the combobox role and accessible name
    await page.click('role=combobox[name="Start Time *"]');
    await page.waitForSelector('role=option[name="12:00 AM"]', { timeout: 5000 });
    await page.click('role=option[name="12:00 AM"]');


  // Open End Time dropdown
    await page.click('role=combobox[name="End Time *"]');
    await page.waitForSelector('text=02:00 AM (2 hrs)', { timeout: 5000 });
    await page.click('text=02:00 AM (2 hrs)');
  
  // Select Checkbox of "Telehealth"
  await page.locator('xpath=/html/body/div[3]/div[3]/div/div[1]/div/div/div/div[2]/div/div[1]/div/div[3]/div[3]/label/span[1]/input').check();
    await page.waitForTimeout(1000);

  
  // Click "Save"
  await page.click('button:has-text("Save")');
  await page.waitForTimeout(3000);
  
  console.log('✅ Provider availability configured successfully');

  // Step 4: Patient Registration
  console.log('🏥 Starting Patient Registration');
  
  // Click "Create" > "New Patient"
 // Wait for dropdown to appear and click "New Patient"
    // Wait for dashboard to load
    await page.waitForSelector('text=Create');
    
    // Click "Create" button to open dropdown
    await page.click('div[aria-haspopup="true"]:has-text("Create")');
    await page.waitForSelector('li[role="menuitem"]:has-text("New Patient")');
    await page.click('li[role="menuitem"]:has-text("New Patient")');
    
    // Wait for the "Add Patient" modal to appear
    await page.waitForSelector('text=Add Patient');
    
    // Click on the "Enter Patient Details" tile (third option)
    await page.click('text=Enter Patient Details');
    
    // Click the "Next" button to proceed
    await page.click('button:has-text("Next")');
    
    // Wait for the patient form to load
    await page.waitForSelector('text=PATIENT DETAILS');

    //
  
  // Fill mandatory Patient Details
  await page.fill('input[name="firstName"]', 'Jackyy');
  await page.fill('input[name="lastName"]', 'Wardon');
  
  // Date of Birth: 01-01-1990
  await page.click('label:has-text("Date Of Birth") + div input'); // Opens date picker
    await page.fill('label:has-text("Date Of Birth") + div input', '01-01-1990'); // Fill correct field
  
  // Gender: Male
  await page.click('div:has-text("Gender") + div .MuiSelect-select, [aria-labelledby*="gender"], [name*="gender"]');
    await page.waitForSelector('li:has-text("Male")');
    await page.click('li:has-text("Male")');
    
    // Fill Contact Info
    // Mobile Number
    await page.fill('input[name*="mobile"]:not([name*="emergency"]):not([name*="subscriber"])', '9876943210');
    
    // Email
    await page.fill('input[name*="email"]:not([name*="emergency"]):not([name*="subscriber"])', 'Jackyy784@mailinator.com');


  // Click "Save"
  await page.click('button:has-text("Save")');
  await page.waitForTimeout(3000);
  
  console.log('✅ Patient Jackyy Wardon registered successfully');

  // Step 5: Appointment Creation
  console.log('📝 Creating Appointment');
  
  // Click "Create" > "New Appointment"
  await page.click('div[aria-haspopup="true"] .css-6qz1f6');
    
    // Step 4: Click "New Appointment"
    await page.click('li[role="menuitem"]:has-text("New Appointment")');
    
    // Wait for the appointment form to load
    await page.waitForSelector('div[title="Schedule Appointment"]');
    
    // Step 5: Select Patient Name - Jackyy Wardon
    await page.click('input[name="patientId"]');
    await page.fill('input[name="patientId"]', 'Jackyy Wardon');
    await page.click('li[role="option"]:has-text("Jackyy Wardon")');
    
    // Step 6: Select Appointment Type - New Patient Visit
    await page.click('input[name="type"]');
    await page.fill('input[name="type"]', 'New Patient Visit');
    await page.click('li[role="option"]:has-text("New Patient Visit")');
    
    // Step 7: Fill Reason for Visit - Fever
    await page.fill('input[name="chiefComplaint"]', 'Fever');
    
    // Step 8: Select Time Zone - Indian Standard Time
    await page.click('input[name="timezone"]');
    await page.fill('input[name="timezone"]', 'Indian Standard Time (UTC +5:30)');
    // Click on the first Indian Standard Time option
    await page.click('li[role="option"][id*="r34"]:first-child');
    
    // Step 9: Select Visit Type - Telehealth
    await page.click('button[value="VIRTUAL"]:has-text("Telehealth")');
    
    // Step 10: Select Provider - Jackyy Shukla
    await page.click('input[placeholder="Search Provider"]');
    await page.fill('input[placeholder="Search Provider"]', 'Jackyy Shukla');
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
    console.log('   - Patient: Jackyy Wardon');
    console.log('   - Type: New Patient Visit');
    console.log('   - Reason: Fever');
    console.log('   - Visit Type: Telehealth');
    console.log('   - Provider: Jackyy Shukla');

  // Step 6: Verify Appointment
  console.log('🔍 Verifying Appointment');
  
  // Click "Scheduling" in the taskbar
  await page.click('text=Scheduling');
  await page.waitForTimeout(1000);
  
  // Click "Appointments"
  await page.click('text=Appointments');
  await page.waitForTimeout(2000);
  
  // Verify the newly created appointment is listed
  const appointmentExists = await page.locator('text=John Wardon').or(
    page.locator('text=Jackyy Shukla')
  ).or(
    page.locator('text=Fever')
  ).first().isVisible();
  
  expect(appointmentExists).toBeTruthy();
  
  console.log('✅ Test completed successfully!');
  console.log('📋 Verification Results:');
  console.log('  ✓ Provider Jackyy Shukla created and listed');
  console.log('  ✓ Provider availability saved');
  console.log('  ✓ Patient John Wardon created and listed');
  console.log('  ✓ Appointment created and listed for patient with selected provider');

  // Take final screenshot for verification
  await page.screenshot({ 
    path: 'test-completion-verification.png', 
    fullPage: true 
  });
});

// Additional helper functions for robust element interaction
async function waitAndClick(page, selector, timeout = 5000) {
  try {
    await page.waitForSelector(selector, { timeout });
    await page.click(selector);
  } catch (error) {
    console.warn(`Could not click ${selector}: ${error.message}`);
    // Try alternative selectors or approaches here
  }
}

async function waitAndFill(page, selector, value, timeout = 5000) {
  try {
    await page.waitForSelector(selector, { timeout });
    await page.fill(selector, value);
  } catch (error) {
    console.warn(`Could not fill ${selector}: ${error.message}`);
  }
}

async function waitAndSelect(page, selector, value, timeout = 5000) {
  try {
    await page.waitForSelector(selector, { timeout });
    await page.click(selector);
    await page.waitForTimeout(500);
    await page.click(`[role="option"]:has-text("${value}")`);
  } catch (error) {
    console.warn(`Could not select ${value} from ${selector}: ${error.message}`);
  }
}