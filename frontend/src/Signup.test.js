const { Builder, By, until } = require('selenium-webdriver');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
const { expect } = chai;
import('chai').then(chai => {
describe('Signup Component', function () {
    let driver;

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
    });

    it('should successfully signup with valid input', async function () {
        await driver.get('http://localhost:3000/signup');

        // Enter valid input
        await driver.findElement(By.id('form1')).sendKeys('testuser');
        await driver.findElement(By.id('form2')).sendKeys('test@example.com');
        await driver.findElement(By.id('form3')).sendKeys('1234');

        // Submit the form
        await driver.findElement(By.css('button[type="submit"]')).click();

        // Wait for successful registration alert
        await driver.wait(until.alertIsPresent());

        // Get the alert text
        const alertText = await driver.switchTo().alert().getText();

        // Assert that the alert text is correct
        expect(alertText).to.equal('Registration successful!');

        // Dismiss the alert
        await driver.switchTo().alert().accept();
    });

    it('should display an error message for empty input fields', async function () {
        await driver.get('http://localhost:3000/signup');

        // Submit the form without filling any input fields
        await driver.findElement(By.css('button[type="submit"]')).click();

        // Wait for error message
        await driver.wait(until.elementLocated(By.css('.notyf__toast--error')));

        // Get the error message text
        const errorMessage = await driver.findElement(By.css('.notyf__toast--error')).getText();

        // Assert that the error message is correct
        expect(errorMessage).to.equal('All fields are required');
    });

    after(async function () {
        await driver.quit();
    });
});
}).catch(error => {
    console.error('Error importing chai:', error);
});