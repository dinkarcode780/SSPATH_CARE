// src/redux/slices/cartBookingSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchUserBookingsAPI,
  updateBookingStatusAPI,
  cancelBookingAPI,
  fetchallUserBookingsAPI,
  verifyPaymentAPI,
  createPaymentOrderAPI
} from "./cartBookingAPI";

const initialState = {
  bookings: [],
  status: "idle",
  error: null,
};

// ✅ create payment order
export const createPaymentOrder = createAsyncThunk(
  "cartBooking/createPaymentOrder", 
  async (amount, thunkAPI) => {
    try {
      return await createPaymentOrderAPI(amount);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);



// verify payment 
export const verifyPayment = createAsyncThunk(
  "cartBooking/verifyPayment", 
  async (data, thunkAPI) => {
    try {
      return await verifyPaymentAPI(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


// ✅ Fetch User Bookings
export const fetchUserBookings = createAsyncThunk("cartBooking/fetchUserBookings", async (_, thunkAPI) => {
  try {
    return await fetchUserBookingsAPI();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
export const fetchallUserBookings = createAsyncThunk("cartBooking/fetchallUserBookings", async (_, thunkAPI) => {
  try {
    return await fetchallUserBookingsAPI();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// ✅ Update Booking Status
export const updateBookingStatus = createAsyncThunk("cartBooking/updateBookingStatus", async ({ bookingId, status }, thunkAPI) => {
  try {
    return await updateBookingStatusAPI(bookingId, status);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// ✅ Cancel Booking
export const cancelBooking = createAsyncThunk("cartBooking/cancelBooking", async ({bookingId,status}, thunkAPI) => {
  try {
    return await cancelBookingAPI(bookingId,status);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const cartBookingSlice = createSlice({
  name: "cartBooking",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPaymentOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createPaymentOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bookings.push(action.payload.booking);
      })
      .addCase(createPaymentOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchUserBookings.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserBookings.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bookings = action.payload;
      })
      .addCase(fetchUserBookings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchallUserBookings.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bookings = action.payload;
      })
      .addCase(updateBookingStatus.fulfilled, (state, action) => {
        state.bookings = state.bookings.map((booking) =>
          booking._id === action.payload.booking._id ? action.payload.booking : booking
        );
      })
      .addCase(cancelBooking.fulfilled, (state, action) => {
        state.bookings = state.bookings.map((booking) =>
          booking._id === action.payload.booking._id ? action.payload.booking : booking
        );
      })
      
      .addCase(verifyPayment.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(verifyPayment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.paymentStatus = "success";
        state.bookings.push(action.payload); // booking result backend se
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.status = "failed";
        state.paymentStatus = "failed";
        state.error = action.payload;
      });
  },
});

export default cartBookingSlice.reducer;
