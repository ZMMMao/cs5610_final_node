import * as dao from "./dao.js";

export default function QuizRoutes(app) {

  const findQuizzesByCourse = async (req, res) => {
    const { cid } = req.params;
    const quizzes = await dao.findQuizzesByCourse(cid);
    console.log(quizzes);
    res.json(quizzes);
  };

  const findQuizById = async (req, res) => {
    const { aid } = req.params;
    const quiz = await dao.findQuizById(aid);
    if (!quiz) {
      return res.status(404).send('Quiz not found');
    }
    res.json(quiz);
  };

  const createQuiz = async (req, res) => {
    const { cid } = req.params;
    const newQuiz = {
      ...req.body,
      course: cid,
    };
    const quiz = await dao.createQuiz(newQuiz);
    res.json(quiz);
  };

  const deleteQuiz = async (req, res) => {
    const { aid } = req.params;
    const status = await dao.deleteQuiz(aid);
    res.sendStatus(200);
  };

  const updateQuiz = async (req, res) => {
    const { aid } = req.params;
    const quiz = req.body;
    const status = await dao.updateQuiz(aid, quiz);
    res.sendStatus(204);
  };

  app.get("/api/courses/:cid/quizzes", findQuizzesByCourse);
  app.post("/api/courses/:cid/quizzes", createQuiz);
  app.get("/api/quizzes/:aid", findQuizById);
  app.delete("/api/quizzes/:aid", deleteQuiz);
  app.put("/api/quizzes/:aid", updateQuiz);
}

