import * as dao from "./dao.js";

export default function CourseRoutes(app) {
  const createCourse = async (req, res) => {
    const course = await dao.findCourseByNumber(req.body.number);
    if (course) {
      res.status(400).json({ message: "Course number already taken" });
    } else {
      const newCourse = await dao.createCourse(req.body);
      res.json(newCourse);
    }
  };

  const findAllCourses = async (req, res) => {
    const courses = await dao.findAllCourses();
    console.log(courses);
    res.json(courses);
  };

  const findCourseById = async (req, res) => {
    const { cid } = req.params;
    try {
      const course = await dao.findCourseById(cid);
      if (!course) {
        res.status(404).send("Course not found");
        return;
      }
      res.json(course);
    } catch (error) {
      console.error("Error fetching course by ID:", error);
      res.status(500).send("Server error");
    }
  };

  const updateCourse = async (req, res) => {
    const { cid } = req.params;
    const course = req.body;
    try {
      await dao.updateCourse(cid, course);
      res.sendStatus(204);
    } catch (error) {
      console.error("Error updating course:", error);
      res.status(500).send("Server error");
    }
  };

  const deleteCourse = async (req, res) => {
    const { cid } = req.params;
    try {
      await dao.deleteCourse(cid);
      res.sendStatus(204);
    } catch (error) {
      console.error("Error deleting course:", error);
      res.status(500).send("Server error");
    }
  };

  app.post("/api/courses", createCourse);
  app.get("/api/courses", findAllCourses);
  app.get("/api/courses/:cid", findCourseById);
  app.put("/api/courses/:cid", updateCourse);
  app.delete("/api/courses/:cid", deleteCourse);
}
