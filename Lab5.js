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
    
};
  
export default Lab5;