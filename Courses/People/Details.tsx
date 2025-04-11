import { useEffect, useState } from "react";
import { FaCheck, FaUserCircle } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { useParams, useNavigate } from "react-router";
// import { Link } from "react-router-dom";
import * as client from "../../Account/client";
import { FaPencil } from "react-icons/fa6";
import { FormControl } from "react-bootstrap";
export default function PeopleDetails() {
    const { uid} = useParams();
    const [user, setUser] = useState<any>({});
    const navigate = useNavigate();

    // Update user
    const [name, setName] = useState(""); // to edit the user's first and last name
    const [editing, setEditing] = useState(false); // state to check whether we are editing or not
    const saveUser = async () => { // to save updates to user's name
        const [firstName, lastName] = name.split(" "); 
        const updatedUser = { ...user, firstName, lastName };
        await client.updateUser(updatedUser); // send updatedUser to server
        setUser(updatedUser); 
        setEditing(false); // set editing to false
        navigate(-1); // back to people table
    };

    // Update user role
    const updateRole = async (role: string) => {
        const updatedUser = { ...user, role }; // create a new user object with updated role
        await client.updateUser(updatedUser);
        setUser(updatedUser);
        navigate(-1);
    }

    // Update user email
    const [email, setEmail] = useState("");
    const [emailEditing, setEmailEditing] = useState(false);
    const updateEmail = async () => {
        const updatedUser = { ...user, email }; // create a new user object with updated email
        await client.updateUser(updatedUser);
        setUser(updatedUser);
        setEmailEditing(false);
        navigate(-1);
    }

    // Delete user
    const deleteUser = async (uid: string) => {
        await client.deleteUser(uid);
        navigate(-1); // navigate back to people table
      };
    
    const fetchUser = async () => {
        if (!uid) return;
        const user = await client.findUserById(uid);
        setUser(user);
    };
    useEffect(() => {
        if (uid) fetchUser();
    }, [uid]);
    if (!uid) return null;

    return (
        <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
            {/* Close button */}
            <button onClick={() => navigate(-1)} 
                className="btn position-fixed end-0 top-0 wd-close-details">
                <IoCloseSharp className="fs-1" />
            </button>
            <div className="text-center mt-2"> <FaUserCircle className="text-secondary me-2 fs-1" /></div><hr />
            <div className="text-danger fs-4 wd-name"> 
                {/* {user.firstName} {user.lastName}  */}
                {/* If not editing, show pencil icon clicking pencil turns on editing and hides pencil */}
                {!editing && (
                    <FaPencil onClick={() => setEditing(true)}
                        className="float-end fs-5 mt-2 wd-edit" /> )}
                        
                {/* If editing show check mark. Clicking check turns off editing, saves and hides check */}
                {editing && (
                    <FaCheck onClick={() => saveUser()}
                        className="float-end fs-5 mt-2 me-2 wd-save" /> )}

                {/* If not editing show first and last name clicking on name turns on editing */}
                {!editing && (
                    <div className="wd-name"
                        onClick={() => setEditing(true)}>
                        {user.firstName} {user.lastName}
                    </div> )}
                

                {user && editing && ( // if editing show input field to edit name
                    // name is initially concatenation of first and last update name as we type
                    <FormControl className="w-50 wd-edit-name"
                        defaultValue={`${user.firstName} ${user.lastName}`}
                        onChange={(e) => setName(e.target.value)}
                        onKeyDown={(e) => {
                            // save the user if Enter key is pressed 
                            if (e.key === "Enter") { saveUser(); }}}/> )} 
            </div>
            {/* <b>Roles:</b>           <span className="wd-roles">         {user.role}         </span> <br /> */}
            <b>Role:</b>
            <div className="wd-roles">
                <select value={user.role} onChange={(e) => updateRole(e.target.value)}
                    className="form-select float-start w-30 wd-select-role" >
                    <option value="STUDENT">Student</option>
                    <option value="TA">TA</option>
                    <option value="FACULTY">Faculty</option>
                    <option value="ADMIN">Administrator</option>
                </select>
            </div>
            <br />
            {/* <b>Email:</b>           <span className="wd-email">         {user.email}         </span> <br /> */}
            <div className="wd-email">
                <b>Email: </b>
                {!emailEditing && (
                    <FaPencil onClick={() => setEmailEditing(true)} // If not editing, show pencil icon clicking pencil turns on editing and hides pencil
                        className="float-end fs-5 mt-2 wd-edit" /> )}

                {emailEditing && (
                    <FaCheck onClick={() => updateEmail()} // If editing show check mark. Clicking check turns off editing, saves and hides check 
                        className="float-end fs-5 mt-2 me-2 wd-save" /> )}

                {!emailEditing && ( // If not editing show email, clicking on email turns on editing
                    <div className="wd-email"
                        onClick={() => setEmailEditing(true)}>
                        {user.email}
                    </div> )}

                {user && emailEditing && ( // show the input field when editing is true
                    <input className="form-control w-50 wd-edit-email"
                        type="email"
                        defaultValue={`${user.email}`}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyDown={(e) => {
                            // save the user if Enter key is pressed 
                            if (e.key === "Enter") { updateEmail(); }
                        }} /> )}
            </div>
            <b>Login ID:</b>        <span className="wd-login-id">      {user.loginId}      </span> <br />
            <b>Section:</b>         <span className="wd-section">       {user.section}      </span> <br />
            <b>Total Activity:</b>  <span className="wd-total-activity">{user.totalActivity}</span> 
            <hr />
            {/* Delete button */}
            <button onClick={() => deleteUser(uid)} 
                className="btn btn-danger float-end wd-delete">
                Delete 
            </button>
            {/* Cancel button */}
            <button onClick={() => navigate(-1)}
                className="btn btn-secondary float-start float-end me-2 wd-cancel">
                Cancel
            </button>
        </div>
    ); 
}