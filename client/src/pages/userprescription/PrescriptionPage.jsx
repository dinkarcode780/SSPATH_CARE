import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPrescriptions } from '../../features/prescription/prescriptionSlice';
import './PrescriptionPage.css';
import apiClient from '../Home/api/apiClient';
import DataTable from 'react-data-table-component';
import { toast } from 'react-toastify';

const PrescriptionPage = () => {
  const dispatch = useDispatch();
  const { prescriptions, loading, error } = useSelector((state) => state.prescription);
  console.log(prescriptions, "prescriptions");


  useEffect(() => {
    dispatch(fetchPrescriptions());
  }, [dispatch]);

  const columns = [
    {
      name: 'Name',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'City',
      selector: (row) => row.city,
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
    },
    {
      name: 'Phone',
      selector: (row) => row.phone,
    },
    {
      name: 'Status',
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: 'Message',
      selector: (row) => row.message || 'N/A',
    },
    {
      name: 'File',
      cell: (row) => (
        <img
          className="prescription-image"
          src={row.file} // Directly use row.file
          alt="Prescription"
          width={50}
          height={50}
          onError={(e) => (e.target.src = '/placeholder-image.png')} // Fallback image
        />
      ),
    },

    {
      name: 'Created At',
      selector: (row) => new Date(row.createdAt).toLocaleString(),
      sortable: true,
    },
  ];

  return (
    <div className="prescription-page">
      <h1>Your Prescriptions</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <DataTable
          columns={columns}
          data={prescriptions}
          pagination
          highlightOnHover
          striped
        />
      )}
    </div>
  );
};

export default PrescriptionPage;
