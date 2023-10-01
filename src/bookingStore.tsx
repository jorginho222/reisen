import {create} from "zustand";
import {BookingRequest} from "./interfaces/BookingRequest.ts";

export const useBooking = create<{
  bookings: BookingRequest[],
  addBooking: (booking: BookingRequest) => void,
  updateBooking: (booking: BookingRequest, index: number) => void,
  removeBooking: (booking: BookingRequest, index: number) => void,
}>((set, get) => ({
  bookings: [],
  addBooking: async booking => {
    try {
      // await fetch('')
      set({
        bookings: [...get().bookings, booking].sort((a, b) => a.checkIn.getTime() - b.checkIn.getTime()),
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
        bookings: [...bookingList]
      })
    } catch (err) {

    }
  },
  removeBooking: async (booking, index) => {
    try {
      // await fetch('')
      const bookingList = get().bookings
      bookingList.splice(index, 1)
      set({
        bookings: [...bookingList]
      })
    } catch (err) {

    }
  }
}))

