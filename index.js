// const readLine = require("node:readline");
import readLine from 'node:readline';

import {stdin as input, stdout as output } from 'node:process';

import { error  } from 'node:console';

import {createTask,deleteTask,listTasks,updateTask} from './tasks.js'

const settingsApp = {
  title: "          task managment             ",
};

function getPromiseReadline(someText) {
  let promise = new Promise((response, reject) => {
    const rl = readLine.createInterface({ input, output });
    rl.question(someText, (answer) => {
      response(answer);
      rl.close();
    });
  });

  return promise;
}

function printMenuToConsole() {
  console.log(settingsApp.title);
  console.log("-------------------------------------\n");
  console.log("1.- create update delete task");
  console.log("2.-Mark a task as is in progress or done");
  console.log("3.-List all tasks that are not done");
  console.log("4.-List all tasks that are in progress");
}

async function main() {
  printMenuToConsole();
  let option = await getPromiseReadline("elige una opcion:");
  if(option === '1'){
    let crudOption = await getPromiseReadline("elige la opcion create(1),delete(2),update(3)")
    
    if(crudOption === '1'){
        console.log("creamos la tarea")
        console.log("necesitamos algunos datos de la tarea") // name , descripcion , finished : false
        let title = await getPromiseReadline("escriba el titulo de la tarea");
        let description = await getPromiseReadline("escriba la descripcion de la tarea");
        let finished = false;
        let objectTask = {
          title,
          description,
          finished
        }
        let {error,message} = await createTask(objectTask);
        if(!error){
          return console.log(message+" 🚀")
        }
        return "ops something error has ocurred"


    }
    if(crudOption === '2'){
        console.log("borramos la tarea")
        let idTaskToDelete = await getPromiseReadline("digite el id de la tarea");
        let response = await deleteTask(idTaskToDelete);
        console.log(response)
    }
    if(crudOption === '3'){
        let idTaskToUpdate = await getPromiseReadline("digite el id de la tarea");
        console.log("buscando la tarea si existe\n");
        console.log("rellene los nuevos campos de la tarea dejar en blanco si no desea modificar \n")
        let titleResponse = await getPromiseReadline("title: ");
        let descriptionResponse = await getPromiseReadline("description: ")
        let finishedResponse =  await getPromiseReadline("finished (y/n): ")

        let newkeysForUpdated = {
          ...(titleResponse && {title : titleResponse}),
          ...(descriptionResponse && {description: descriptionResponse}),
          ...(finishedResponse && {finished: finishedResponse === 'y'? true:false}) 
        }

        let updateResponse = await updateTask(idTaskToUpdate,newkeysForUpdated);
        console.log("tarea updateada",updateResponse)

    }
  }
  else{
    console.log("funcion no implementada")
  }
}

main();
