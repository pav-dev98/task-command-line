import path from 'path';
import { readFilePromise, writeFilePromise , ensureFileExist} from "./fileManager.js";
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);
const db_path = path.join(__dirname, 'db.json');

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
    await writeFilePromise(db_path, JSON.stringify(currentTasks));
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
      db_path,
      JSON.stringify(allTaskWithOutTheElement)
    );
    return { error: false, message: "task delete successfully" };
  } catch (e) {
    return { error: true, message: e.message };
  }
}

export async function listTasks() {
    try{
      await ensureFileExist(db_path)
      let dataStream = await readFilePromise(db_path);
      if (!dataStream) {
        console.log('la bd esta vacia');
        return [];
      }
  
      let dataJson = JSON.parse(dataStream);
      if (!Array.isArray(dataJson)) {
        throw new Error("json tasks file is not array of task elements");
      }
      return dataJson;

    }catch(err){
      console.log('error al leer',err);
    }

}
