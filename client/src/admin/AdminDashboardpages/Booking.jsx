import React from 'react'
import BookingList from "./BookingList";
import CreateBooking from "./CreateBooking";

const Booking = () => {
  return (
    <div className='card-body-main min-h-screen'>
        <CreateBooking />
        <BookingList />
    </div>
  )
}

export default Booking