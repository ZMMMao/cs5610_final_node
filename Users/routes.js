import * as dao from "./dao.js";

// Declare a global variable to serve as a global reference to the 
// currently authenticated user. Storing the currentUser in globalCurrentuser 
// allows other route handlers (e.g., profile) to access the authenticated user 
// without relying solely on the session object.
let globalCurrentuser;

export default function UserRoutes(app) {
  const createUser = async (req, res) => {
    const user = await dao.createUser(req.body);
    res.json(user);
  };

  const deleteUser = async (req, res) => {
    const status = await dao.deleteUser(req.params.userId);
    res.json(status);
  };

  const findAllUsers = async (req, res) => {
    const { role } = req.query;
    if (role) {
      const users = await dao.findUsersByRole(role);
      console.log(users);
      res.json(users);
      return;
    }
    const users = await dao.findAllUsers();
    res.json(users);
    return;
  };

  const findUserById = async (req, res) => {
    const user = await dao.findUserById(req.params.userId);
    res.json(user);
  };

  const updateUser = async (req, res) => {
    const { userId } = req.params;
    const status = await dao.updateUser(userId, req.body);
    
    // If currentUser is not declared with const (or let, or var)
    // inside the function, it becomes a global variable. It will
    // overwrite the defined globalCurrentuser variable. And any
    // subsequent usage of currentUser in this function or anywhere
    // else in this codebase will use this global variable.

    // By using const currentUser, we ensure that currentUser is scoped 
    // to the updateUser function and won't affect other parts of the 
    // codebase unintentionally. It's a good practice to always use const 
    // or let to declare variables to avoid unexpected side effects and 
    // maintain code clarity and predictability.
    const currentUser = await dao.findUserById(userId);
    res.json(status);
  };

  const signup = async (req, res) => {
    const user = await dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json({ message: "Username already taken" });
    } else {
      const currentUser = await dao.createUser(req.body);
      req.session["currentUser"] = currentUser;
      globalCurrentuser = currentUser;
      res.json(currentUser);
    }
  };

  const signin = async (req, res) => {
    const { username, password } = req.body;
    const currentUser = await dao.findUserByCredentials(username, password);
    if (currentUser) {
      req.session["currentUser"] = currentUser;
      console.log(currentUser);
      globalCurrentuser = currentUser;
      res.json(currentUser);
    } else {
      res.sendStatus(401);
    }
  };

  const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  const profile = async (req, res) => {
    let currentUser = req.session["currentUser"];
    currentUser = globalCurrentuser;
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    res.json(currentUser);
  };
  
  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);
}
