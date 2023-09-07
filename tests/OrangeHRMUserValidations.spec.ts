import {test,expect,Page}from "@playwright/test";
import data from "../testData/data.json";
import Login from "../pageObjects/Login";
import AddUser from "../pageObjects/AddUser";

test.describe("OrangeHRM Application",() => {   
    let page: Page;
    test.beforeAll(async ({browser}) =>{
        page = await browser.newPage()
        const login = new Login(page)
        await page.goto(data.baseUrl+'/auth/login')
        const title = await page.title()
        expect(title).toBe('OrangeHRM')    
        await login.signIn(data.userName,data.password)
        await expect(page).toHaveURL(data.baseUrl+'/dashboard/index', { timeout: 5000 })
    })
    
    test('Add User', async() =>{ 
    
        //Add User
        const addUser = new AddUser(page)
        await addUser.navigateAdminTab()
        await addUser.clickOnAddButton()
        await addUser.fillTheMandatoryFields(data.systemUserName,data.systemUserPassword)
        await page.waitForSelector('button[type="submit"]')
        await addUser.clickOnSaveButton()
        const successMessage = page.locator('p:has-text("Success")').first().isVisible()
        expect(successMessage).toBeTruthy()
    
        //Edit User
        await addUser.searchAddedUserName(data.systemUserName)
        await addUser.editUser()
        const updatedMessage = page.locator('p:has-text("Success")').first().isVisible()
        expect(updatedMessage).toBeTruthy()    
        await page.waitForTimeout(3000)
    
        //Delete User
        await addUser.searchAddedUserName(data.systemUserName)
        await addUser.deleteUser()
        const deleteMessage = page.locator('hasText:No Records Found').isVisible()
        expect(deleteMessage).toBeTruthy()    
    })
});