import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "../Courses/Modules/reducer";
import accountReducer from "../Account/reducer";
import assignmentReducer from "../Courses/Assignments/reducer";
import enrollmentReducer from "../Enrollments/reducer";
import quizzesReducer from "../Courses/Quizzes/reducer";
import questionsReducer from "../Courses/Quizzes/QuizQuestions/reducer.ts";
import quizReviewReducer from "../Courses/Quizzes/QuizPreview/QuizReview/reducer.ts";
import submissionsReducer from "../Courses/Quizzes/QuizPreview/QuizReview/reducer.ts";
const store = configureStore({
  reducer: {
    modulesReducer,
    accountReducer,
    assignmentReducer,
    enrollmentReducer,
    quizzesReducer,
    questionsReducer,
    quizReviewReducer,
    submissionsReducer
  },
});
export default store;