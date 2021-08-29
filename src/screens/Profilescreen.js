import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import axios from "axios";
import Loader from "../components/Loader";
import Swal from "sweetalert2";
import { Tag } from 'antd';

const { TabPane } = Tabs;

const user = JSON.parse(localStorage.getItem("currentUser"));

function Profilescreen() {
  
  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  }, []);

  return (
    <div classname="ml-3 mt-4"  >
      <Tabs defaultActiveKey="1" className="tb">
        <TabPane tab="Profile" key="1" >
        <div className="row" >
           <div className="col-md-4 bs ml-4 mr-4 mb-5" style={{backgroundColor:"white"}}>
          <p><b>Name:</b> {user.fname} {user.lname}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Phone number:</b> {user.phonenumber}</p>
          {user.isAdmin ? <Tag className="cbtn" color="green">Admin Access</Tag> : ""}
          </div>
          </div>
        </TabPane>
        {user.isAdmin ? "" : <TabPane tab="Bookings" key="2">
          <MyBookings />
        </TabPane>}
        
      </Tabs>
    </div>
  );
}

export default Profilescreen;

export function MyBookings() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(async () => {
    try {
      setLoading(true);
      const data = await (
        await axios.post("/api/bookings/getbookingsbyuserid", {
          userid: user._id,
        })
      ).data;
      console.log(data);
      setBookings(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  }, []);

 async function cancelBooking(bookingid, userid){

      try {
          setLoading(true)
          const result = await ( await axios.post("/api/bookings/cancelbooking", {bookingid:bookingid , userid:user._id}))
          setLoading(false)
          Swal.fire("", "Your service has been cancelled", "success").then(result=>{
            window.location.href='/profile'})
      } catch(error) {
        Swal.fire('Oops' , 'Something went wrong' , 'error').then(result=>{
            window.location.href='/profile'})
          setLoading(false)
      }
  }

  return (
    <div>
      <div className="row" >
        <div className="col-md-4" >
            {loading && (<Loader />)} 
            {bookings && (bookings.map(booking=>{
            return <div className="ml-2 mr-2 mb-2 mt-2 bs" style={{backgroundColor:"white"}}>
                <p><b>Booking number: </b>{booking._id}</p>
                <p><b>Booking time:</b> {booking.slot}</p>
                <p><b>Vehicle:</b> {booking.vehicle}</p>
                <p><b>Make:</b> {booking.make}</p>
                <p><b>Model:</b> {booking.model}</p>
                <p><b>Engine:</b> {booking.engine}</p>
                <p><b>Service:</b> {booking.service}</p>
                <p><b>Booking status:</b> {booking.status =='booked' ? (<Tag className="cbtn" color="green">CONFIRMED</Tag>) : (<Tag color="red">CANCELLED</Tag>)}</p>
                
                <div className="text-right">
                {booking.status=='booked' && (<button className='btn btn-primary' onClick={()=>cancelBooking(booking._id , booking.userid)}>Cancel Booking</button>)}
                </div>
            </div>
            }))}
        </div>
      </div>
    </div>
  );
}
