import { ListGroup } from "react-bootstrap";
import { Link, useParams, useLocation } from "react-router-dom";
export default function CourseNavigation() {
  const { cid } = useParams();
  const { pathname } = useLocation();
  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];
  return (
    <ListGroup id="wd-courses-navigation" className="wd fs-5 rounded-0">
      {links.map((link) => (
          <Link to={`/Kambaz/Courses/${cid}/${link}`}
            className={`list-group-item border border-0 ${pathname.includes(link) ? "active" : "text-danger"}`}> {link} </Link>
      ))}
    </ListGroup>
  );
}