import { Col } from "react-bootstrap";
import { Form} from "react-bootstrap";
import { useParams } from "react-router";
import {assignments} from "../../Database";
import { Link } from "react-router-dom";
import { addAssignment, updateAssignment } from "./reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import * as coursesClient from "../client";
import * as assignmentsClient from "./client";

export default function AssignmentEditor() {
    const { cid, aid } = useParams();
    const dispatch = useDispatch();
    const existingAssignment = assignments.find((assignment: any) => assignment._id === aid);
    const isNewAssignment = !existingAssignment; 

    const [assignment, setAssignment] = useState(existingAssignment || { // if assignment is not found, create a new assignment
        _id: uuidv4(),
        title: "Assignment Title",
        course: cid,
        description: "Assignment Description",
        points: 0,
        duedate: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split(".")[0],
        availabledate: new Date().toISOString().split(".")[0],
    });

    // Create module for course
    const createAssignmentForCourse = async (assignment: any) => {
        if (!cid) return;
        const newAssignment = await coursesClient.createAssignmentForCourse(cid, assignment);
        dispatch(addAssignment(newAssignment));
    };

    // Update module for course
    const saveAssignment = async (assignment: any) => {
        await assignmentsClient.updateAssignment(assignment);
        dispatch(updateAssignment(assignment));
    };  

    return (
        <div id="wd-assignments-editor" className="ms-5 me-5">
            <div className="mb-3">
                <label htmlFor="wd-name" className="form-label">
                    Assignment Name</label>
                <input className="form-control"
                    id="wd-name" defaultValue={assignment ? assignment.title : "Assignment Title"}
                    onChange={(e) => { setAssignment({...assignment, title: e.target.value });}} />
            </div>
            
            <textarea className="form-control mb-3" id="wd-description" cols={50} rows ={10}>
                {assignment ? assignment.description : "Assignment Description"}
            </textarea>

            <Form>
                <Form.Group className="row mb-3">
                    <Form.Label column sm ={4} className="text-end">Points</Form.Label>
                    <Col sm={8}>
                        <Form.Control id="wd-points" value={assignment ? assignment.points : 100}
                            onChange={(e) => { setAssignment({...assignment, points: parseInt(e.target.value) })}}/>
                    </Col>
                </Form.Group>

                <Form.Group className="row mb-3">
                    <Form.Label column sm ={4} className="text-end">Assignment Group</Form.Label>
                    <Col sm={8}>
                        <Form.Select id="wd-group">
                            <option selected>ASSIGNMENTS</option>
                        </Form.Select>
                    </Col>
                </Form.Group>

                <Form.Group className="row mb-3">
                    <Form.Label column sm ={4} className="text-end">Display Grade as</Form.Label>
                    <Col sm={8}>
                        <Form.Select id="wd-display-grade-as">
                            <option selected>Percentage</option>
                        </Form.Select>
                    </Col>
                </Form.Group>

                <Form.Group className="row mb-3">
                    <Form.Label column sm ={4} className="text-end">Submission Type</Form.Label>
                    <div id="wd-submission-type" className="border rounded col-sm-8 p-3">
                        <Form.Select className="mb-3">
                            <option selected>Online</option>
                        </Form.Select>
                        <Form.Label className="fw-bold">Online Entry Options</Form.Label>
                        <Form.Check id="wd-text-entry" className="m-2 mb-3" type="checkbox" label="Text Entry" checked name="onlineEntryOptions"/>
                        <Form.Check id="wd-website-url" className="m-2 mb-3" type="checkbox" label="Website URL" name="onlineEntryOptions"/>
                        <Form.Check id="wd-media-recordings" className="m-2 mb-3" type="checkbox" label="Media Recordings" name="onlineEntryOptions"/>
                        <Form.Check id="wd-student-annotation" className="m-2 mb-3" type="checkbox" label="Student Annotation" name="onlineEntryOptions"/>
                        <Form.Check id="wd-file-upload" className="m-2 mb-3" type="checkbox" checked label="File Upload" name="onlineEntryOptions"/>
                    </div>
                </Form.Group>

                <Form.Group className="row mb-3">
                    <Form.Label column sm ={4} className="text-end">Assign</Form.Label>
                    <div id="wd-assign-to" className="border rounded col-sm-8 p-3">
                        <Form.Label className="fw-bold">Assign to</Form.Label>
                        <Form.Control className="mb-3" id="wd-assign-to" type="text" value="Everyone" multiple/>
                        
                        <Form.Label className="fw-bold">Due</Form.Label>
                        <Form.Control className="mb-3" id="wd-due-date" type="datetime-local" defaultValue={assignment?.duedate}
                            onChange={(e) => { setAssignment({...assignment, duedate: e.target.value })}}/>

                        <div className="d-flex">
                            <div className="flex-fill me-1" style={{ minWidth: 0 }}>
                            <Form.Label className="fw-bold mb-1 me-1">Available from</Form.Label>
                            <Form.Control className="mb-3 " id="wd-available-from" type="datetime-local" defaultValue={assignment?.availabledate}
                                onChange={(e) => { setAssignment({...assignment, availabledate: e.target.value })}}/>
                            </div>
                            <div className="flex-fill" style={{ minWidth: 0 }}>
                            <Form.Label className="fw-bold mb-1">Until</Form.Label>
                            <Form.Control className="mb-3" id="wd-available-until" type="datetime-local" defaultValue={assignment?.duedate}
                                onChange={(e) => { setAssignment({...assignment, duedate: e.target.value })}} />
                            </div>
                        </div>
                    </div>
                </Form.Group>
            </Form>

            <hr/>
            <div className="float-end">
                <Link className="btn btn-md btn-danger me-2 float-end" 
                    to={`/Kambaz/Courses/${cid}/Assignments`}
                    id="wd-save-btn"
                    onClick={() => {
                        if (isNewAssignment) {
                            createAssignmentForCourse(assignment);
                            // dispatch(addAssignment(assignment));
                        } 
                        else if (existingAssignment){
                            saveAssignment(assignment);
                            // dispatch(updateAssignment(assignment));
                        }
                    }}>
                    Save
                </Link>
                <Link className="btn btn-md btn-secondary me-2 float-end" 
                    to={`/Kambaz/Courses/${cid}/Assignments`}
                    id="wd-cancel-btn">
                    Cancel
                </Link>
            </div>
        </div>
);}