import { Col, ListGroup, Row } from "react-bootstrap";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { BsGripVertical } from "react-icons/bs";
import { GoTriangleDown } from "react-icons/go";
import AssignmentControls from "./AssignmentControls";
import { TbFilePencil } from "react-icons/tb";
import AssignmentPageControls from "./AssignmentPageControls";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setAssignments, deleteAssignment } from "./reducer";
import * as coursesClient from "../client"; 
import * as assignmentsClient from "./client";
import { useEffect } from "react";

export default function Assignments() {
    const { cid } = useParams();
    // const assignments = db.assignments;
    const { assignments } = useSelector((state: any) => state.assignmentReducer);
    const dispatch = useDispatch();

    // Retreive assignments for course
    // const fetchAssignments = async () => {
    //     const assignments = await coursesClient.findAssignmentsForCourse(cid as string);
    //     dispatch(setAssignments(assignments));
    // };
    // useEffect(() => {
    //     fetchAssignments();
    // }, []);
    const fetchAssignmentsForCourse = async () => {
        const assignments = await coursesClient.findAssignmentsForCourse(cid!);
        dispatch(setAssignments(assignments));
    };
    useEffect(() => {
        fetchAssignmentsForCourse();
    }, [cid]);

    // Delete assignments for course
    // const removeAssignment = async (assignmentId: string) => {
    //     await assignmentsClient.deleteAssignment(assignmentId);
    //     dispatch(deleteAssignment(assignmentId));
    // };
    const deleteModuleHandler = async (assignmentId: string) => {
        await assignmentsClient.deleteAssignment(assignmentId);
        dispatch(deleteAssignment(assignmentId));
    };
     
    
    return (
        <div id="wd-assignments">

            <AssignmentPageControls />
            <br /><br />

            <ListGroup className="rounded-0" id="wd-assignments">
                <ListGroup.Item className="wd-assignment-title p-0 fs-5 border-gray">
                    <div className="wd-assignments-heading p-3 ps-2 bg-secondary d-flex justify-content-between">
                        <div className="d-flex align-items-center">
                        <BsGripVertical className="me-2 fs-3"/>
                        <GoTriangleDown className="me-2" />
                        <b>ASSIGNMENTS</b>
                        </div>
                        <AssignmentControlButtons />
                    </div>

                    {assignments
                    // .filter((assignment: any) => assignment.course === cid)
                    .map((assignment: any) => (
                        <ListGroup className="wd-assignment-list rounded-0">
                            {/* A1 */}
                            <ListGroup.Item className="wd-assignment p-3 ps-1">
                                <Row>
                                    <Col xs="auto">
                                        <BsGripVertical className="me-2 fs-3" />
                                        <TbFilePencil className="me-2 fs-3 text-success" />
                                    </Col>
                                    <Col xs={6}>
                                        <a className="wd-assignment-link fw-bold text-black text-decoration-none" 
                                            href={`#/Kambaz/Courses/${cid}/Assignments/${assignment._id}`}>
                                            {assignment.title}
                                        </a>
                                        <p className="fs-6 mb-0">
                                            <span className="text-danger"> Multiple Modules </span> | <b>Not available until</b> {assignment.availabledate.split("T")[0]} at {new Date(assignment.availabledate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} | <b>Due</b> {assignment.duedate.split("T")[0]} at {new Date(assignment.duedate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} | {assignment.points} pts
                                            {/* <b> Not available until</b> {assignment.availabledate.split("T")[0]} at {assignment.availabledate.split("T")[1]} | <b>Due</b> {assignment.duedate.split("T")[0]} at {assignment.duedate.split("T")[1]} | {assignment.points} pts */}
                                        </p>
                                    </Col>
                                    <Col>
                                        <AssignmentControls assignmentId={assignment._id}
                                            assignmentTitle={assignment.title}
                                            deleteAssignment={
                                                (assignmentId) => deleteModuleHandler(assignmentId)
                                                // {dispatch(deleteAssignment(assignmentId));}
                                            } />
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    ))}
                </ListGroup.Item>
            </ListGroup>
      </div>
  );}
  