import { readFilePromise, writeFilePromise } from "./fileManager.js";

export async function createTask(taskObj) {
  let currentTasks = await listTasks();
  if(currentTasks.length){
      let lastTask = currentTasks.at(-1)
      currentTasks.push({...taskObj,id: lastTask.id + 1});
  }
  else{
    currentTasks.push({...taskObj,id:1});
  }
  try {
    await writeFilePromise('./db.json',JSON.stringify(currentTasks));
    return { error: false, message: "task created successfully" };
  } catch (e) {
    return { error: true, message: e.message };
  }
}
export async function updateTask(taskUpdated) {
    
    
}

export function deleteTask() {}

export async function listTasks() {
  try {
    let dataStream = await readFilePromise('./db.json');

    if(!dataStream){
        return [];
    }

    let dataJson = JSON.parse(dataStream);
    if (!Array.isArray(dataJson)) {
      throw new Error("json tasks file is not array of task elements");
    }
    return dataJson;
  } catch (e) {
    console.log(e);
  }
}
