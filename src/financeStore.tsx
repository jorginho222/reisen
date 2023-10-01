import {create} from "zustand";
import {ModuleTotals} from "./interfaces/moduleTotals.ts";
import {ModuleTypes} from "./types/ModuleTypes.ts";

export const useFinance = create<{
  grandTotal: number,
  noPaidTotal: number,
  paidTotal: number,
  updateTotals: (grandTotal: number, noPaidTotal: number, paidTotal: number) => void
}>((set, get) => ({
  grandTotal: 0,
  noPaidTotal: 0,
  paidTotal: 0,
  updateTotals: (moduleTotals: ModuleTotals) => {
    let bookingTotal, bookingNoPaid, bookingPaid: number

    switch (moduleTotals.module) {
      case ModuleTypes.Booking:
        bookingTotal = moduleTotals.total
        bookingNoPaid = moduleTotals.noPaid
        bookingPaid = moduleTotals.paid
        break
    }

    set({
      grandTotal: bookingTotal,
      noPaidTotal: bookingNoPaid,
      paidTotal: bookingPaid
    })
  }
}))