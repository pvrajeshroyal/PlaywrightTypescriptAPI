import {test,expect} from "@playwright/test";
let userName = "testUser";
let invalidUserName = "test123";
const createUserData = { "id": 1, "username": userName, "firstName": "firstNameTest", "lastName": "lastNameTest", "email": "test@example.com", "password": "password123", "phone": "1234567890", "userStatus": 0 }
const updateUserData = { "id": 1, "username": userName, "firstName": "testFirst", "lastName": "testLast", "email": "test@example.com", "password": "password1234", "phone": "1234567890", "userStatus": 1 }

test.describe('Store User API Validation', ()=>{
test("Post: Create new user", async ({request}) => {
    const response = await request.post('user', { data: createUserData})
   console.log(response.status())
   expect(response.ok()).toBeTruthy()            
})

test("Get: User details for valid username", async ({request}) => {
    const response = await request.get('user/'+userName)
    console.log(response.status())
    expect(response.ok()).toBeTruthy()          
})

test("Update: User details", async ({request}) => {
    const response = await request.put('user/'+userName,{ data: updateUserData, headers:{ "Content-Type": "application/json" }})
    console.log(response.status())
    expect(response.ok()).toBeTruthy()          
})

test("Get: User details after update", async ({request}) => {
    const response = await request.get('user/'+userName)
    console.log(await response.text())        
})

test("Get: User details with invalid username", async ({request}) => {
    const response = await request.get('user/'+invalidUserName)
    console.log(response.status())
    expect(response.status()).toBe(404)     
})

test("Delete: User details", async ({request}) => {
    const response = await request.delete('user/'+userName)
    console.log(response.status())
    expect(response.ok()).toBeTruthy()          
})

test("Get: User details after delete", async ({request}) => {
    const response = await request.get('user/'+userName)
    console.log(response.status())
    expect(response.status()).toBe(404)     
})
})