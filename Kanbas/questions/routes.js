import * as dao from "./dao.js";

export default function QuestionRoutes(app) { 

     // create a new question
     const createQuestion = async (req, res) => {
        const question = await dao.createQuestion(req.body);
        res.json(question);
    };
    app.post("/api/questions", createQuestion);

    // delete an existing question
    const deleteQuestion = async (req, res) => {
        const status = await dao.deleteQuestion(req.params.questionId);
        res.json(status);
    };  
    app.delete("/api/questions/:questionId", deleteQuestion);

    // get a question by id 
    const findQuestionById = async (req, res) => {
        const question = await dao.findQuestionById(req.params.questionId);
        res.json(question);
    };    
    app.get("/api/questions/:questionId", findQuestionById);

    // get all questions for a given quiz
    const findAllQuizQuestions = async (req, res) => {
        const quizzes = await dao.findAllQuizQuestions(req.params.qid);
        res.json(quizzes);
    };    
    app.get("/api/quizzes/:qid/questions", findAllQuizQuestions);

    // update a question
    const updateQuestion = async (req, res) => {
        const { questionId } = req.params;
        const status = await dao.updateQuestion(questionId, req.body);
        res.json(status);
    };
    app.put("/api/questions/:questionId", updateQuestion);
}