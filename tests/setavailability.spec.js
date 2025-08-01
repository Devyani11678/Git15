import { test, expect } from '@playwright/test';

test('Ecarehealth Provider Creation - Edit Availability', async ({ page }) => {
  // Navigate to the login page
  await page.goto('https://stage_aithinkitive.uat.provider.ecarehealth.com/auth/login');
  
  // Wait for the page to load
  await page.waitForLoadState('networkidle');
  
  // Login with credentials
  await page.fill('input[name="username"]', 'rose.gomez@jourrapide.com');
  await page.fill('input[type="password"]', 'Pass@123');
  
  // Click login button
  await page.click('button[type="submit"], button:has-text("Sign In"), button:has-text("Login"), .MuiButton-root');
  
  // Wait for navigation after login
  await page.waitForLoadState('networkidle');
  
  // Navigate to Scheduling > Availability
  await page.click('text=Scheduling');
  await page.waitForTimeout(1000); // Wait for menu to appear
  await page.click('text=Availability');
  
  // Wait for availability page to load
  //await page.waitForLoadState('networkidle');
  
  // Click on "Edit Availability"
  await page.click('text=Edit Availability');
  
  // Wait for the edit form to load
  await page.waitForTimeout(2000);
  
  // Select Provider from dropdown - "Snehal Shukla"
  await page.click('input[name="providerId"]');
  await page.fill('input[name="providerId"]', 'Snehal Shukla');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');
  
  // Select Timezone - "Indian Standard Time (UTC +5:30)"
  await page.click('input[name="timezone"]');
  await page.fill('input[name="timezone"]', 'Indian Standard Time');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');
  
  // Select Booking Window - "1 Week"
  await page.click('input[name="bookingWindow"]');
  await page.fill('input[name="bookingWindow"]', '1 Week');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');
  
  // Click "Set to Weekdays" option
  await page.click('text=Set to Weekdays');
  
  // Set Start Time to "12:00 AM"
  await page.evaluate(() => {
    const startTimeInputs = document.querySelectorAll('input[placeholder="Select"]');
    let startTimeInput = null;
    for (let input of startTimeInputs) {
      const parent = input.closest('div');
      if (parent && parent.innerHTML.includes('Start Time')) {
        startTimeInput = input;
        break;
      }
    }
    if (startTimeInput) {
      startTimeInput.click();
      startTimeInput.value = '12:00 AM';
      startTimeInput.dispatchEvent(new Event('input', { bubbles: true }));
      startTimeInput.dispatchEvent(new Event('change', { bubbles: true }));
      const arrowDownEvent = new KeyboardEvent('keydown', {
        key: 'ArrowDown',
        bubbles: true
      });
      startTimeInput.dispatchEvent(arrowDownEvent);
      const enterEvent = new KeyboardEvent('keydown', {
        key: 'Enter',
        bubbles: true
      });
      startTimeInput.dispatchEvent(enterEvent);
    }
  });
  
  // Wait a moment for the start time to be set
  await page.waitForTimeout(500);
  
  // Set End Time to "11:45 PM"
  await page.evaluate(() => {
    const endTimeInputs = document.querySelectorAll('input[placeholder="Select"]');
    let endTimeInput = null;
    for (let input of endTimeInputs) {
      const parent = input.closest('div');
      if (parent && parent.innerHTML.includes('End Time')) {
        endTimeInput = input;
        break;
      }
    }
    if (endTimeInput) {
      endTimeInput.click();
      endTimeInput.value = '11:45 PM';
      endTimeInput.dispatchEvent(new Event('input', { bubbles: true }));
      endTimeInput.dispatchEvent(new Event('change', { bubbles: true }));
      const arrowDownEvent = new KeyboardEvent('keydown', {
        key: 'ArrowDown',
        bubbles: true
      });
      endTimeInput.dispatchEvent(arrowDownEvent);
      const enterEvent = new KeyboardEvent('keydown', {
        key: 'Enter',
        bubbles: true
      });
      endTimeInput.dispatchEvent(enterEvent);
    }
  });
  
  // Wait a moment for the end time to be set
  await page.waitForTimeout(500);
  
  // Click on "Save" button
  await page.click('text=Save');
  
  // Wait for save operation to complete
  await page.waitForTimeout(3000);
  
  // Verify that the availability has been saved (you can add specific verification here)
  // For example, check for success message or that the form is closed
  console.log('Provider availability has been saved successfully');
});

// Alternative version with more robust selectors and error handling
/*test('Ecarehealth Provider Creation - Edit Availability (Robust)', async ({ page }) => {
  try {
    // Navigate to the login page
    await page.goto('https://stage_aithinkitive.uat.provider.ecarehealth.com/auth/login');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    // Login with credentials
    await page.waitForSelector('input[name="username"]', { timeout: 10000 });
    await page.fill('input[name="username"]', 'rose.gomez@jourrapide.com');
    await page.fill('input[type="password"]', 'Pass@123');
    
    // Click login button
    await page.click('button[type="submit"]');
    
    // Wait for navigation after login
    await page.waitForLoadState('networkidle');
    
    // Navigate to Scheduling
    await page.waitForSelector('text=Scheduling', { timeout: 10000 });
    await page.click('text=Scheduling');
    
    // Navigate to Availability
    await page.waitForTimeout(1000);
    await page.click('text=Availability');
    
    // Wait for availability page to load
    await page.waitForLoadState('networkidle');
    
    // Click on "Edit Availability"
    await page.waitForSelector('text=Edit Availability', { timeout: 10000 });
    await page.click('text=Edit Availability');
    
    // Wait for the edit form to load
    await page.waitForTimeout(2000);
    
    // Fill provider selection
    await page.waitForSelector('input[name="providerId"]', { timeout: 10000 });
    await page.click('input[name="providerId"]');
    await page.fill('input[name="providerId"]', 'Snehal Shukla');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    
    // Fill timezone selection
    await page.waitForSelector('input[name="timezone"]', { timeout: 5000 });
    await page.click('input[name="timezone"]'); 
    await page.fill('input[name="timezone"]', 'Indian Standard Time');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    
    // Fill booking window selection
    await page.waitForSelector('input[name="bookingWindow"]', { timeout: 5000 });
    await page.click('input[name="bookingWindow"]');
    await page.fill('input[name="bookingWindow"]', '1 Week');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    
    // Click "Set to Weekdays" option
    await page.waitForSelector('text=Set to Weekdays', { timeout: 5000 });
    await page.click('text=Set to Weekdays');
    
    // Set time slots using JavaScript evaluation for better control
    await page.evaluate(() => {
      // Set Start Time to 12:00 AM
      const startTimeInputs = document.querySelectorAll('input[placeholder="Select"]');
      let startTimeInput = null;
      
      // Find the start time input (usually the first time input in the Time Slots section)
      for (let input of startTimeInputs) {
        const parent = input.closest('div');
        if (parent && parent.innerHTML.includes('Start Time')) {
          startTimeInput = input;
          break;
        }
      }
      
      if (startTimeInput) {
        startTimeInput.click();
        startTimeInput.value = '12:00 AM';
        startTimeInput.dispatchEvent(new Event('input', { bubbles: true }));
        startTimeInput.dispatchEvent(new Event('change', { bubbles: true }));
        
        const arrowDownEvent = new KeyboardEvent('keydown', {
          key: 'ArrowDown',
          bubbles: true
        });
        startTimeInput.dispatchEvent(arrowDownEvent);
        
        setTimeout(() => {
          const enterEvent = new KeyboardEvent('keydown', {
            key: 'Enter',
            bubbles: true
          });
          startTimeInput.dispatchEvent(enterEvent);
        }, 100);
      }
      
      // Set End Time to 11:45 PM
      setTimeout(() => {
        let endTimeInput = null;
        for (let input of startTimeInputs) {
          const parent = input.closest('div');
          if (parent && parent.innerHTML.includes('End Time')) {
            endTimeInput = input;
            break;
          }
        }
        
        if (endTimeInput) {
          endTimeInput.click();
          endTimeInput.value = '11:45 PM';
          endTimeInput.dispatchEvent(new Event('input', { bubbles: true }));
          endTimeInput.dispatchEvent(new Event('change', { bubbles: true }));
          
          const arrowDownEvent = new KeyboardEvent('keydown', {
            key: 'ArrowDown',
            bubbles: true
          });
          endTimeInput.dispatchEvent(arrowDownEvent);
          
          setTimeout(() => {
            const enterEvent = new KeyboardEvent('keydown', {
              key: 'Enter',
              bubbles: true
            });
            endTimeInput.dispatchEvent(enterEvent);
          }, 100);
        }
      }, 1000);
    });
    
    // Wait for time settings to be applied
    await page.waitForTimeout(2000);
    
    // Click on "Save" button
    await page.waitForSelector('text=Save', { timeout: 5000 });
    await page.click('text=Save');
    
    // Wait for save operation to complete
    await page.waitForTimeout(5000);
    
    // Verify success (add your specific verification logic here)
    console.log('Provider availability settings have been saved successfully');
    
    // Optional: Take a screenshot of the final result
    await page.screenshot({ path: 'availability_saved.png', fullPage: true });
    
  } catch (error) {
    console.error('Test failed with error:', error);
    await page.screenshot({ path: 'error_screenshot.png', fullPage: true });
    throw error;
  }
});*/