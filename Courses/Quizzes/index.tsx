import { ListGroup } from "react-bootstrap";
import QuizPageControls from "./QuizPageControls";
import { BsGripVertical } from "react-icons/bs";
import { GoTriangleDown } from "react-icons/go";

export default function Quizzes(){
    return(
        <div id="wd-quizzes">
            <QuizPageControls />
            <br /><br />
            <ListGroup className="rounded-0" id="wd-assignments">
                <ListGroup.Item className="wd-quizzes-title p-0 fs-5 border-gray">
                    <div className="wd-quizzes-heading p-3 ps-2 bg-secondary d-flex justify-content-between">
                        <div className="d-flex align-items-center">
                        <BsGripVertical className="me-2 fs-3"/>
                        <GoTriangleDown className="me-2" />
                        <b>Assignment Quizzes</b>
                        </div>
                    </div>
                </ListGroup.Item>
            </ListGroup>
        </div>
    );
}