const { test, expect } = require('@playwright/test');

test.describe('Patient Registration - Mandatory Fields', () => {
  
  test('Create new patient and appointment with mandatory fields', async ({ page, context }) => {
    // Maximize browser window
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    // Navigate to login page
    await page.goto('https://stage_aithinkitive.uat.provider.ecarehealth.com/auth/login');
    
    // Login
    await page.fill('input[name="username"]', 'rose.gomez@jourrapide.com');
    await page.fill('input[type="password"]', 'Pass@123');
    await page.click('button:has-text("Let\'s get Started")');
    
    // Wait for dashboard to load
    await page.waitForSelector('text=Create');
    
    // Click "Create" button to open dropdown
    await page.click('div[aria-haspopup="true"]:has-text("Create")');
    
    // Wait for dropdown to appear and click "New Patient"
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
    
    // Fill Patient Details
    // First Name
    await page.fill('input[name*="firstName"]:not([name*="subscriber"]):not([name*="emergency"])', 'John');
    
    // Last Name
    await page.fill('input[name*="lastName"]:not([name*="subscriber"]):not([name*="emergency"])', 'Stef');
    
    // Date of Birth (01-01-1990)
    // Directly fill the DOB input field
    await page.click('label:has-text("Date Of Birth") + div input'); // Opens date picker
    await page.fill('label:has-text("Date Of Birth") + div input', '01-01-1990'); // Fill correct field

    
    // Gender - Select Male
    await page.click('div:has-text("Gender") + div .MuiSelect-select, [aria-labelledby*="gender"], [name*="gender"]');
    await page.waitForSelector('li:has-text("Male")');
    await page.click('li:has-text("Male")');
    
    // Fill Contact Info
    // Mobile Number
    await page.fill('input[name*="mobile"]:not([name*="emergency"]):not([name*="subscriber"])', '9876943210');
    
    // Email
    await page.fill('input[name*="email"]:not([name*="emergency"]):not([name*="subscriber"])', 'john784@mailinator.com');
    
    // Click "Save" to save the patient
    await page.click('button:has-text("Save")');
    
    // Wait for save operation to complete
    await page.waitForTimeout(3000);
    
    // Close the patient modal if it's still open
    const closeButton = page.locator('div[role="dialog"]:has-text("Add Patient") [data-testid="CloseIcon"]');
    if (await closeButton.first().isVisible()) {
      await closeButton.first().click();
    }
    
    // Create New Appointment
    // Click "Create" button again
    await page.click('div[aria-haspopup="true"]:has-text("Create")');
    
    // Click "New Appointment" from dropdown
    await page.waitForSelector('li[role="menuitem"]:has-text("New Appointment")');
    await page.click('li[role="menuitem"]:has-text("New Appointment")');
    
    // Wait for appointment form to load
    await page.waitForSelector('text=Schedule Appointment', { timeout: 10000 });
    
    // Select Patient: John Stef
    await page.click('input[placeholder*="Patient"], input[placeholder*="Search"]');
    await page.type('input[placeholder*="Patient"], input[placeholder*="Search"]', 'John Stef');
    await page.waitForSelector('text=John Stef');
    await page.click('text=John Stef');
    
    // Select Appointment type: New Patient Visit
    await page.click('div:has-text("Appointment Type") + div .MuiSelect-select, [name*="appointmentType"]');
    await page.waitForSelector('li:has-text("New Patient Visit")');
    await page.click('li:has-text("New Patient Visit")');
    
    // Fill Reason: Fever
    await page.fill('input[name*="reason"], textarea[name*="reason"]', 'Fever');
    
    // Select Time zone: Indian Standard Time
    await page.click('div:has-text("Time Zone") + div .MuiSelect-select, [name*="timezone"]');
    await page.waitForSelector('li:has-text("Indian Standard Time")');
    await page.click('li:has-text("Indian Standard Time")');
    
    // Select Visit type: In Office
    await page.click('div:has-text("Visit Type") + div .MuiSelect-select, [name*="visitType"]');
    await page.waitForSelector('li:has-text("In Office")');
    await page.click('li:has-text("In Office")');
    
    // Select Provider: Robert Shukla
    await page.click('div:has-text("Provider") + div .MuiSelect-select, [name*="provider"]');
    await page.waitForSelector('li:has-text("Robert Shukla")');
    await page.click('li:has-text("Robert Shukla")');
    
    // Click "View Availability"
    await page.click('button:has-text("View Availability")');
    
    // Wait for availability calendar and select date/time
    await page.waitForSelector('.calendar, .availability', { timeout: 10000 });
    
    // Select first available time slot
    const timeSlot = page.locator('.time-slot, .available-slot').first();
    if (await timeSlot.isVisible()) {
      await timeSlot.click();
    }
    
    // Click "Save and Close"
    await page.click('button:has-text("Save and Close"), button:has-text("Save")');
    
    // Wait for appointment to be saved
    await page.waitForTimeout(3000);
    
    // Navigate to Scheduling > Appointments to verify
    await page.click('button[role="tab"]:has-text("Scheduling")');
    await page.waitForSelector('text=Appointments');
    
    // Verify patient and appointment are listed
    await expect(page.locator('text=John Stef')).toBeVisible();
    await expect(page.locator('text=Fever')).toBeVisible();
    
    // Verify patient is saved and listed
    await page.click('button[role="tab"]:has-text("Patients")');
    await page.waitForTimeout(2000);
    await expect(page.locator('text=John Stef')).toBeVisible();
    
    console.log('✅ Test completed successfully');
    console.log('✅ Patient "John Stef" has been created and saved');
    console.log('✅ Appointment with reason "Fever" has been scheduled');
    console.log('✅ Both patient and appointment are visible in their respective sections');
  });
  
  test.afterEach(async ({ page }) => {
    // Clean up - take screenshot on failure
    await page.screenshot({ 
      path: `test-results/patient-registration-${Date.now()}.png`, 
      fullPage: true 
    });
  });
});

// Additional helper functions for better test maintainability
class PatientRegistrationPage {
  constructor(page) {
    this.page = page;
  }
  
  async login(email, password) {
    await this.page.fill('input[name="username"]', email);
    await this.page.fill('input[type="password"]', password);
    await this.page.click('button:has-text("Let\'s get Started")');
    await this.page.waitForSelector('text=Create');
  }
  
  async createNewPatient() {
    await this.page.click('div[aria-haspopup="true"]:has-text("Create")');
    await this.page.waitForSelector('li[role="menuitem"]:has-text("New Patient")');
    await this.page.click('li[role="menuitem"]:has-text("New Patient")');
    await this.page.waitForSelector('text=Add Patient');
    await this.page.click('text=Enter Patient Details');
    await this.page.click('button:has-text("Next")');
    await this.page.waitForSelector('text=PATIENT DETAILS');
  }
  
  async fillPatientDetails(firstName, lastName, dob, gender, mobile, email) {
    // Fill patient information
    await this.page.fill('input[name*="firstName"]:not([name*="subscriber"]):not([name*="emergency"])', firstName);
    await this.page.fill('input[name*="lastName"]:not([name*="subscriber"]):not([name*="emergency"])', lastName);

    // Date of Birth - fill directly (only DOB, not other date fields)
    await this.page.getByLabel('Date Of Birth *').fill(dob);

    // Gender
    await this.page.click('div:has-text("Gender") + div .MuiSelect-select, [aria-labelledby*="gender"], [name*="gender"]');
    await this.page.waitForSelector(`li:has-text("${gender}")`);
    await this.page.click(`li:has-text("${gender}")`);

    // Contact information
    await this.page.fill('input[name*="mobile"]:not([name*="emergency"]):not([name*="subscriber"])', mobile);
    await this.page.fill('input[name*="email"]:not([name*="emergency"]):not([name*="subscriber"])', email);
  }
  
  async savePatient() {
    await this.page.click('button:has-text("Save")');
    await this.page.waitForTimeout(3000);
    
    // Close modal if still open
    const closeButton = this.page.locator('[data-testid="CloseIcon"]');
    if (await closeButton.isVisible()) {
      await closeButton.click();
    }
  }
  
  async createNewAppointment(patientName, appointmentType, reason, provider) {
    await this.page.click('div[aria-haspopup="true"]:has-text("Create")');
    await this.page.waitForSelector('li[role="menuitem"]:has-text("New Appointment")');
    await this.page.click('li[role="menuitem"]:has-text("New Appointment")');
    await this.page.waitForSelector('text=Schedule Appointment', { timeout: 10000 });
    
    // Fill appointment details
    await this.page.click('input[placeholder*="Patient"], input[placeholder*="Search"]');
    await this.page.type('input[placeholder*="Patient"], input[placeholder*="Search"]', patientName);
    await this.page.waitForSelector(`text=${patientName}`);
    await this.page.click(`text=${patientName}`);
    
    // Select appointment type
    await this.page.click('div:has-text("Appointment Type") + div .MuiSelect-select, [name*="appointmentType"]');
    await this.page.waitForSelector(`li:has-text("${appointmentType}")`);
    await this.page.click(`li:has-text("${appointmentType}")`);
    
    // Fill reason
    await this.page.fill('input[name*="reason"], textarea[name*="reason"]', reason);
    
    // Select provider
    await this.page.click('div:has-text("Provider") + div .MuiSelect-select, [name*="provider"]');
    await this.page.waitForSelector(`li:has-text("${provider}")`);
    await this.page.click(`li:has-text("${provider}")`);
  }
}

// Usage example with Page Object Model
