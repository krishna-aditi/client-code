import { Button, FormControl, InputGroup } from "react-bootstrap";
import { FaPlus, FaSearch } from "react-icons/fa";
import FacultyProtectedRoute from "../../Account/FacultyProtectedRoute";
// import { useNavigate } from "react-router-dom";
export default function QuizPageControls() {
    // const navigate = useNavigate(); 
    // const navigateToEditor = () => navigate("`#/Kanbas/Courses/${cid}/Quizzes/New/Editor");
    return (
      <div id="wd-quiz-controls" className="text-nowrap">
            {/* Search bar */}
            <InputGroup className="d-inline-flex me-2" style={{ width: "300px", height: "50px" }}>
                <InputGroup.Text className="bg-white border-end-0">
                    <FaSearch className="text-muted" />
                </InputGroup.Text>
                <FormControl className="border-start-0"
                    placeholder="Search..."/>
            </InputGroup>

            <FacultyProtectedRoute>
                <div className="float-end me-2">
                    {/* + Quiz Button */}
                    <Button variant="danger" 
                        size="lg"
                        className="me-1" 
                        id="wd-add-quiz-btn">
                        {/* onClick={navigateToEditor}> */}
                        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                        Quiz
                    </Button>
                </div>
            </FacultyProtectedRoute>
        </div>
    );
}