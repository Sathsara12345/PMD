const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

(async function example() {
  let driver;

  try {
    driver = await new Builder().forBrowser('chrome').build();

    // Navigate to the page
    await driver.get('http://localhost:3000/Filter_specialty'); // Replace with your localhost URL

    // Find the specialty select element and select 'Heat Dissipation'
    const specialtySelect = await driver.findElement(By.tagName('select'));
    await specialtySelect.findElement(By.xpath("//option[contains(text(), 'Heat Dissipation')]")).click();

    // Find the filter button and click it
    const filterButton = await driver.findElement(By.tagName('button'));
    await filterButton.click();

    // Wait for the mechanics table to load
    await driver.wait(until.elementLocated(By.tagName('table')), 5000);

    // Find all the rows in the mechanics table
    const tableRows = await driver.findElements(By.css('table.table tbody tr'));

    // Assert that at least one row is displayed in the table
    assert(tableRows.length > 0, 'Filtered mechanics should be displayed');

    console.log('Test passed: Mechanics filtered successfully!');
  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    // Close the browser
    await driver.quit();
  }
})();
