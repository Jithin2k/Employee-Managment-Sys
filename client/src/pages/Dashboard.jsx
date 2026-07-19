import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [status, setStatus] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("asc");

  const navigate = useNavigate();
  // get all employees
  const fetchUsers = async () => {
    try {
      const res = await API.get(
        `/user/employees?page=${page}&search=${search}&department=${department}&status=${status}&sortBy=${sortBy}&order=${order}`,
      );
      setUsers(res.data.users);
      setTotalUsers(res.data.totalUsers);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure?");
    if (!confirmDelete) return;

    try {
      await API.delete(`/user/employees/${id}`);
      toast.success("Employee Deleted")
      fetchUsers();
    } catch (error) {
      console.log(error);
      toast.error("Deletion Failed")
    }
  };


  useEffect(() => {
    fetchUsers();
  }, [page, search, department, status, sortBy, order]);

  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-fuchsia-900">Employee Dashboard</h2>
        <button
          onClick={() => navigate("/add")}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
        >
          + Add Employee
        </button>
      </div>
      {/* Total Employees,Active and Departments */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6 sm:my-8 md:my-12">
        <div className="bg-orange-500 text-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Total Employees</h3>
          <p className="text-2xl font-bold">{totalUsers}</p>
        </div>
        <div className="bg-teal-500 text-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Active Employees</h3>
          <p className="text-2xl font-bold">
            {users.filter((u) => u.status === "Active").length}
          </p>
        </div>
        <div className="bg-purple-500 text-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Total Department</h3>
          <p className="text-2xl font-bold">
            {[...new Set(users.map((u) => u.department))].length}
          </p>
        </div>
      </div>

      {/* Employee table */}
      <div className="overflow-x-auto  rounded">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <input
            type="text"
            placeholder="Search name or email"
            value={search}
            onChange={(e) =>{ setSearch(e.target.value);setPage(1)}}
            className="border p-2 text:sm sm:text-base rounded my-4 w-full sm:w-1/4"
          />
          <select
            className="border p-2 text:sm sm:text-base rounded my-4 w-full sm:w-1/4"
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="">All Departments</option>
            <option value="IT">IT</option>
            <option value="MECH">MECH</option>
            <option value="EC">EC</option>
            <option value="EEE">EEE</option>
            <option value="AI">AI</option>
          </select>
          <select
            className="border p-2 text:sm sm:text-base rounded my-4 w-full sm:w-1/4"
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <select
            className="border p-2 text:sm sm:text-base rounded my-4 w-full sm:w-1/4"
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="name">Name</option>
            <option value="salary">Salary</option>
          </select>

          <select
            className="border p-2 text:sm sm:text-base rounded my-4 w-full sm:w-1/4"
            onChange={(e) => setOrder(e.target.value)}
          >
            <option value="">Salary</option>
            <option value="asc">Low-High</option>
            <option value="desc">High-Low</option>
          </select>
        </div>
        <table className="w-full  border-2  border-blue-400">
          {/* Headings */}
          <thead>
            <tr className="bg-blue-400 text-center text-white">
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Department</th>
              <th className="p-2">Salary</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>

          {/* Table Contents */}
          <tbody className="text-center">
            {users.map((user) => (
              <tr key={user._id} className="border-t hover:bg-gray-200 ">
                <td className="p-2 py-4 font-semibold">{user.name}</td>
                <td className="p-2 py-4 font-semibold">{user.email}</td>
                <td className="p-2 py-4 font-semibold">{user.department}</td>
                <td className="p-2 py-4 font-semibold">{user.salary}</td>
                <td className="p-2 py-4 font-semibold">
                  <span
                    className={`px-2 py-2 rounded text-white ${user.status === "Active" ? "bg-green-500" : "bg-red-500"}`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="p-2 py-4">
                  <div className="flex gap-2 justify-center">
                    <button onClick={()=>navigate(`/view/${user._id}`)} className="bg-blue-500 text-white px-2 py-1 rounded text-sm">
                      View
                    </button>
                    <button
                      onClick={() => navigate(`/edit/${user._id}`)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6 sm:my-8 gap-3 text-sm sm:text:base">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 rounded font-medium disabled:opacity-50"
        >
          Prev
        </button>
        <span className="font-semibold">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className="px-4 py-2 font-medium bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
