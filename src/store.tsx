import {create} from "zustand";
import {BookingRequest} from "./interfaces/BookingRequest.ts";

export const useBooking = create<{
  bookings: BookingRequest[],
  addBooking: (booking: BookingRequest) => void,
  updateBooking: (booking: BookingRequest, index: number) => void
}>((set, get) => ({
  bookings: [],
  addBooking: async booking => {
    try {
      // await fetch('')
      set({
        bookings: [...get().bookings, booking].sort((a, b) => new Date(a.checkIn) - new Date(b.checkIn)),
      })
    } catch (err) {

    }
  },
  updateBooking: async (booking, index) => {
    try {
      // await fetch('')
      const bookingList = get().bookings
      bookingList[index] = booking
      set({
        bookings: bookingList
      })
    } catch (err) {

    }
  }
}))

