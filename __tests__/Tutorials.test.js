const playwright = require('playwright');
const tutorialPage = require('../pages/Tutorials.json')

const PAGE_URL = "https://qa-library-dev.herokuapp.com/";

for (const browserType of ["chromium", "webkit"]) {

  describe(`(${browserType}): UI Tests with Playwright`, () => {
    let browser = null;
    let page = null;

    beforeAll(async () => {
      browser = await playwright[browserType].launch({ headless: false });
      page = await browser.newPage();

      if (!page) {
        throw new Error("Connection wasn't established");
      }

      await page.goto(PAGE_URL, {
        waitUntil: "networkidle0"
      });

      
    }, 15000);

    afterAll(async () => {
      await browser.close();
    });

    test(`(${browserType}): Add tutorial`, async () => {
      expect(page).not.toBeNull();
      expect(await page.title()).not.toBeNull();
      await page.fill('input[type="text"]', 'cskow@tapqa.com');
      await page.fill('input[type="password"]', 'password');
      await page.click('#submit-button');
      await page.click('#tutorials')
      await page.click(tutorialPage.addTutorial)
    });
  });
}