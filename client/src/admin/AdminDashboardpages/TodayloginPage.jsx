

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { todayLoginUser } from '../../features/auth/AuthSlice';

const TodayloginPage = () => {
  const dispatch = useDispatch();
  const { todayLoginUsers, loading, error } = useSelector((state) => state.auth);
  
  localStorage.setItem('todayLoginUsers', JSON.stringify(todayLoginUsers));

  // Fetch the users on component mount
  useEffect(() => {
    dispatch(todayLoginUser());
  }, [dispatch]);

  // Handle loading and error states
  if (loading) {
    return (
      <div className="container mx-auto p-4 card-body-main">
        <div className="flex justify-center items-center min-h-64">
          <div className="text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 card-body-main">
        <div className="flex justify-center items-center min-h-64">
          <div className="text-red-500 text-lg">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 card-body-main">
      {todayLoginUsers && todayLoginUsers.length > 0 ? (
        <>
          <h1 className="text-2xl font-semibold mb-4">Users Who Logged in Today</h1>
          
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
              <thead>
                <tr>
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-500 bg-gray-100">Name</th>
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-500 bg-gray-100">Email</th>
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-500 bg-gray-100">Mobile Number</th>
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-500 bg-gray-100">Role</th>
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-500 bg-gray-100">Last Login</th>
                </tr>
              </thead>
              <tbody>
                {todayLoginUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="py-3 px-6 text-sm text-gray-700">
                      {`${user.firstName || ''} ${user.lastName || ''}`.trim() || 'N/A'}
                    </td>
                    <td className="py-3 px-6 text-sm text-gray-700">{user.email || 'N/A'}</td>
                    <td className="py-3 px-6 text-sm text-gray-700">{user.mobileNumber || 'N/A'}</td>
                    <td className="py-3 px-6 text-sm text-gray-700">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.role === 'admin' 
                          ? 'bg-red-100 text-red-800' 
                          : user.role === 'user'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {user.role || 'N/A'}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-sm text-gray-700">
                      {user.lastLogin 
                        ? new Date(user.lastLogin).toLocaleString('en-IN', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true
                          })
                        : 'N/A'
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Total count */}
          <div className="mt-4 text-sm text-gray-600">
            Total users logged in today: <span className="font-semibold">{todayLoginUsers.length}</span>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-64">
          <div className="text-center">
            <svg 
              className="mx-auto h-16 w-16 text-gray-400 mb-4" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1} 
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" 
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No users logged in today</h3>
            <p className="text-gray-500">Check back later to see today's login activity.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodayloginPage;