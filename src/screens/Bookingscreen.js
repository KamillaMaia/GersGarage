import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from "moment";
import Swal from "sweetalert2";


function Bookingscreen({ match }) {
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();
  const [vehicle, setvehicle] = useState();
  const slot = moment(match.params.slot, "dddd, DD-MM-YYYY HH:mm");
  const make = match.params.make;
  const model = match.params.model;
  const engine = match.params.engine;
  const service = match.params.service;


  useEffect(async () => {
    try {
      setloading(true);
      const data = (
        await axios.post("/api/vehicles/getvehiclebyid", {
          vehicleid: match.params.vehicleid,
        })
      ).data;

      setvehicle(data);
      setloading(false);
    } catch (error) {
      setloading(false);
      seterror(true);
    }
  }, []);

  async function bookService() {
    const bookingDetails = {
      vehicle,
      userid: JSON.parse(localStorage.getItem("currentUser"))._id,
      user: JSON.parse(localStorage.getItem("currentUser")),
      slot,
      make,
      model,
      engine,
      service
    }
    
    try {
      const result = await axios.post('/api/bookings/bookservice', bookingDetails)
      Swal.fire("Thank you", "Your service has been booked", "success").then(result=>{
        window.location.href='/profile'})
      
    } catch(error) {
      Swal.fire("Something went wrong", "Try again later", "error").then(result=>{
        window.location.href='/home'})
    }
  }


  return (
    <div>
      {loading ? (
        <h1>
          <Loader />
        </h1>
      ) : vehicle ? (
        <div className="row justify-content-center mt-5 ml-2 mr-2">
          <div className="col-md-4 mt-5  bs" style={{backgroundColor:"white"}}>
            <div className="col-md-12">
              <div style={{ textAlign: "left" }}>
                <h1>Booking details</h1>
                <hr />
                
                  <p><b>Name:</b> {JSON.parse(localStorage.getItem("currentUser")).fname}</p>
                  <p><b>Date and Time:</b> {match.params.slot} </p>
                  <p><b>Vehicle type:</b> {vehicle.type}</p>
                  <p><b>Make:</b> {match.params.make}</p>
                  <p><b>Model:</b> {match.params.model}</p>
                  <p><b>Engine Type:</b> {match.params.engine}</p> 

                  <h1>Service</h1>
                  <hr />
                  <p><b>Service type:</b> {match.params.service}</p>
                  <p><b>Total amount:</b> To be confirmed</p>
              </div>
              <div style={{ float: "right" }}>
                <button className="btn btn-primary" onClick={bookService}>Confirm Booking</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
}

export default Bookingscreen;
