import * as dao from "./dao.js";

export default function QuizRoutes(app) {

    // create a new quiz
    const createQuiz = async (req, res) => {
        const quiz = await dao.createQuiz(req.body);
        res.json(quiz);
    };
    app.post("/api/quizzes", createQuiz);

    // delete an existing quiz
    const deleteQuiz = async (req, res) => {
        const status = await dao.deleteQuiz(req.params.quizId);
        res.json(status);
    };  
    app.delete("/api/quizzes/:quizId", deleteQuiz);

     // get a list of all quizzes
     const findAllQuizzes = async (req, res) => {
        const quizzes = await dao.findAllQuizzes();
        res.json(quizzes);
    };
    app.get("/api/quizzes", findAllQuizzes);

    // get a quiz by quizId 
    const findQuizById = async (req, res) => {
        const quiz = await dao.findQuizById(req.params.quizId);
        res.json(quiz);
    };    
    app.get("/api/quizzes/:quizId", findQuizById);

    // get a quiz by courseId 
    const findQuizzeByCourseId = async (req, res) => {
        const quizzes = await dao.findAllCourseQuizzes(req.params.cid);
        res.json(quizzes);
    };    
    app.get("/api/courses/:cid/quizzes", findQuizzeByCourseId);

    // update a quiz
    const updateQuiz = async (req, res) => {
        const { quizId } = req.params;
        const status = await dao.updateQuiz(quizId, req.body);
        res.json(status);
    };
    app.put("/api/quizzes/:quizId", updateQuiz);
};