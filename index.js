const { json } = require("body-parser");
const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const tasksFile = "./tasks.json";

// Middleware to parse JSON request body
app.use(express.json());

if (!fs.existsSync(tasksFile)) {
  fs.writeFileSync(tasksFile, "{}", "utf-8");
}

// The request body could be like:
// {
//    "task": "Play guitar",
// }
app.post("/post", (req, res) => {
  fs.readFile(tasksFile, "utf-8", (err, data) => {
    if (err) {
      console.log(`Error reading files: ${err}`);
      return res.status(500).send("Error reading file");
    }

    const content = JSON.parse(data || "{}");
    let id = Object.keys(content).length + 1;
    const task = req.body.task;
    content[id] = task;

    fs.writeFile(
      tasksFile,
      JSON.stringify(content, null, 2),
      "utf-8",
      (err) => {
        if (err) {
          console.log(`Error writing files: ${err}`);
          return res.status(500).send("Something unexpected happened");
        }
        res.status(201).send({ id, task });
      },
    );
  });
});
app.put("/update", (req, res) => {
  const taskId = req.body.id;
  const task = req.body.task;
  fs.readFile(tasksFile, "utf-8", (err, data) => {
    if (err) {
      console.log(`Error reading file ${err}`);
      return res.status(500).send("Error reading files");
    }
    const content = JSON.parse(data || "{}");
    if (!content[taskId]) {
      console.log(`Task not found`);
      return res.status(404).send("Task not found");
    }

    content[taskId] = task;
    fs.writeFile(
      tasksFile,
      JSON.stringify(content, null, 2),
      "utf-8",
      (err) => {
        if (err) {
          console.log(`Error reading file: ${err}`);
          res.status(500).send("Error reading files");
        }
        res.status(201).send("Task updation successful");
      },
    );
  });
});

app.get("/gettasks", (req, res) => {
  fs.readFile(tasksFile, "utf-8", (err, data) => {
    if (err) {
      console.log(`error reading files ${err}`);
      return res.status(500).send("Error reading files");
    }
    const content = JSON.parse(data || "{}");
    console.log("Tasks List:");
    
    let count = 1; 
    Object.keys(content).forEach(( key  )=>{
      console.log(`${count}. Task Id: ${key}, Task: ${content[key]},`); 
      count++; 
    })
    res.status(200).send("Task is being displayed on console, check out!");
  });
});

app.delete("/deleteTask", (req, res) => {
  fs.readFile(tasksFile, "utf8", (err, data) => {
    if (err) {
      console.log(`error reading files: ${err}`);
      return res.status(500).send("Error reading files ", err);
    }

    const content = JSON.parse(data || "{}");
    const taskId = req.body.id;
    if (!content[taskId]) {
      return res.status(404).send("task not found");
    }

    delete content[taskId];

    fs.writeFile(
      tasksFile,
      JSON.stringify(content, null, 2),
      "utf-8",
      (err) => {
        if (err) {
          console.log(`Error writing file ${err}`);
          return res.status(500).send("Error writing the file");
        }

        console.log("task deleted");
        res.status(204).send("File was deleted");
      },
    );
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
