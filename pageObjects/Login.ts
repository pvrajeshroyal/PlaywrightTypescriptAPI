import {Page, Locator} from '@playwright/test';

export default class Login {
    
  private userNameField: Locator;
  private passwordField: Locator;
  private submitButton: Locator;

  constructor(public page:Page) {
    this.userNameField = page.locator('input[name="username"]');
    this.passwordField = page.locator('input[name="password"]');
    this.submitButton = page.locator('button[type="submit"]');
} 

async signIn(username,password){
  await this.userNameField.fill(username);  
  await this.userNameField.press('Tab');  
  await this.passwordField.fill(password);  
  await this.submitButton.click();
}
}
