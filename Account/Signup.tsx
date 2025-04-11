import { Link, useNavigate } from "react-router-dom";
import { FormControl} from "react-bootstrap";
import * as client from "./client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";

export default function Signup() {
   const [user, setUser] = useState<any>({});
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const signup = async () => {
      const currentUser = await client.signup(user);
      dispatch(setCurrentUser(currentUser));
      navigate("/Kambaz/Account/Profile");
   };

    return (
         <div id="wd-signup-screen">
            <h3>Sign up</h3>
            <FormControl id="wd-username"
               placeholder="username"
               className="mb-2"
               value = {user.username} 
               onChange = {(e) => setUser({ ...user, username: e.target.value })}/>      
            <FormControl id="wd-password"
               placeholder="password" 
               type="password"
               className="mb-2"
               value={user.password} 
               onChange={(e) => setUser({ ...user, password: e.target.value })}/>
            {/* <FormControl id="wd-password-verify"
               placeholder="verify password" type="password"
               className="mb-2"/> */}

            <Link onClick={signup}
               id="wd-signin-btn" 
               to="/Kambaz/Account/Profile"
               className="btn btn-primary w-100 mb-2">
               Sign up
            </Link>

            <br />

            <Link id="wd-signin-link" to="/Kambaz/Account/Signin">
               Sign in
            </Link>
        </div>
    );}
    