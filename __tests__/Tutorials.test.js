const playwright = require('playwright');
const tutorialPage = require('../pages/Tutorials.json')
const addTutorialPage = require('../pages/AddTutorial.json')
const loginPage = require('../pages/Login.json')
const commonElements = require('../pages/Common.json')
const constants = require('../helpers/constants.json')
const sidebar = require('../components/sideBar.json')

for (const browserType of ["chromium", "webkit"]) {

  describe(`(${browserType}): UI Tutorial Tests with Playwright`, () => {
    let browser = null;
    let page = null;

    beforeAll(async () => {
      browser = await playwright[browserType].launch({ headless: false });
      page = await browser.newPage();

      if (!page) {
        throw new Error("Connection wasn't established");
      }

      await page.goto(constants.URL, {
        waitUntil: "networkidle0"
      });

      await page.fill(loginPage.email, 'cskow@tapqa.com');
      await page.fill(loginPage.password, 'password');
      await page.click(loginPage.submit);
      expect(await page.title()).toBe("QA Library");
    }, 15000);

    afterEach(async () => {
      await page.goto(constants.URL, {
        waitUntil: "networkidle0"
      });
    }, 15000)

    afterAll(async () => {
      await browser.close();
    });

    test(`(${browserType}): Add tutorial`, async () => {
      expect(await page.title()).toBe("QA Library");
      
      await page.click(sidebar.tutorials)
      await page.click(tutorialPage.addTutorial)
      await page.fill(addTutorialPage.title, "Into the abyss")
    });

    test(`(${browserType}): Add tutorial alert`, async () => {
      expect(await page.title()).toBe("QA Library");

      await page.click(sidebar.tutorials)
      await page.click(tutorialPage.addTutorial)
      await page.fill(addTutorialPage.title, "Into the abyss")
      await page.click(commonElements.submit)
    });
  });
}