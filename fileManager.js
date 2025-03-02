import fs from 'node:fs';
export function readFilePromise(file){
  return  new Promise((response,reject)=>{
    fs.readFile(file,'utf8',(err,data)=>{
      if(err){
        return reject(err)
      }
      return response(data)
  })
  })
}


export function writeFilePromise(file,message){
  return new Promise((response,reject)=>{
    fs.writeFile(file,message,(err)=>{
      if(err){
        return reject(err)
      }
      response({message : "succesfully write"});
    })
  })
}