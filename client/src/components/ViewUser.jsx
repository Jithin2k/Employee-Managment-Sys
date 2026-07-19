import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

const ViewUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState([]);

  const fetchUser = async () => {
    try {
      const res = await API.get(`/user/employees/${id}`);
      setUser(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 sm:p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Employee Details
          </h2>

          <button
            onClick={() => window.history.back()}
            className="text-sm sm:text-base bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
          >
            ← Back
          </button>
        </div>

        <div className="border-b mb-6"></div>

        {/* Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm sm:text-base">
          <div>
            <p className="text-gray-500">Name</p>
            <p className="font-semibold text-gray-800">{user.name}</p>
          </div>

          <div>
            <p className="text-gray-500">Email</p>
            <p className="font-semibold text-gray-800 break-all">
              {user.email}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Phone</p>
            <p className="font-semibold text-gray-800">{user.phone}</p>
          </div>

          <div>
            <p className="text-gray-500">Department</p>
            <p className="font-semibold text-gray-800">{user.department}</p>
          </div>

          <div>
            <p className="text-gray-500">Salary</p>
            <p className="font-semibold text-gray-800">₹ {user.salary}</p>
          </div>

          <div>
            <p className="text-gray-500">Joining Date</p>
            <p className="font-semibold text-gray-800">
              {new Date(user.joiningDate).toLocaleDateString()}
            </p>
          </div>

          <div className="sm:col-span-2">
            <p className="text-gray-500">Status</p>
            <span
              className={`inline-block mt-1 px-3 py-1 text-sm font-medium rounded-full text-white ${
                user.status === "Active" ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {user.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUser;
