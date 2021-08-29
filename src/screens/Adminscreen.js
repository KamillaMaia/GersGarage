import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import axios from "axios";
import Loader from "../components/Loader";

const { TabPane } = Tabs;

function Adminscreen() {

    useEffect(()=> {
        if(!JSON.parse(localStorage.getItem("currentUser")).isAdmin){
            window.location.href="/home"
        }
    }, [])
  return (
    <div className="mt-3 ml-3 mr-3 bs" style={{backgroundColor:"white"}}>
      <h1>Admin Dashboard</h1>
      <Tabs defaultActiveKey="1">
        
        <TabPane tab="Bookings" key="1">
          <Bookings />
        </TabPane>
        <TabPane tab="Users" key="2">
          <Users />
        </TabPane>
        <TabPane tab="Invoices" key="3">
          <h5>Invoices</h5>
        </TabPane>
        <TabPane tab="Roster" key="4">
          <h5>Roster</h5>
        </TabPane>
      </Tabs>
    </div>
  );
}
export default Adminscreen;

export function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  useEffect(async () => {
    try {
      const data = await (await axios.get("/api/bookings/getallbookings")).data;
      setBookings(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  }, []);

  return (
    <div className="row">
      <div className="col-md-10">
        <h4>Bookings</h4>
        {loading && <Loader />}

        <table className="table table-bordered table-dark">
          <thead className="bs">
            <tr>
              <th>Booking ID</th>
              <th>User ID</th>
              <th>User Name</th>
              <th>Slot</th>
              <th>Vehicle</th>
              <th>Make</th>
              <th>Model</th>
              <th>Engine</th>
              <th>Service</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length &&
              bookings.map((booking) => {
                return (
                  <tr>
                    <td>{booking._id}</td>
                    <td>{booking.userid}</td>
                    <td>{booking.user}</td>
                    <td>{booking.slot}</td>
                    <td>{booking.vehicle}</td>
                    <td>{booking.make}</td>
                    <td>{booking.model}</td>
                    <td>{booking.engine}</td>
                    <td>{booking.service}</td>
                    <td>{booking.status}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>

        {bookings.length && (
          <p>*There are a total of {bookings.length} services booked.</p>
        )}
      </div>
    </div>
  );
}

export function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(async () => {
    try {
      const data = await (await axios.get("/api/users/getallusers")).data;
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  }, []);

  return (
    <div className="row">
      <div className="col-md-12">
        <h4>Users</h4>
        {loading && (<Loader />)}

        <table className="table table-bordered table-dark">

            <thead>
                <tr>
                    <th>User ID</th>
                    <th>Name</th>
                    <th>Phone Number</th>
                    <th>Email</th>
                    <th>Licence Number</th>
                    <th>Admin access</th>
                </tr>
            </thead>
            <tbody> {users && (users.map(user=> {
                return <tr>
                    <td>{user._id}</td>
                    <td>{user.fname} {user.lname}</td>
                    <td>{user.phonenumber}</td>
                    <td>{user.email}</td>
                    <td>{user.licencenumber}</td>
                    <td>{user.isAdmin ? "YES" : "NO"}</td>
                </tr>
            }))}
            </tbody>

        </table>
      </div>
    </div>
  );
}
