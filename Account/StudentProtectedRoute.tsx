import { useSelector } from "react-redux";
export default function StudentProtectedRoute({ children }: { children: any }) {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    return currentUser.role === "STUDENT" && children;
}