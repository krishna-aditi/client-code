import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
// import Quizzes from "./Quizzes";
import AssignmentEditor from "./Assignments/Editor";
import { Navigate, Route, Routes, useParams, useLocation } from "react-router";
import { FaAlignJustify } from "react-icons/fa6";
// import PeopleTable from "./People/Table";
import CoursePeople from "./People/EnrolledUsers";

import QuizEditor from "./Quizzes/Editor.tsx";
import QuizReview from "./Quizzes/QuizPreview/QuizReview";
import QuizList from "./Quizzes";
import QuizDetails from "./Quizzes/QuizDetails.tsx";
import QuizQuestions from "./Quizzes/QuizQuestions";
import QuizStartScreen from "./Quizzes/QuizPreview/QuizStart.tsx";
import QuizPreview from "./Quizzes/QuizPreview";
import QuizSubmission from "./Quizzes/QuizPreview/QuizSubmission.tsx";

export default function Courses({ courses }: { courses: any[]; }) {
    const { cid } = useParams();
    const course = courses.find((course) => course._id === cid);
    const { pathname } = useLocation();
    return (
        <div id="wd-courses">
            <h2 className="text-danger">
                <FaAlignJustify className="me-4 fs-4 mb-1"/>
                {course && course.name} &gt; {pathname.split("/")[4]}
            </h2>
            <hr />
            <div className="d-flex">
                <div className="d-none d-md-block">
                    <CourseNavigation />
                </div>
                <div className="flex-fill">
                    <Routes>
                        <Route path="/" element={<Navigate to="Home" />} />
                        <Route path="Home" element={<Home/>} />
                        <Route path="Modules" element={<Modules />} />
                        <Route path="Assignments" element={<Assignments />} />
                        <Route path="Assignments/:aid" element={<AssignmentEditor />} />
                        <Route path="Quizzes">
                            <Route index element={<QuizList />} />
                            <Route path="new" element={<QuizEditor />} />
                            <Route path=":qid" element={<QuizEditor />} />
                            <Route path=":qid/details" element={<QuizDetails />} />
                            <Route path=":qid/questions" element={<QuizQuestions />} />
                            <Route path=":qid/preview" element={<QuizStartScreen />} />
                            <Route path=":qid/preview/take" element={<QuizPreview />} />
                            <Route path=":qid/preview/submitted" element={<QuizSubmission />} />
                            <Route path=":qid/preview/review" element={<QuizReview />} />
                        </Route>
                        <Route path="People" element={<CoursePeople />} />
                    </Routes>
                </div>
            </div>
        </div>
);}
