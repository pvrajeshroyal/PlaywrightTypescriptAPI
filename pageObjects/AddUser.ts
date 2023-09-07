import { Page, Locator } from '@playwright/test';

export default class AddUser {

    private adminTab: Locator;
    private addButton: Locator;
    private userRoleDropdown: Locator;
    private employeeNameInput: Locator;
    private statusDropdown: Locator;
    private userNameInput: Locator;
    private passwordInput: Locator;
    private confirmPasswordInput: Locator;
    private saveButton: Locator;
    private searchTextField: Locator;
    private searchButton: Locator;
    private editIcon: Locator;
    private editStatusDropdown: Locator;
    private disableDropdwonItem: Locator;
    private editSaveButton: Locator;
    private deleteIcon: Locator;
    private confirmDeleteUser: Locator;

    constructor(public page: Page) {

        this.adminTab = page.locator('//span[normalize-space()="Admin"]');
        this.addButton = page.locator('//button[normalize-space()="Add"]');
        this.userRoleDropdown = page.locator('(//div[@class="oxd-select-text-input"])[1]');
        this.employeeNameInput = page.locator('//label[normalize-space()="Employee Name"]//ancestor::div[@class="oxd-input-group oxd-input-field-bottom-space"]//input');
        this.statusDropdown = page.locator('//label[normalize-space()="Status"]//following::i');
        this.userNameInput = page.locator('//label[normalize-space()="Username"]//ancestor::div[@class="oxd-input-group oxd-input-field-bottom-space"]//input');
        this.passwordInput = page.locator('//label[normalize-space()="Password"]//ancestor::div[@class="oxd-input-group oxd-input-field-bottom-space"]//input');
        this.confirmPasswordInput = page.locator('//label[normalize-space()="Confirm Password"]//ancestor::div[@class="oxd-input-group oxd-input-field-bottom-space"]//input');
        this.saveButton = page.locator('//button[normalize-space()="Save"]');
        this.searchTextField = page.getByRole('textbox').nth(1);
        this.searchButton = page.getByRole('button', { name: 'Search' });
        this.editIcon = page.locator('.bi-pencil-fill');
        this.editStatusDropdown = page.locator('form i').nth(1);
        this.disableDropdwonItem = page.getByRole('option', { name: 'Disabled' });
        this.editSaveButton = page.getByRole('button', { name: 'Save' });
        this.deleteIcon = page.locator('.bi-trash');
        this.confirmDeleteUser = page.getByRole('button', { name: 'Yes, Delete' });
    }

    async navigateAdminTab(): Promise<void> {
        await this.adminTab.click();
    }

    async clickOnAddButton(): Promise<void> {
        await this.addButton.click();
    }

    async fillTheMandatoryFields(systemUserName,systemUserPassword): Promise<void> {
        await this.userRoleDropdown.click();
        await this.page.getByRole('option', { name: 'Admin' }).click();
        await this.employeeNameInput.type('Test');
        await this.page.waitForTimeout(3000);
        await this.page.keyboard.press('ArrowDown');
        await this.page.keyboard.press('Enter');
        await this.statusDropdown.click();
        await this.page.getByRole('option', { name: 'Enabled' }).click();
        await this.userNameInput.type(systemUserName);
        await this.passwordInput.type(systemUserPassword);
        await this.confirmPasswordInput.type(systemUserPassword);
    }

    async clickOnSaveButton(): Promise<void> {
        await this.saveButton.click();
        await this.page.waitForTimeout(3000);
    }

    async searchAddedUserName(systemUserName): Promise<void> {
        await this.searchTextField.click();
        await this.searchTextField.fill(systemUserName);
        await this.searchButton.click();
        await this.page.waitForTimeout(3000);
    }

    async editUser(): Promise<void> {
        await this.editIcon.click();
        await this.editStatusDropdown.click();
        await this.disableDropdwonItem.click();
        await this.editSaveButton.click();
        await this.page.waitForTimeout(3000);
    }

    async deleteUser(): Promise<void> {
        await this.deleteIcon.click();
        await this.confirmDeleteUser.click();
    }
}
