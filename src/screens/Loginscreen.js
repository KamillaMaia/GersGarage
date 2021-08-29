import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";

function Loginscreen() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();

  async function Login() {
 
      const user = {
        email,
        password
      }
      try {
        setloading(true);
        const result = (await axios.post("/api/users/login", user)).data
        setloading(false);

        
        localStorage.setItem("currentUser", JSON.stringify(result));
        
        if(!JSON.parse(localStorage.getItem("currentUser")).isAdmin){
          window.location.href="/home"
      } else {
        window.location.href="/admin"
      }
      
      } catch(error) {
        console.log(error);
        setloading(false);
        seterror(true);
      }
  }
  return (
    <div >
      {loading && (<Loader />)}
      <div class="row justify-content-center mt-5 " >
        <div className="col-md-4 ml-2 mr-2 mt-5">
        {error && (<Error message="Incorrect email or password" />)}
          <div className="bs " style={{backgroundColor:"white"}}>
            <h2>Login</h2>
            <input
              type="email"
              className="form-control"
              placeholder="email"
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />
            <input
              type="password"
              className="form-control"
              placeholder="password"
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            />
            <button className="btn btn-primary mt-3" onClick={Login}>
              Login
            </button>
            <br />
            <br />
            <div>Not registered yet? <a className="" href={"/register"} 
              >Register</a></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loginscreen;
