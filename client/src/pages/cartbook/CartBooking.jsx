import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserBookings, cancelBooking } from "../../features/cartbooking/cartBookingSlice";

const CartBooking = () => {
  const dispatch = useDispatch();
  const { bookings, status, error } = useSelector((state) => state.cartBooking);

  useEffect(() => {
    dispatch(fetchUserBookings());
  }, [dispatch]);

  const handleCancelBooking = (bookingId) => {
    dispatch(cancelBooking(bookingId));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Cart Bookings</h2>

      {status === "loading" && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {bookings.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="py-2 px-4 border-b">Items</th>
                <th className="py-2 px-4 border-b">Quantity</th>
                <th className="py-2 px-4 border-b">Price</th>
                <th className="py-2 px-4 border-b">Total Amount</th>
                <th className="py-2 px-4 border-b">Status</th>
                {/* <th className="py-2 px-4 border-b">Actions</th> */}
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">
                    {booking && booking?.items.map((item, index) => (
                      <div key={item?._id} className="flex items-center">
                        {index > 0 && <div  />}
                        {item?.itemId?.name || "name is not present"}
                      </div>
                    ))}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {booking?.items.map((item, index) => (
                      <div key={item._id} className="flex items-center">
                        {index++ > 0 && <div  />}
                        {item?.quantity}
                      </div>
                    ))}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {booking?.items.map((item, index) => (
                      <div key={item._id} className="flex items-center">
                        {index > 0 && <div  />}
                        ₹{item?.itemId?.finalPrice.toFixed(2)  || "Price not available"}
                      </div>
                    ))}
                  </td>
                  <td className="py-2 px-4 border-b font-bold">
                    ₹{booking?.totalAmount.toFixed(2)}
                  </td>
                  <td className="py-2 px-4 border-b">{booking.status}</td>
                 
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