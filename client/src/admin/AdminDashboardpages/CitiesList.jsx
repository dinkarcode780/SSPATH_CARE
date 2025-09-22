import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCities, deleteCity, updateCity } from "../../features/city/citiesSlice";
import { FaCity } from "react-icons/fa";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

const CitiesList = () => {
  const dispatch = useDispatch();
  const { cities, status, error } = useSelector((state) => state.cities);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");

  useEffect(() => {
    dispatch(fetchCities());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteCity(id));
  };

  const handleEdit = (city) => {
    setEditId(city._id);
    setEditName(city.name);
  };

  const handleUpdate = () => {
    if (editName.trim()) {
      dispatch(updateCity({ id: editId, name: editName }));
      setEditId(null);
    }
  };

  if (status === "loading") return <p className="text-center text-lg font-semibold">Loading...</p>;
  if (status === "failed") return <p className="text-center text-red-500">Error: {error || "Something went wrong!"}</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold flex items-center gap-2"><FaCity /> Cities List</h2>
      {cities.length === 0 ? (
        <p className="text-gray-500 text-center mt-4">No cities found. Add a new city!</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {cities.map((city) => (
            <li key={city._id} className="flex justify-between items-center bg-gray-100 p-3 rounded">
              {editId === city._id ? (
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="border p-1 rounded flex-grow"
                />
              ) : (
                <span className="text-lg font-medium">{city.name}</span>
              )}
              <div className="flex gap-2">
                {editId === city._id ? (
                  <button onClick={handleUpdate} className="bg-green-500 text-white px-3 py-1 rounded">Save</button>
                ) : (
                  <button onClick={() => handleEdit(city)} className="text-blue-500">
                    <AiOutlineEdit size={20} />
                  </button>
                )}
                <button onClick={() => handleDelete(city._id)} className="text-red-500">
                  <AiOutlineDelete size={20} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CitiesList;
