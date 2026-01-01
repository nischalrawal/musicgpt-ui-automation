import { type Page, expect } from '@playwright/test';
import logger from '@utils/logger.js';


export default abstract class BasePage {
    readonly page: Page;

    abstract readonly path : string;

    constructor(page: Page) {
        this.page = page;
        logger.debug(`Initialized BasePage for URL: ${this.page.url()}`);
    }
     
    // Abstract class that chill will implement to simulate load behaviour
    abstract waitForLoad() : Promise<void>


    /**
     * Navigates to a specific path relative to the BASE_URL.
     * @param path The path to navigate to endpoints. Default '/'
     */

    /**
     * Common Navigation Method
     * Uses the child class defined navigation
     */

    async navigate(){
    logger.info(`Navigating to: ${this.path}`);
    await this.page.goto(this.path);
    await this.waitForLoad();
    logger.info(`Page loaded sucessfully: ${this.path}`);
    }

    /**
     * Shared wrapper functions (Reusable across the pages)
     */

    /**
     * @param selector locator string to find element and perfrom click functionality
     */
    async click (selector : string){
        logger.info(`Clicking element: ${selector}`);
        await this.page.locator(selector).click();
    }
    
    /**
     * 
     * @param selector locator string to find element
     * @returns return trim text or empty string if string is null
     */

    async getText(selector : string) : Promise<string>{
        const text = await this.page.locator(selector).textContent();
        return text?.trim() ?? '';
    }
    
    /**
     * Verifies the page title.
     * @param expectedTitle The expected title string.
     */
    async verifyTitle(expectedTitle: string) {
        logger.debug(`Verifying page title: '${expectedTitle}'`);
        await expect(this.page).toHaveTitle(expectedTitle);
    }

   
    /**
     * @param milliseconds time to wait for timeout
     */

   async waitForTimeout(milliseconds: number) {
        logger.debug(`Waiting for ${milliseconds}ms`);
        await this.page.waitForTimeout(milliseconds);
    }

     /**
     * Takes a screenshot and saves it to the reports directory.
     * @param name Name of the screenshot file (without extension).
     */
    async takeScreenshot(name: string) {
        const screenshotPath = `./reports/screenshots/${name}-${Date.now()}.png`;
        logger.info(`Taking screenshot: ${screenshotPath}`);
        await this.page.screenshot({ path: screenshotPath });
    }


}