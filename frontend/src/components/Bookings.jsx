import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Bookings = ({ enquiry }) => {
  const [userInfo, setUserInfo] = useState(null);

  const fetchUserDetails = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:7000/api/users/getUser/${userId}`
      );
      console.log(response.data);
      setUserInfo(response.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
      return null;
    }
  };

  useEffect(() => {
    fetchUserDetails(enquiry?.user);
  }, []);
  const acceptBooking = async () => {
    try {
      const res = await axios.put(
        "http://localhost:7000/api/users/updateBooking",
        {
          bookingId: enquiry._id,
        }
      );
      console.log();
      toast.success("Appointment booked successfully.");
    } catch (error) {
      console.log(error);
      toast.error("Failed to book appointment.");
    }
  };
  console.log(enquiry.isAccept);

  return (
    <div
      key={enquiry._id}
      className="bg-[#eee] cursor-pointer px-4 py-4 rounded-md shadow-md hover:scale-105 delay-150 transition-transform flex items-center justify-between"
    >
      <div className="flex flex-col">
        <h1 className="text-lg font-semibold">
          <span className="text-[#25316D]">{userInfo?.name}</span>
        </h1>
        <h1>{enquiry.time}</h1>
      </div>
{enquiry?.isAccept?(<>
<h1 className="bg-green-500 text-white px-2 rounded shadow shadow-black">Accepted</h1></>):(
      <button
        className="bg-green-500 text-white px-2 rounded shadow shadow-black"
        onClick={acceptBooking}
      >
        Accept
      </button>)}
    </div>
  );
};

export default Bookings;
