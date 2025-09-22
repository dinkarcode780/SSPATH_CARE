import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchallUserBookings, updateBookingStatus } from "../../features/cartbooking/cartBookingSlice";
import { toast } from "react-toastify";

const CartBooking = () => {
  const dispatch = useDispatch();
  const { bookings, status, error } = useSelector((state) => state.cartBooking);
  console.log(bookings);


  useEffect(() => {
    dispatch(fetchallUserBookings());
  }, [dispatch]);

  const handleUpdateBooking = async (bookingId, newStatus) => {
    dispatch(updateBookingStatus({ bookingId, status: newStatus }));
    dispatch(fetchallUserBookings());
    toast.info(`Booking status updated to ${newStatus}`);
  };

  return (
    <div className="p-4 card-body-main">
      <h2 className="text-xl font-bold mb-4">Cart Bookings</h2>

      {status === "loading" && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {bookings.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-primary text-white">
                <th className="py-2 px-4 border-b">UserName</th>
                <th className="py-2 px-4 border-b">Items</th>
                <th className="py-2 px-4 border-b">Quantity</th>
                <th className="py-2 px-4 border-b">Price</th>
                <th className="py-2 px-4 border-b">Total Amount</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{booking?.userId?.firstName}</td>
                  <td className="py-2 px-4 border-b">
                    {booking?.items.map((item, index) => (
                      <div key={item._id} className="flex items-center">
                        {index > 0 && <div />}
                        {item?.itemId?.name}
                      </div>
                    ))}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {booking.items.map((item, index) => (
                      <div key={item._id} className="flex items-center">
                        {index++ > 0 && <div />}
                        {item.quantity}
                      </div>
                    ))}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {booking.items.map((item, index) => (
                      <div key={item._id} className="flex items-center">
                        {index > 0 && <div />}

                        {/* {item?.itemId?.finalPrice ? `₹${item?.itemId?.finalPrice.toFixed(2)}` : `₹${item?.itemId?.Price.toFixed(2)}` } */}
                        {item?.itemId?.finalPrice && typeof item.itemId.finalPrice === 'number'
                          ? `₹${item.itemId.finalPrice.toFixed(2)}`
                          : item?.itemId?.Price && typeof item.itemId.Price === 'number'
                            ? `₹${item.itemId.Price.toFixed(2)}`
                            : '₹0.00'
                        }
                      </div>
                    ))}
                  </td>
                  <td className="py-2 px-4 border-b font-bold">
                    {booking.totalAmount ? `₹${booking.totalAmount.toFixed(2)}` : 'N/A'}
                  </td>
                  <td className="py-2 px-4 border-b">{booking.status}</td>
                  <td className="border p-2">
                    <select
                      value={booking.status}
                      onChange={(e) => handleUpdateBooking(booking._id, e.target.value)}
                      className="bg-gray-200 p-1 rounded"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Cancelled">Cancelled</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CartBooking;