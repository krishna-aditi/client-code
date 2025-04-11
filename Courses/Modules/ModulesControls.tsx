import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";
import { Button, Dropdown } from "react-bootstrap";
import { MdDoNotDisturbAlt } from "react-icons/md";
import { useState } from "react";
import ModuleEditor from "./ModuleEditor";
import FacultyProtectedRoute from "../../Account/FacultyProtectedRoute";
export default function ModulesControls(
    { moduleName, setModuleName, addModule }:
    { moduleName: string; setModuleName: (title: string) => void; addModule: () => void; }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
    <div id="wd-modules-controls" className="text-nowrap">
        <FacultyProtectedRoute>
            {/* + Module Button */}
            <Button variant="danger" size="lg" onClick={handleShow}
                className="me-1 float-end" id="wd-add-module-btn">
                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                Module
            </Button>
                
            {/* Publish all dropdown */}
            <Dropdown className="float-end me-2">
                <Dropdown.Toggle variant="secondary" size="lg" id="wd-publish-all-btn">
                    <GreenCheckmark /> 
                    Publish All
                </Dropdown.Toggle>
            
                <Dropdown.Menu>
                    {/* <Dropdown.Item id="wd-publish-all">
                        <GreenCheckmark />
                        Publish All
                    </Dropdown.Item> */}
                    <Dropdown.Item id="wd-publish-all-modules-and-items">
                        <GreenCheckmark />
                        Publish all modules and items
                    </Dropdown.Item>
                    <Dropdown.Item id="wd-publish-modules-only">
                        <GreenCheckmark />
                        Publish modules only
                    </Dropdown.Item>
                    {/* Create two more items with IDs wd-unpublish-all-modules-and-items and wd-unpublish-modules-only with
                labels Unpublish all modules and items and Unpublish modules only */}
                    <Dropdown.Item id="wd-unpublish-all-modules-and-items">
                        <MdDoNotDisturbAlt className="position-relative me-2 fs-4" style={{ bottom: "1px" }} />
                        Unpublish all modules and items
                    </Dropdown.Item>
                    <Dropdown.Item id="wd-unpublish-modules-only">
                        <MdDoNotDisturbAlt className="position-relative me-2 fs-4" style={{ bottom: "1px" }} />
                        Unpublish modules only
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </FacultyProtectedRoute>

        {/* Implement the View Progress and Collapse All buttons with IDs wd-view-progress and wd-collapse-all */}
        {/* View Progress Button */}
        <Button size="lg"
            className="btn-secondary me-1 float-end" id="wd-view-progress-btn">
            {/* <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} /> */}
            View Progress
        </Button>
        {/* + Collapse All Button */}
        <Button size="lg"
            className="btn-secondary me-1 float-end" id="wd-collapse-all-btn">
            {/* <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} /> */}
            Collapse All
        </Button>
        
        <ModuleEditor show={show} handleClose={handleClose} dialogTitle="Add Module"
            moduleName={moduleName} setModuleName={setModuleName} addModule={addModule} />
   </div>
);}
