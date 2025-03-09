import { readFilePromise, writeFilePromise } from "./fileManager.js";

export async function createTask(taskObj) {
  let newTaskObj = {}
  let currentTasks = await listTasks();
  if (currentTasks.length) {
    let lastTask = currentTasks.at(-1);
    newTaskObj = {...taskObj, id: lastTask.id + 1 }
    currentTasks.push(newTaskObj);
  } else {
    newTaskObj = {...taskObj, id: 1 }
    currentTasks.push(newTaskObj);
  }
  try {
    await writeFilePromise("./db.json", JSON.stringify(currentTasks));
    return { error: false, message: "task created successfully",taskCreated:newTaskObj};
  } catch (e) {
    return { error: true, message: e.message };
  }
}
export async function updateTask(taskUpdated) {}

export async function deleteTask(idTaskToDelete) {
  try {
    let idToDelete = Number(idTaskToDelete);
    let allTasks = await listTasks();
    let allTaskWithOutTheElement = allTasks.filter(
      (elem) => elem.id !== idToDelete
    );
    await writeFilePromise(
      "./db.json",
      JSON.stringify(allTaskWithOutTheElement)
    );
    return { error: false, message: "task delete successfully" };
  } catch (e) {
    return { error: true, message: e.message };
  }
}

export async function listTasks() {
  try {
    let dataStream = await readFilePromise("./db.json");

    if (!dataStream) {
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
