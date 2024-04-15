import model from "./model.js";

// create a new quiz
export const createQuestion = (question) => model.create(question);

// find all quizes by course 
export const findAllQuizQuestions = (quizId) => model.find({quizId: quizId});

// find quiz by id 
export const findQuestionById = (questionId) => model.findById(questionId);

// update a quiz
export const updateQuestion = (questionId, question) =>  model.updateOne({ _id: questionId }, { $set: question });

// delete a quiz
export const deleteQuestion = (questionId) => model.deleteOne({ _id: questionId });
