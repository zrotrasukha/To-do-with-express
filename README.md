# TODO APP WITH EXPRESS

This is a to do project with uses a json file to manage tasks, through it I am learning how express is used, so if you have any suggestions regarding the faults or increasing efficiency, do advice me , it will be appreciated!

## To use this, follow these steps:

1. Install npm with `npm i`
2. Install nodemon with `npm i nodemon`, it will help us watching changes in file, if made any.
3. Use any web server interaction tool, like httpie, curl or Postman! (You do not have to use it right away).
4. Initiate the `index.js` file with `nodemon index.js`.
5. Add suffix to the local host link, like `http://localhost:3000/`. The available suffix are these:

- `/post` ; Method: `POST` (posts new task, it requires a body which may look like this:

```json
  "task": "do work"
```

)

- `/getTask` ; Method: `GET` (Gives you all the task that are restored)
- `/update` ; Method: `PUT`

```json
"id": "< find the ID by get method >", 
"task": "<Text you want to overwrite>";
```

- `/delete` ; Method: `DELETE` (it also requires a body to delete, you may write the id of the task you want to delete and again you can know the id of your task with `/getTask`: 
```json
{
  "id": 1, 
}
```
)
- `/deleteAll`; Method: DELETE (It deletes all the data at once)
  > [!NOTE]
  > Now finally test using postman or httpie or curl.

---

> Hope it will help you run the program (I know it is not cool, but it surely is for me tho!)
> If you have any problem regarding running the code, do contact me, I will chatGPT it.
