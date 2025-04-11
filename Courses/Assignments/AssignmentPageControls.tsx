import { Button, FormControl, InputGroup } from "react-bootstrap";
import { FaPlus, FaSearch } from "react-icons/fa";
import FacultyProtectedRoute from "../../Account/FacultyProtectedRoute";
import { useNavigate } from "react-router-dom";
export default function AssignmentPageControls() {
    const navigate = useNavigate(); 
    const navigateToEditor = () => navigate("../Assignments/Editor");
    return (
      <div id="wd-assignment-controls" className="text-nowrap">
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
                    {/* + Group Button */}
                    <Button variant="outline-secondary" 
                        size="lg"
                        className="btn-secondary me-1" 
                        id="wd-add-group-btn">
                        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                        Group
                    </Button>
                    {/* Assignment Button */}
                    <Button variant="danger" 
                        size="lg"
                        className="me-1" 
                        id="wd-add-assignment-btn"
                        onClick={navigateToEditor}>
                        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                        Assignment
                    </Button>
                </div>
            </FacultyProtectedRoute>

        </div>
    );
}