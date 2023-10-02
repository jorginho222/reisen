import {create} from "zustand";
import {ModuleTotals} from "../interfaces/ModuleTotals.ts";
import {ModuleTypes} from "../types/booking/ModuleTypes.ts";

export const useFinance = create<{
  total: number,
  noPaid: number,
  paid: number,
  bookingTotal: number,
  bookingNoPaid: number,
  bookingPaid: number,
  updateTotals: (moduleTotals: ModuleTotals) => void
}>((set, get) => ({
  total: 0,
  noPaid: 0,
  paid: 0,
  bookingTotal: 0,
  bookingNoPaid: 0,
  bookingPaid: 0,

  updateTotals: (moduleTotals) => {
    switch (moduleTotals.module) {
      case ModuleTypes.Booking:
        set({
          bookingTotal: moduleTotals.total,
          bookingNoPaid: moduleTotals.noPaid,
          bookingPaid: moduleTotals.paid,
        })
        break
    }

    set({
      total: get().bookingTotal,
      noPaid: get().bookingNoPaid,
      paid: get().bookingPaid
    })
  }
}))