import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    salary: "",
    status: "",
  });

  // 🔥 Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get(`/user/employees/${id}`);
        setForm(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [id]);

  // 🔥 Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 Update user
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/user/employees/${id}`, form);
      navigate("/dashboard");
      toast.success("Employee updated");
    } catch (error) {
      console.log(error);
      toast.error("Update Failed")
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-full max-w-md flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-center">Edit Employee</h2>

        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="border p-2 rounded" />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="border p-2 rounded" />
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="border p-2 rounded" />
        <input name="department" value={form.department} onChange={handleChange} placeholder="Department" className="border p-2 rounded" />
        <input name="salary" value={form.salary} onChange={handleChange} placeholder="Salary" className="border p-2 rounded" />

        <select name="status" value={form.status} onChange={handleChange} className="border p-2 rounded">
          <option value="">Select Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <button className="bg-blue-500 text-white py-2 rounded">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditUser;