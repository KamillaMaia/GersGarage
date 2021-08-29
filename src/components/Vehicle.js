import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Radio } from "antd";
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({
    duration: "1000"
});

function Vehicle({ vehicle, slot, service }) {
  const [make, setMake] = useState();
  const [model, setModel] = useState();
  const [engine, setEngine] = useState();

  return (
    <div className="row box" style={{backgroundColor : "lightgray"}} data-aos="flip-up">
      <div className="col-md-13">
        <h1>{vehicle.type}</h1>
        <b>
          <p>
            Make:
            <select 
              onChange={(e) => {
                setMake(e.target.value);
              }}
            >
              <option>Select your car make</option>
              {vehicle.make.map((data) => (
                <option key={data} value={data}>
                  {data}
                </option>
              ))}
            </select>
            &nbsp;&nbsp; Model:
            <select
              onChange={(e) => {
                setModel(e.target.value);
              }}
            >
              <option>Select your car model</option>
              {vehicle.model.map((data) => (
                <option key={data} value={data}>
                  {data}
                </option>
              ))}
            </select>
            <br />
            <br />
             Engine Type: &nbsp;
              <Radio.Group onChange={(e) => {
                setEngine(e.target.value);
              }}
              >
                {vehicle.enginetype.map((data) => (
                <Radio value={data}>{data}</Radio>
              ))}
              </Radio.Group>
          </p>
        </b>
        
        <div style={{ float: "right" }}>
        {(slot && service && make && model && engine) && (
          <Link to={`/booking/${vehicle._id}/${slot}/${service}/${make}/${model}/${engine}`}>
          <button className="btn btn-primary m-2">Book now</button>
        </Link>
          )}
          
        </div>
      </div>
    </div>
  );
}

export default Vehicle;
