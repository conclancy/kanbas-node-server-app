import mongoose from "mongoose";

// create the quizes schema
const questionSchema = new mongoose.Schema({
    quizId: { type: String, default: '', required: true },
    questionType:{ 
        type: String, 
        enum: ['MULTI', 'TRUEFALSE', 'BLANKS'], 
        default: 'MULTI' 
    },
    title: { type: String, default: '' },
    points: {type: Number, default: 0}, 
    question: { type: String, default: '' },
    choices: {type: [String]},
    correctAnswerIndex: {type: Number}
},
{ 
    // store data in "quizes" collection
    collection: "questions"
});

export default questionSchema; 