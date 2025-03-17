import { readFilePromise, writeFilePromise } from "../fileManager.js";
import { deleteTask,createTask, updateTask ,newCreateTask} from "../tasks.js";



test("read file", async () => {
  let dbTest = "./db.test.json";
  let dataToWrite = "any word1";
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
});

test("write task",async ()=>{
    let newTask = {
        title: "test",
        description: "just a test",
        finished: false
    }
    let createResponse = await createTask(newTask);
    let {taskCreated} = createResponse

    newTask = {...newTask,id:taskCreated.id}

    expect(createResponse).toEqual({ error: false, message: "task created successfully",taskCreated:newTask})
})

test("delete task", async ()=>{
    let testTask = {
        title: 'test',
        description: 'just a test',
        finished: false
    }
   let createResponse = await createTask(testTask)// debe devolverme el ibjeto o el id eliminado
   let {error,message,taskCreated} = createResponse;

    let flagOject ={...testTask , id : taskCreated.id } 
    expect(createResponse).toEqual({ error: error, message: message ,taskCreated:flagOject});

    let deleteResponse = await deleteTask(testTask.id)
    expect(deleteResponse).toEqual({ error: false, message: "task delete successfully"})
});

test("update task", async ()=> {
    let tTForCreate = {
        title: "test",
        description: "just a test",
        finished: false
    }

    let tTForUpdate = {
        title:"test updated",
        description: "just a test updated",
        finished: true
    }

    let tTcreated = await newCreateTask(tTForCreate)
    let {id:idCreated,...restTaskCreated} = tTcreated;
    expect(tTForCreate).toEqual(restTaskCreated);

    let tTupdated = await updateTask(idCreated,tTForUpdate);
    let {id:idUpdated,...restTaskUpdated} = tTupdated;
    expect(tTForUpdate).toEqual(restTaskUpdated);
    
})

