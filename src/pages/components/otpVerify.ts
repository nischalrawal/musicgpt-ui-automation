import { type Page, type Locator } from "@playwright/test";
import logger from "@utils/logger.js";

export class OtpVerify {
  private page: Page;
  readonly verifyOtpButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.verifyOtpButton = page.getByRole("button", { name: "Continue" });
  }


  // Check if the OTP component is visible
  async isVisible(): Promise<boolean> {
    return await this.page.getByLabel("Please enter OTP character 1 ").isVisible();
   }


   // Check if the otp verification 'Continue' button is visible
  async init(): Promise<void> {
    await this.verifyOtpButton.waitFor({ state: "visible" });
    logger.info("Continue OTP button is visible on the page");
  }

  async submitOtp(code: string) {
    logger.info(`Entering otp in otp component ${code}`);

    for (let i = 0; i < code.length; i++) {
      const digit = code[i];
      const boxIndex = i + 1;

      // Lock specific otp box to enter otp
      const inputOtp = await this.page.getByLabel(`Please enter OTP character ${boxIndex}`);
       if (digit) {
      await inputOtp.fill(digit);
     logger.debug(`OTP digit filled: ${digit}`);
     } 
     else {
     logger.warn('Skipping OTP fill: digit was undefined');
}
  }
     logger.info('OTP Component: Clicking Verify button');
     
     // Clicking 'Continue' button for otp verificatioin
     await this.verifyOtpButton.click();

}

}
