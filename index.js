const readLine = require("node:readline");
const fs = require('node:fs');
const { stdin: input, stdout: output } = require("node:process");
const { error } = require("node:console");
// const rl = readLine.createInterface({input,output});

// // crear un aplicacion de linea de commandos
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

function readFilePromise(){
  return  new Promise((response,reject)=>{
    fs.readFile('./db.json','utf8',(err,data)=>{
      if(err){
        return reject(err)
      }
      return response(data)
  })
  })
}

function writeFilePromise(message){
  return new Promise((response,reject)=>{
    fs.writeFile('./db.json',message,(err)=>{
      if(err){
        return reject(err)
      }
      response({message : "succesfully write"});
    })
  })
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
        let id = 1
        let object = {
          title,
          description,
          finished,
          id
        }
        let currentInfoDataStream = await readFilePromise();
        let currentDataJson = JSON.parse(currentInfoDataStream);
        currentDataJson.push(object);
        let response = await writeFilePromise(JSON.stringify(currentDataJson));
        console.log(response.message)

        let dataStream = await readFilePromise();
        let jsonData = JSON.parse(dataStream);
        console.log("json data", jsonData)
        // aqui guardamos la tarea en un archivo json.
    }
    if(crudOption === '2'){
        console.log("borramos la tarea")
        let idTaskToDelete = await getPromiseReadline("digite el id de la tarea");
        console.log("eliminando la tarea");
    }
    if(crudOption === '3'){
        let idTaskToUpdate = await getPromiseReadline("digite el id de la tarea");
        console.log("updateando la tarea");
    }
  }
  else{
    console.log("funcion no implementada")
  }
}

main();
