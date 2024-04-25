import model from "./model.js";

export const createUser = (user) => {
  // remove _id field just in case client sends it
  // database will create _id for us instead
  delete user._id;
  // The Mongoose create method doesn't return the newly created document directly. 
  // Instead, it returns a Promise that resolves with the created document. 
  // Therefore, we need to add a return keyword to return this Promise,
  // so that we can access the created user in the route handler and send it back as a response.
  return model.create(user);
};

export const findAllUsers = () => model.find();

export const findUserById = (userId) => model.findById(userId);

export const findUserByUsername = (username) =>
  model.findOne({ username: username });

export const findUserByCredentials = (username, password) =>
  model.findOne({ username, password });

export const updateUser = (userId, user) =>
  model.updateOne({ _id: userId }, { $set: user });

export const deleteUser = (userId) => model.deleteOne({ _id: userId });

export const findUsersByRole = (role) => model.find({ role: role });
