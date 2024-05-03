const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

describe('ManageMechanic Component', function () {
  let driver;

  beforeEach(async function () {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterEach(async function () {
    await driver.quit();
  });

  it('should add a new mechanic', async function () {
    this.timeout(5000);
    await driver.get('http://localhost:3000/ManageMechanic');

    // Get the number of mechanics before adding a new one
    const mechanicsListBeforeAddition = await driver.findElements(By.css('table tbody tr'));
    const numberOfMechanicsBeforeAddition = mechanicsListBeforeAddition.length;

    // Assuming there's a button to add a new mechanic, click it
    await driver.findElement(By.css('button#add-mechanic')).click();

    // Fill in the form with new mechanic details
    await driver.findElement(By.css('input[placeholder="Name"]')).sendKeys('New Mechanic Name');
    await driver.findElement(By.css('select')).sendKeys('Specialty');
    await driver.findElement(By.css('input[placeholder="Contact Number"]')).sendKeys('1234567890');
    await driver.findElement(By.css('input[placeholder="Email"]')).sendKeys('newmechanic@example.com');

    // Submit the form
    await driver.findElement(By.css('button[type="submit"]')).click();

    // Get the number of mechanics after adding the new one
    const mechanicsListAfterAddition = await driver.findElements(By.css('table tbody tr'));
    const numberOfMechanicsAfterAddition = mechanicsListAfterAddition.length;

    // Check if the number of mechanics increased by 1 after addition
    assert.strictEqual(numberOfMechanicsAfterAddition, numberOfMechanicsBeforeAddition + 1);
});




});
