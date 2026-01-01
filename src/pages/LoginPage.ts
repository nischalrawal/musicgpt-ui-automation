import {type Page, type Locator} from '@playwright/test';
import BasePage from "@pages/BasePage.js";
import { AppRoutes } from '@config/endpoint.js';

export default class LoginPage extends BasePage{
    //path   
    readonly path = AppRoutes.home;


    // Login Elements
    readonly signInButton : Locator;
    readonly  authMethod : Locator; 
    readonly userNameInput : Locator;



    constructor (page : Page){
        super(page) // pass page up to BasePage

        this.signInButton = page.getByRole('button', {name: 'Sign in'});  
        this.authMethod = page.getByRole('button', { name: 'Continue with Email' }); 
        this.userNameInput = page.getByPlaceholder('Email');
}

// Implementing abstract method from abstract BasePage class

async waitForLoad(): Promise<void> {
    await this.signInButton.waitFor({ state: 'visible' });
}






}
