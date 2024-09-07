import express, { json } from 'express';
import fs, { existsSync } from 'fs'; 
const taskFile = 'task.json'; 
const app = express(); 

if(!existsSync(taskFile)) { 
  fs.writeFileSync(taskFile, '[]', "utf-8")
}


app.post('/' , (req, res) => { 
  const tasks = JSON.parse(fs.readFileSync(taskFile, "utf-8")); 

) 
})
