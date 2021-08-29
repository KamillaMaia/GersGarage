import React, { useState, useEffect } from "react";
import axios from "axios";
import Vehicle from "../components/Vehicle";
import Loader from "../components/Loader";
import "antd/dist/antd.css";
import Error from "../components/Error";
import { DatePicker, Checkbox } from "antd";
import moment from "moment";
import Swal from "sweetalert2";


function Homescreen() {
  const [vehicles, setvehicles] = useState([]);
  const [loading, setloading] = useState();
  const [error, seterror] = useState();
  const [slot, setSlot] = useState();
  const [service, setService] = useState();

  useEffect(async () => {
    try {
      setloading(true);
      const data = (await axios.get("/api/vehicles/getallvehicles")).data;
      setvehicles(data);
      if(!localStorage.getItem("currentUser")){
        Swal.fire("Not logged in?", "You need to login first", "info").then(result=>{
          window.location.href='/login'})
      }
    
      setloading(false);
    } catch (error) {
      seterror(true);
      console.log(error);
      setloading(false);
    }
  }, []);

  function filterByDate(date) {
    setSlot(moment(date).format("dddd, DD-MM-YYYY HH:mm"));
  }

  
  function disabledDate(current) {
    // Cannot select days before today and today
    return (current && current < moment().endOf("day"));
  }

  function disabledRangeTime(_, type) {
    if (type === "start") {
      return {
        disabledHours: () => [0, 1, 2, 3, 4, 5, 6, 7, 8, 18, 19, 20, 21, 22, 23],
      };
    }
    return {
      disabledHours: () => [0, 1, 2, 3, 4, 5, 6, 7, 8, 18, 19, 20, 21, 22, 23],
    };
  }

  function onChange(checkedValues) {
    console.log("checked = ", checkedValues);
  }
  const serviceOptions = [
    "Annual Service",
    "Major Service",
    "Fault",
    "Major Repair",
  ];
  const options = [
    { label: "Annual Service", value: "Annual Service" },
    { label: "Major Service", value: "Major Service" },
    { label: "Fault", value: "Fault" },
    { label: "Major Repair", value: "Major Repair" },
  ];
  return (
    <body>
    <div className="container mt-5" >
      <div className="row justify-content-center ml-1 mr-1 bs "  style={{backgroundColor:"white"}}>
        <div className="col-md-14">
          <p >
          <h1><b>Book a vehicle service</b></h1>
          <hr />
            <h3>
            1<sup>st</sup>.&nbsp; Select booking date and time:&nbsp;&nbsp;
              <DatePicker
                format="dddd, DD-MM-YYYY HH:mm"
                showNow={false}
                disabledDate={disabledDate}
                disabledTime={disabledRangeTime}
                showTime={{
                  hideDisabledOptions: true,
                  defaultValue: moment("00:00", "HH:mm"),
                  format: "HH:00",
                }}
                onChange={filterByDate}
              />
            </h3>
            <br />
            <h3>
            2<sup>nd</sup>.&nbsp; Select the type of booking:&nbsp;
              <Checkbox.Group
                options={serviceOptions}
                defaultValue={[""]}
                onChange={setService}
              />
            </h3>
            <br/>
            <h3> 3<sup>rd</sup>.&nbsp; Select vehicle type and details:</h3>
            <div className="row justify-content-center">
              
              {loading ? (
                <h1>
                  <Loader />
                </h1>
              ) : vehicles.length > 1 ? (
                vehicles.map((vehicle) => {
                  return (
                    <div className="col-md-6 mt-2">
                      <Vehicle
                        vehicle={vehicle}
                        slot={slot}
                        service={service}
                      />
                    </div>
                  );
                })
              ) : (
                <Error />
              )}
            </div>
          </p>
        </div>
      </div>
    </div>
    
    </body>
  );
}

export default Homescreen;
