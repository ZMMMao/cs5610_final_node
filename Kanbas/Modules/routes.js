import db from "../Database/index.js";
import * as dao from "./dao.js";

/*
function ModuleRoutes(app) {
    app.post("/api/courses/:cid/modules", (req, res) => {
      const { cid } = req.params;
      const newModule = {
        ...req.body,
        course: cid,
        _id: new Date().getTime().toString(),
      };
      db.modules.push(newModule);
      res.send(newModule);
    });
    app.get("/api/courses/:cid/modules", (req, res) => {
      const { cid } = req.params;
      const modules = db.modules.filter((m) => m.course === cid);
      res.send(modules);
    });
    app.delete("/api/modules/:mid", (req, res) => {
      const { mid } = req.params;
      db.modules = db.modules.filter((m) => m._id !== mid);
      res.sendStatus(200);
    });
    app.put("/api/modules/:mid", (req, res) => {
      const { mid } = req.params;
      const moduleIndex = db.modules.findIndex((m) => m._id === mid);
      db.modules[moduleIndex] = {
        ...db.modules[moduleIndex],
        ...req.body,
      };
      res.sendStatus(204);
    });
}
export default ModuleRoutes;
*/

export default function ModuleRoutes(app) {
  const findModulesByCourse = async (req, res) => {
    const { cid } = req.params;
    const modules = await dao.findModulesByCourse(cid);
    res.json(modules);
  };

  const createModule = async (req, res) => {
    const { cid } = req.params;
    const newModule = {
      ...req.body,
      course: cid,
    };
    const module = await dao.createModule(newModule);
    res.json(module);
  };

  const deleteModule = async (req, res) => {
    const { mid } = req.params;
    const status = await dao.deleteModule(mid);
    res.sendStatus(200);
  };

  const updateModule = async (req, res) => {
    const { mid } = req.params;
    const module = req.body;
    const status = await dao.updateModule(mid, module);
    res.sendStatus(204);
  };

  app.get("/api/courses/:cid/modules", findModulesByCourse);
  app.post("/api/courses/:cid/modules", createModule);
  app.delete("/api/modules/:mid", deleteModule);
  app.put("/api/modules/:mid", updateModule);
}
