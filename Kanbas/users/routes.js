import * as dao from "./dao.js";

let currentUser = null;

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
        }

        const users = await dao.findAllUsers();
        res.json(users);
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
        currentUser = await dao.findUserById(userId);
        res.json(status);
    };
    app.put("/api/users/:userId", updateUser);

    //
    const signup = async (req, res) => { };
    app.post("/api/users/signup", signup);

    // sign a user into the application
    const signin = async (req, res) => {
        const { username, password } = req.body;
        currentUser = await dao.findUserByCredentials(username, password);
        res.json(currentUser);
    };
    app.post("/api/users/signin", signin);

    //
    const signout = (req, res) => { };
    app.post("/api/users/signout", signout);

    // route to logged-in user's profile
    const profile = async (req, res) => {
        res.json(currentUser);
    };
    app.post("/api/users/profile", profile);
}
