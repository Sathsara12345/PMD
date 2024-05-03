const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");

describe("Login Component", function () {
  let driver;

  before(async function () {
    this.timeout(30000); // Set a longer timeout (e.g., 30 seconds)
    driver = await new Builder().forBrowser("chrome").build();
  });

  after(async function () {
    await driver.quit();
  });

  it("should display error message for empty email and password", async function () {
    this.timeout(30000);
    await driver.get("http://localhost:3000/");

    await driver.findElement(By.id("email")).sendKeys("");
    await driver.findElement(By.id("password")).sendKeys("", Key.RETURN);

    // Check if error message is displayed
    const errorMessage = await driver.findElement(By.className("text-danger")).getText();
    assert.strictEqual(errorMessage, "Please enter both email and password");
  });

  it("should display error message for invalid email or password", async function () {
    this.timeout(30000);
    await driver.get("http://localhost:3000/");

    await driver.findElement(By.id("email")).sendKeys("invalid@example.com");
    await driver.findElement(By.id("password")).sendKeys("1234", Key.RETURN);

    // Check if error message is displayed
    const errorMessage = await driver.findElement(By.className("text-danger")).getText();
    assert.strictEqual(errorMessage, "Invalid email or password");
  });

  it("should redirect to the dashboard on successful login", async function () {
    this.timeout(30000);
    await driver.get("http://localhost:3000/");

    await driver.findElement(By.id("email")).sendKeys("pavan@gmail.com");
    await driver.findElement(By.id("password")).sendKeys("Pavan@1234", Key.RETURN);

    // Wait for the URL to contain "/Home"
    await driver.wait(until.urlContains("/Home"), 30000);
  });
});
