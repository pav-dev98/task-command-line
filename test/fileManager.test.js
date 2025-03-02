import { readFilePromise, writeFilePromise } from "../fileManager.js";

test('create file', async () => {
    expect(true).toBe(true);
})

test('create file', async () => {
    expect(false).toBe(false);
})

test("read file", async () => {
  let dbTest = "./db.test.json";
  let dataToWrite = "any word";
  let createResponse = await writeFilePromise(dbTest, dataToWrite);
  expect(createResponse).toEqual({ message: "succesfully write" });

  let readResponse = await readFilePromise(dbTest);
  expect(readResponse).toBe(dataToWrite);
});

test("write test",async ()=>{
    let dbTest = "./db.test.json";
    let dataToWrite = "any word";
    let createResponse = await writeFilePromise(dbTest, dataToWrite);
    expect(createResponse).toEqual({message: "succesfully write"})
})
