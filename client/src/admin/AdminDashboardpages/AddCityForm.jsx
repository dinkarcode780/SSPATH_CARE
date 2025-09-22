import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCity } from "../../features/city/citiesSlice";

const AddCityForm = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.cities);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      dispatch(addCity({ name }));
      setName("");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-bold mb-2">Add New City</h2>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter city name"
          className="border p-2 flex-grow rounded"
        />
        <button
          type="submit"
          className={`px-4 py-2 rounded text-white ${
            status === "loading" ? "bg-gray-400" : "bg-blue-500"
          }`}
          disabled={status === "loading"}
        >
          {status === "loading" ? "Adding..." : "Add"}
        </button>
      </form>
    </div>
  );
};

export default AddCityForm;
