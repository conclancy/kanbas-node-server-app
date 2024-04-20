import mongoose from "mongoose";

// create the quizes schema
const quizSchema = new mongoose.Schema({
    title: { type: String, default: '' },
    quizType: {
        type: String,
        enum: ["Graded Quiz", "Practice Quiz", "Graded Survey", "Ungraded Survey"],
        default: "Graded Quiz",
    },
    points: {type: Number, default: 0}, 
    assignmentGroup: { 
        type: String, 
        enum: ['Quizzes', 'Exams', 'Assignments', 'Project'], 
        default: 'Quizzes' 
    },
    shuffleAnswers: { type: Boolean, default: true },
    timeLimit: { type: Number, default: 20 },
    multipleAttempts: { type: Boolean, default: false },
    showCorrectAnswers: { type: Boolean, default: false },
    accessCode: { type: String, default: '' },
    oneQuestionAtATime: { type: Boolean, default: true },
    webcamRequired: { type: Boolean, default: false },
    lockQuestionsAfterAnswering: { type: Boolean, default: false },
    dueDate: { type: Date },
    availableDate: { type: Date },
    untilDate: { type: Date },
    courseId: { type: String },
    published: { type: Boolean, default: false },
},
{ 
    // store data in "quizes" collection
    collection: "quizzes"
});

export default quizSchema; 