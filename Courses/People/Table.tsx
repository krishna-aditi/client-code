import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
// import * as courseClient from "../client";
// import { useParams } from "react-router-dom";
// import * as db from "../../Database";
import PeopleDetails from "./Details";
export default function PeopleTable({ users = [] }: { users?: any[] }) {
    // const { cid } = useParams();
    // const { users, enrollments } = db;
    return (
    <div id="wd-people-table">
        <PeopleDetails />
        <Table striped>
            <thead>
            <tr>
                <th>Name</th>
                <th>Login ID</th>
                <th>Section</th>
                <th>Role</th>
                <th>Email</th>
                <th>Last Activity</th>
                <th>Total Activity</th>
            </tr>
            </thead>
            <tbody>
                {users
                // .filter((usr) =>
                // enrollments.some((enrollment) => enrollment.user === usr._id && enrollment.course === cid)
                // )
                .map((user: any) => (
                <tr key={user._id}>
                    <td className="wd-full-name text-nowrap">
                        <Link to={`/Kambaz/Account/Users/${user._id}`} className="text-danger text-decoration-none">
                            <FaUserCircle className="me-2 fs-1 text-secondary" />
                            <span className="wd-first-name">{user.firstName} </span>
                            <span className="wd-last-name">{user.lastName}</span>
                        </Link>
                    </td>
                    <td className="wd-login-id">{user.loginId}</td>
                    <td className="wd-section">{user.section}</td>
                    <td className="wd-role">{user.role}</td>
                    <td className="wd-email">{user.email}</td>
                    {/* <td className="wd-last-activity">{user.lastActivity.split("T")[0]} {new Date(user.lastActivity).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</td> */}
                    <td className="wd-last-activity">{user.lastActivity}</td>
                    <td className="wd-total-activity">{user.totalActivity}</td>
                </tr>
                ))}
            </tbody>
        </Table>
    </div>
    );
}