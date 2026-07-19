import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import {toast} from "react-toastify"

const AddUser = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    salary: "",
    joiningDate: "",
    status: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/user/employees", form);
      navigate("/dashboard");
      toast.success("Employee Added")
    } catch (error) {
      console.log(error.response.data);
      toast.error("Failed to add enmployee")
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-full max-w-md flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-center ">Create Employee</h2>
        <input
          required
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="border p-2 rounded"
        />
        <input
          required
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="border p-2 rounded"
        />
        <input
          required
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="border p-2 rounded"
        />
        <input
          required
          name="department"
          value={form.department}
          onChange={handleChange}
          placeholder="Department"
          className="border p-2 rounded"
        />
        <input
          type="date"
          name="joiningDate"
          value={form.joiningDate}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          required
          name="salary"
          value={form.salary}
          onChange={handleChange}
          placeholder="Salary"
          className="border p-2 rounded"
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">Select Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <button className="bg-green-500 text-white font-semibold py-2 rounded cursor-pointer">
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default AddUser;
