const Lab5 = (app) => {

    // 3.1 - Sending data to server
    app.get("/a5/welcome", (req, res) => {
      res.send("Welcome to Assignment 5");
    });

    // 3.1.1 - Path Parameters 
    app.get("/a5/add/:a/:b", (req, res) => {
        const { a, b } = req.params;
        const sum = parseInt(a) + parseInt(b);
        res.send(sum.toString());
    });
    app.get("/a5/subtract/:a/:b", (req, res) => {
        const { a, b } = req.params;
        const sum = parseInt(a) - parseInt(b);
        res.send(sum.toString());
    });
    
    // 3.1.2&3 - Query Parameters 
    // e.g., a5/calculator?a=5&b=2&operation=add
    app.get("/a5/calculator", (req, res) => {

        // retrieve a, b, and operation parameters in query
        const { a, b, operation } = req.query;
        let result = 0;

        switch (operation) {
          case "add":
            result = parseInt(a) + parseInt(b);
            break;
          case "subtract":
            result = parseInt(a) - parseInt(b);
            break;
          case "multiply":
            result = parseInt(a) * parseInt(b);
            break;
          case "divide":
            result = parseInt(a) / parseInt(b);
            break;
          default:
            result = "Invalid operation";
        }

        // convert to string otherwise browser interprets
        // as a status code
        res.send(result.toString());
    });

    // 3.2.1 - Objects
    const assignment = {
        id: 1, 
        title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-10-10", 
        completed: false, 
        score: 0,
    };

    app.get("/a5/assignment", (req, res) => {
        res.json(assignment);
    });

    // 3.2.2 - Object Properties
    app.get("/a5/assignment/title", (req, res) => {
        res.json(assignment.title);
    });
    
    // 3.2.3 Modifying Objects
    app.get("/a5/assignment/title/:newTitle", (req, res) => {
        const { newTitle } = req.params;
        assignment.title = newTitle;
        res.json(assignment);
    });

    // 3.2.4 - Module Object 
    const module = {
        id: 0,
        name: "My First Object",
        description: "Create an object with NodeJS",
        course: "CS5610"
    } 
    
    app.get("/a5/module", (req, res) => {
        res.json(module);
    });

    app.get("/a5/module/name", (req, res) => {
        res.json(module.name);
    });

    app.get("/a5/module/name/:newName", (req, res) => {
        const { newName } = req.params;
        module.name = newName;
        res.json(module);
    });
    
    // 3.3.1 - Retrieving Arrays
    const todos = [
        { id: 1, title: "Task 1", completed: false },
        { id: 2, title: "Task 2", completed: true },
        { id: 3, title: "Task 3", completed: false },
        { id: 4, title: "Task 4", completed: true },
    ];
    
    app.get("/a5/todos", (req, res) => {

        // 3.3.3 - Filtering array items using a query string
        const { completed } = req.query;

        if (completed !== undefined) {
          const completedBool = completed === "true";
          const completedTodos = todos.filter(
            (t) => t.completed === completedBool);
          res.json(completedTodos);
          return;
        }

        res.json(todos);
    });

    // 3.3.4 - Creating new Items in an Array 
    // must be implemented before /:id route (3.2.2) otherwise
    // the :id path parameter would interoret the create as an ID
    app.get("/a5/todos/create", (req, res) => {
        const newTodo = {
          id: new Date().getTime(),
          title: "New Task",
          completed: false,
        };
        todos.push(newTodo);
        res.json(todos);
      });    
    
    // 3.3.2 - Retrieving an Item from an Array by ID
    app.get("/a5/todos/:id", (req, res) => {
        const { id } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        res.json(todo);
    });

    // 3.3.5 - Deleting an Item from an Array
    app.get("/a5/todos/:id/delete", (req, res) => {
        const { id } = req.params;

        // create a copy of the object to delete by matching the ID
        const todo = todos.find((t) => t.id === parseInt(id));

        // use indexOf to find the todo's index in the list 
        const todoIndex = todos.indexOf(todo);

        // splice to remove todo at todoIndex; remove only 1 item
        if (todoIndex !== -1) {
          todos.splice(todoIndex, 1);
        }

        // return the todos list
        res.json(todos);
    });
    
    // 3.3.6 - Updating at item in an array
    app.get("/a5/todos/:id/title/:title", (req, res) => {
        const { id, title } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        todo.title = title;
        res.json(todos);
    });

    // 3.3.7a - Mark an item completed
    app.get("/a5/todos/:id/completed/:completed", (req, res) => {
        const { id, completed } = req.params;

        // create a copy of the object to delete by matching the ID
        const todo = todos.find((t) => t.id === parseInt(id));

        // Convert the string parameter to a boolean value
        const isCompleted = completed === "true"; 

        // Update the completed flag with the boolean value
        todo.completed = isCompleted;


        // return the todos list
        res.json(todos);
    });
    
    // 3.3.7b - Update the description
    app.get("/a5/todos/:id/description/:description", (req, res) => {
        const { id, description } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        todo.description = description;
        res.json(todos);
    });

    // 3.5.1 - Posting data in an HTTP Body
    app.post("/a5/todos", (req, res) => {
        const newTodo = {
          ...req.body,
          id: new Date().getTime(),
        };
        todos.push(newTodo);
        res.json(newTodo);
    });
    
    // 3.5.2 - Deleting data
    app.delete("/a5/todos/:id", (req, res) => {
        const { id } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        if (!todo) {
            res.status(404)
              .json({ message: `Unable to delete Todo with ID ${id}` });
            return;
        }      
        todos.splice(todos.indexOf(todo), 1);
        res.sendStatus(200);
    });

    // 3.5.3 Updating todo
    app.put("/a5/todos/:id", (req, res) => {
        const { id } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        if (!todo) {
            res.status(404)
              .json({ message: `Unable to update Todo with ID ${id}` });
            return;
        }      
        todo.title = req.body.title;
        todo.description = req.body.description;
        todo.due = req.body.due;
        todo.completed = req.body.completed;
        res.sendStatus(200);
    });
    
};
  
export default Lab5;