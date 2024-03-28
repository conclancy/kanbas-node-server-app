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
    
};
  
export default Lab5;