import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCities, deleteCity, addCity, updateCity } from "../../features/city/citiesSlice";
import { motion, AnimatePresence } from "framer-motion";
import { FaCity } from "react-icons/fa";
import { AiOutlineEdit, AiOutlineDelete, AiOutlinePlus, AiOutlineArrowLeft } from "react-icons/ai";
import { toast } from "react-toastify";

const CityManager = () => {
  const dispatch = useDispatch();
  const { cities, status, error } = useSelector((state) => state.cities);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");

  useEffect(() => {
    dispatch(fetchCities());
  }, [dispatch]);

  const handleAddCity = (e) => {
    e.preventDefault();
    if (name.trim()) {
      dispatch(addCity({ name }));
      setName("");
      setShowForm(false);
      toast.success("City added successfully!");
      dispatch(fetchCities());
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteCity(id));
    toast.info("City deleted successfully!");
    dispatch(fetchCities());
  };

  const handleEdit = (city) => {
    setEditId(city._id);
    setEditName(city.name);
  };
  const handleUpdate = () => {
      if (editName.trim()) {
        dispatch(updateCity({ id: editId, name: editName }));
        setEditId(null);
        toast.info("city updated successfully!");
        dispatch(fetchCities());
      }
    };

  return (
    <div className="max-w-3xl mx-auto  bg-white rounded-lg shadow-md card-body-main  min-h-52">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <FaCity /> {showForm ? "Add New City" : "Cities List"}
        </h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-1 px-4 py-2 bg-primary text-white rounded shadow-md hover:bg-secondary transition"
        >
          {showForm ? <AiOutlineArrowLeft size={20} /> : <AiOutlinePlus size={20} />}
          {showForm ? "Back to List" : "Add City"}
        </button>
      </div>

      <AnimatePresence>
        {showForm ? (
          <motion.form
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onSubmit={handleAddCity}
            className="flex gap-2"
          >
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter city name"
              className="border p-2 flex-grow rounded"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded shadow-md hover:bg-secondary transition"
            >
              Add
            </button>
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            {status === "loading" ? (
              <p className="text-center text-lg font-semibold">Loading...</p>
            ) : status === "failed" ? (
              <p className="text-center text-red-500">Error: {error || "Something went wrong!"}</p>
            ) : (
              <table className="w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2">City Name</th>
                    <th className="border p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cities.map((city) => (
                    <motion.tr
                      key={city._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="hover:bg-gray-50 transition"
                    >
                      <td className="border p-2 text-center">{city.name}</td>
                      <td className="border p-2 flex justify-center gap-2">
                        <button className="text-red-500" onClick={() => handleDelete(city._id)}>
                          <AiOutlineDelete size={20} />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CityManager;
