import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Swal from "sweetalert2";

function Registerscreen() {
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [phonenumber, setphonenumber] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  const [licencenumber, setlicencenumber] = useState("");

  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();

  async function register() {
    if (password === cpassword) {
      const user = {
        fname,
        lname,
        phonenumber,
        email,
        password,
        cpassword,
        licencenumber,
      };
      try {
        setloading(true);
        const result = await axios.post("/api/users/register", user).data;
        setloading(false);
        Swal.fire("Registration Completed!", "You can login now", "success").then(result=>{
          window.location.href='/login'})

        setfname("");
        setlname("");
        setphonenumber("");
        setemail("");
        setpassword("");
        setcpassword("");
        setlicencenumber("");
        
      } catch (error) {
        console.log(error);
        setloading(false);
        seterror(true);
      }
    } else {
      alert("Passwords do not match");
    }
  }
  return (
    <div>
      {loading && <Loader />}
      {error && <Error />}

      <div className="row justify-content-center mt-5">
        <div className="col-md-4 mt-5">
          <h2>Register</h2>
          <p>*All fields are required to complete registration</p>
          <div className="ml-2 mr-2 bs" style={{backgroundColor:"white"}}>
            
            <h3>Your details</h3>
            <input
              type="text"
              className="form-control"
              placeholder="First Name"
              value={fname}
              onChange={(e) => {
                setfname(e.target.value);
              }}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Last Name"
              value={lname}
              onChange={(e) => {
                setlname(e.target.value);
              }}
            />
            <input
              type="tel"
              pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
              className="form-control"
              placeholder="Phone Number"
              value={phonenumber}
              onChange={(e) => {
                setphonenumber(e.target.value);
              }}
            />
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
            <input
              type="password"
              className="form-control"
              placeholder="confirm password"
              value={cpassword}
              onChange={(e) => {
                setcpassword(e.target.value);
              }}
            />
          </div>
          <div className="ml-2 mr-2 bs" style={{backgroundColor:"white"}}>
          <h3>Licence details</h3>
          <input
              type="text"
              className="form-control"
              placeholder="Licence number"
              value={licencenumber}
              onChange={(e) => {
                setlicencenumber(e.target.value);
              }}
            />
          </div >
          <div className="text-right mr-2">
          {(fname && lname && phonenumber && email && password && cpassword && licencenumber) && (
          <button className="btn btn-primary mt-3"  onClick={register}>
              Register
            </button> )}
            </div>
        </div>
      </div>
    </div>
  );
}

export default Registerscreen;
