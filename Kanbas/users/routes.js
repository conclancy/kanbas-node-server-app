import * as dao from "./dao.js";

export default function UserRoutes(app) {
  
    // create a new user
    const createUser = async (req, res) => {
        const user = await dao.createUser(req.body);
        res.json(user);
    };
    app.post("/api/users", createUser);
    
    // delete an existing user
    const deleteUser = async (req, res) => {
        const status = await dao.deleteUser(req.params.userId);
        res.json(status);
    };  
    app.delete("/api/users/:userId", deleteUser);
  
    // get a list of all users
    const findAllUsers = async (req, res) => {

        // if there is a role passted, use as a filter
        const { role } = req.query;
        if (role) {
          const users = await dao.findUsersByRole(role);
          res.json(users);
          return;
        } else {
            const users = await dao.findAllUsers();
            res.json(users);
        }
    };
    app.get("/api/users", findAllUsers);

    // get a user by userId 
    const findUserById = async (req, res) => {
        const user = await dao.findUserById(req.params.userId);
        res.json(user);
    };    
    app.get("/api/users/:userId", findUserById);
  
    // update a user information
    const updateUser = async (req, res) => {
        const { userId } = req.params;
        const status = await dao.updateUser(userId, req.body);
        const currentUser = await dao.findUserById(userId);
        res.json(status);
    };
    app.put("/api/users/:userId", updateUser);

    // implement user sign up functionality
    const signup = async (req, res) => {
        const user = await dao.findUserByUsername(req.body.username);
        if (user) {
            res.status(400).json({ message: "Username already taken" });
        } else {
            const currentUser = await dao.createUser(req.body);
            req.session["currentUser"] = currentUser;
            res.json(currentUser);
        }
        
    };
    app.post("/api/users/signup", signup);

    // sign a user into the application
    const signin = async (req, res) => {
        console.log("------> signin requestBody:", req.body)
        const { username, password } = req.body;
        const currentUser = await dao.findUserByCredentials(username, password);
        console.log("------> signin currentUser:", currentUser)
        if (currentUser) {
            req.session["currentUser"] = currentUser;
            res.json(currentUser);
        } else {
            res.sendStatus(401).json({ message: "Invalid username or password" });
        }
    };
    app.post("/api/users/signin", signin);

    // sign current user out 
    const signout = (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    };
    app.post("/api/users/signout", signout);
    

    // route to logged-in user's profile
    const profile = async (req, res) => {
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
            res.sendStatus(401).json({ message: "Invalid username or password" });
        } else {
            res.json(currentUser);
        }
    };
    app.post("/api/users/profile", profile);

     // route to logged-in user's profile
     const getProfile = async (req, res) => {
        const currentUser = req.session["currentUser"];
        console.log(currentUser)
        if (!currentUser) {
            res.sendStatus(401).json({ message: "Invalid username or password" });
        } else {
            res.json(currentUser);
        }
    };
    app.get("/api/users/profile", getProfile);
}
