import {test,expect} from "@playwright/test";
let id = 1;
let invalidId = 9999;
const createData = { "id": id, "name": "Siju", "category": { "id": id, "name": "PetDog" }, "status": "available" }
const updateData = { "id": id, "name": "SijuSold", "category": { "id": id, "name": "PetDog" }, "status": "sold" }

test.describe('Pet Store API Validation', ()=>{

    test("Post: Add new pet to store", async ({request}) => {
       const addPetResponse = await request.post('pet', { data: createData })
       console.log(addPetResponse.status())
       expect(addPetResponse.status()).toEqual(200)
       expect(addPetResponse.ok()).toBeTruthy()            
    })
    
    test("Get: Pet details for valid id", async ({request}) => {
        const getPetDetailsResponse = await request.get('pet/'+id)
        console.log(getPetDetailsResponse.status())
        expect(getPetDetailsResponse.ok()).toBeTruthy()          
    })
    
    test("Update: Pet details", async ({request}) => {
        const updatePetResponse = await request.put('pet', { data: updateData, headers: { "Content-Type": "application/json" }})
        console.log(updatePetResponse.status())
        expect(updatePetResponse.ok()).toBeTruthy()          
    })
    
    test("Get: Pet details after update", async ({request}) => {
        const getPetDetailsResponse = await request.get('pet/'+id)
        console.log(await getPetDetailsResponse.text())        
    })
    
    test("Get: Pet details for invalid id", async ({request}) => {
        const getPetDetailsResponse = await request.get('pet/'+invalidId)
        console.log(getPetDetailsResponse.status())
        expect(getPetDetailsResponse.status()).toBe(404)     
    })
    
    test("Delete: Pet details", async ({request}) => {
        const deletePetResponse = await request.delete('pet/'+id)
        console.log(deletePetResponse.status())
        expect(deletePetResponse.ok()).toBeTruthy()          
    })
    
    test("Get: Pet details after delete", async ({request}) => {
        const getPetDetailsResponse = await request.get('pet/'+id)
        console.log(getPetDetailsResponse.status())
        expect(getPetDetailsResponse.status()).toBe(404)     
    })
})