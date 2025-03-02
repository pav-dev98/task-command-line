import fs from 'node:fs';
export function readFilePromise(){
  return  new Promise((response,reject)=>{
    fs.readFile('./db.json','utf8',(err,data)=>{
      if(err){
        return reject(err)
      }
      return response(data)
  })
  })
}


export function writeFilePromise(message){
  return new Promise((response,reject)=>{
    fs.writeFile('./db.json',message,(err)=>{
      if(err){
        return reject(err)
      }
      response({message : "succesfully write"});
    })
  })
}