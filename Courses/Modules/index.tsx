import { FormControl, ListGroup } from "react-bootstrap";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import { BsGripVertical } from "react-icons/bs";
import LessonControlButtons from "./LessonControlButtons";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { setModules, addModule, editModule, updateModule, deleteModule }
  from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import * as coursesClient from "../client";
import * as modulesClient from "./client";

export default function Modules() {
    const { cid } = useParams();
    const [moduleName, setModuleName] = useState("");
    const { modules } = useSelector((state: any) => state.modulesReducer);
    const dispatch = useDispatch();

    // Update module for course
    // const saveModule = async (module: any) => {
    //     await modulesClient.updateModule(module);
    //     dispatch(updateModule(module));
    // };
    const updateModuleHandler = async (module: any) => {
        await modulesClient.updateModule(module);
        dispatch(updateModule(module));
    };
      

    // Remove / Delete module for course
    // const removeModule = async (moduleId: string) => {
    //     await modulesClient.deleteModule(moduleId);
    //     dispatch(deleteModule(moduleId));
    // };
    const deleteModuleHandler = async (moduleId: string) => {
        await modulesClient.deleteModule(moduleId);
        dispatch(deleteModule(moduleId));
    };
     


    // Create module for course
    // const createModuleForCourse = async () => {
    //     if (!cid) return;
    //     const newModule = { name: moduleName, course: cid };
    //     const module = await coursesClient.createModuleForCourse(cid, newModule);
    //     dispatch(addModule(module));
    // };
    const addModuleHandler = async () => {
        const newModule = await coursesClient.createModuleForCourse(cid!, {
          name: moduleName,
          course: cid,
        });
        dispatch(addModule(newModule));
        setModuleName("");
    };
     
    
    // Read modules for course
    // const fetchModules = async () => {
    //     const modules = await coursesClient.findModulesForCourse(cid as string);
    //     dispatch(setModules(modules));
    // };
    // useEffect(() => {
    //     fetchModules();
    // }, []);
    const fetchModulesForCourse = async () => {
        const modules = await coursesClient.findModulesForCourse(cid!);
        dispatch(setModules(modules));
    };
    useEffect(() => {
        fetchModulesForCourse();
    }, [cid]);

    return (
      <div>
        {/* <ModulesControls setModuleName={setModuleName} moduleName={moduleName} addModule={() => {
            dispatch(addModule({ name: moduleName, course: cid }));
            setModuleName("");
        }} /> */}
        <ModulesControls setModuleName={setModuleName} 
            moduleName={moduleName} 
            addModule={addModuleHandler} />
            {/* addModule={createModuleForCourse} /> */}
        <br /><br /><br /><br />

        <ListGroup className="rounded-0" id="wd-modules">
            {modules
            // .filter((module: any) => module.course === cid)
            .map((module: any) => (
            <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
                <div className="wd-title p-3 ps-2 bg-secondary">
                    <BsGripVertical className="me-2 fs-3" />
                    {!module.editing && module.name}
                    { module.editing && (
                        <FormControl className="w-50 d-inline-block"
                            onChange={(e) =>  updateModuleHandler({ ...module, name: e.target.value })}
                            // onChange={(e) =>  dispatch(updateModule({ ...module, name: e.target.value }))}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    updateModuleHandler({ ...module, editing: false });
                                    // saveModule({ ...module, editing: false });
                                    // dispatch(updateModule({ ...module, editing: false }));
                                }
                            }}
                            defaultValue={module.name}/>
                    )}
                    {/* <ModuleControlButtons moduleId={module._id} deleteModule=dispatch({deleteModule}) editModule={editModule}/> */}
                    <ModuleControlButtons moduleId={module._id}
                        // deleteModule={(moduleId) => {dispatch(deleteModule(moduleId)); }} 
                        // deleteModule={(moduleId) => removeModule(moduleId)}
                        deleteModule={(moduleId) => deleteModuleHandler(moduleId)}
                        editModule={(moduleId) => dispatch(editModule(moduleId))} />
                </div>
                {module.lessons && (
                    <ListGroup className="wd-lessons rounded-0">
                        {module.lessons.map((lesson: any) => (
                            <ListGroup.Item className="wd-lesson p-3 ps-1">
                                <BsGripVertical className="me-2 fs-3" /> 
                                {lesson.name} 
                                <LessonControlButtons />
                            </ListGroup.Item>
                            ))}
                    </ListGroup>
                )}
            </ListGroup.Item>
            ))}
        </ListGroup>
    </div>
  );}
  