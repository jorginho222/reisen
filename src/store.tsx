import {create} from "zustand";
import {BookingRequest} from "./interfaces/BookingRequest.ts";

export const useBooking = create<{
  bookings: BookingRequest[],
  addBooking: (booking: BookingRequest) => void,
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
  }
}))

