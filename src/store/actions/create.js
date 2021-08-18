import { CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION } from "./actionTypes";
import axios from "axios";

export function createQuizQuestion(item) {
    return {
        type: CREATE_QUIZ_QUESTION,
        item
    }
}

export function resetQuizCreation(){
    return {
        type: RESET_QUIZ_CREATION
    }
}

export function finishCreateQuiz() {
    return async (dispatch, getState) => {
        await axios.post
        ('https://react-quiz-cfb65-default-rtdb.europe-west1.firebasedatabase.app/New%20Quiz.json', getState().create.quiz)
        dispatch (resetQuizCreation())
    }
}