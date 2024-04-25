import Database from "../Database/index.js";
import * as dao from "./dao.js";

/*
export default function CourseRoutes(app) {
    app.get("/api/courses/:id", (req, res) => {
      const { id } = req.params;
      const course = Database.courses.find((c) => c._id === id);
      if (!course) {
        res.status(404).send("Course not found");
        return;
      }
      res.send(course);
    });
    app.put("/api/courses/:id", (req, res) => {
      const { id } = req.params;
      const course = req.body;
      Database.courses = Database.courses.map((c) =>
        c._id === id ? { ...c, ...course } : c
      );
      res.sendStatus(204);
    });
    app.delete("/api/courses/:id", (req, res) => {
      const { id } = req.params;
      Database.courses = Database.courses.filter((c) => c._id !== id);
      res.sendStatus(204);
    });
    app.post("/api/courses", (req, res) => {
        const course = { ...req.body, _id: new Date().getTime().toString() };
        Database.courses.push(course);
        res.send(course);
    });
    app.get("/api/courses", (req, res) => {
        const courses = Database.courses;
        res.send(courses);
    });
}
*/

export default function CourseRoutes(app) {
  const createCourse = async (req, res) => {
    const course = await dao.findCourseByNumber(req.body.number);
    if (course) {
      res.status(400).json({ message: "Course number already taken" });
    } else {
      const newCourse = await dao.createCourse(req.body);
      res.json(newCourse);
    }
  }

  const findAllCourses = async (req, res) => {
    const courses = await dao.findAllCourses();
    console.log(courses);
    res.json(courses);
  }

  const findCourseById = async (req, res) => {
    const { cid } = req.params;
    const course = await dao.findCourseById(cid);
    if (!course) {
      res.status(404).send("Course not found");
      return;
    }
    res.json(course);
  }

  const updateCourse = async (req, res) => {
    const { cid } = req.params;
    const course = req.body;
    const status = await dao.updateCourse(cid, course);
    res.sendStatus(204);
  }

  const deleteCourse = async (req, res) => {
    const { cid } = req.params;
    const status = await dao.deleteCourse(cid);
    res.sendStatus(204);
  }

  app.post("/api/courses", createCourse);
  app.get("/api/courses", findAllCourses);
  app.get("/api/courses/:cid", findCourseById);
  app.put("/api/courses/:cid", updateCourse);
  app.delete("/api/courses/:cid", deleteCourse);
}
