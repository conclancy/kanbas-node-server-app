import model from "./model.js";

// create a new quiz
export const createQuiz = (quiz) => model.create(quiz);

// find all quizes
export const findAllQuizzes = () => model.find();

// find all quizes by course 
export const findAllCourseQuizzes = (courseId) => model.find({courseId: courseId});

// find quiz by id 
export const findQuizById = (quizId) => model.findById(quizId);

// update a quiz
export const updateQuiz = (quizId, quiz) =>  model.updateOne({ _id: quizId }, { $set: quiz });

// delete a quiz
export const deleteQuiz = (quizId) => model.deleteOne({ _id: quizId });
