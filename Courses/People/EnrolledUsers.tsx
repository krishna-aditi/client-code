// This would be in a new file: Courses/People/index.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PeopleTable from "./Table";
import * as courseClient from "../client";

export default function CoursePeople() {
    const { cid } = useParams();
    const [enrolledUsers, setEnrolledUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEnrolledUsers = async () => {
        try {
            if (cid) {
                const users = await courseClient.findUsersForCourse(cid);
                setEnrolledUsers(users);
            }
        } catch (error) {
            console.error("Error fetching enrolled users:", error);
        } finally {
            setLoading(false);
        }
        };
        fetchEnrolledUsers();
    }, [cid]);

    if (loading) {
        return <div>Loading enrolled users...</div>;
    }
    return <PeopleTable users={enrolledUsers} />;
}