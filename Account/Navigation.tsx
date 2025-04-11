import { ListGroup } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
export default function AccountNavigation() {
  const { pathname } = useLocation();
  // const links = ["Signin", "Signup", "Profile"]
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
  // for Users link
  const active = (path: string) => (pathname.includes(path) ? "active" : "");
  return (
    <ListGroup id="wd-account-navigation" className="wd fs-5 rounded-0">
      {links.map((link) => (
          <Link to={`/Kambaz/Account/${link}`}
            className={`list-group-item border border-0 ${pathname.includes(link) ? "active" : "text-danger"}`}> {link} </Link>
      ))}

      {currentUser && currentUser.role === "ADMIN" && ( // if user is an admin, show the Users link
        <Link to={`/Kambaz/Account/Users`} className={`list-group-item border-0 ${active("Users")}`}> 
          Users
        </Link> )
      }
    </ListGroup>
);}
