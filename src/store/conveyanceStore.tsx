import {create} from "zustand";
import {ConveyanceRequest} from "../interfaces/Conveyance/ConveyanceRequest.ts";
import {OwnVehicleRequest} from "../interfaces/Conveyance/OwnVehicleRequest.ts";
import {CarRentalRequest} from "../interfaces/Conveyance/CarRentalRequest.ts";
import {TravelTicketRequest} from "../interfaces/Conveyance/TravelTicketRequest.ts";

export const useConveyance = create<{
  ownVehicleConveyances: OwnVehicleRequest[],
  carRentalConveyances: CarRentalRequest[],
  ticketConveyances: TravelTicketRequest[],

  addOwnVehicleConveyance: (conveyance: OwnVehicleRequest) => void,
  addCarRentalConveyance: (conveyance: CarRentalRequest) => void,
  addTicketConveyance: (conveyance: TravelTicketRequest) => void,
  updateOwnVehicleConveyance: (conveyance: OwnVehicleRequest, index: number) => void
  updateCarRentalConveyance: (conveyance: CarRentalRequest, index: number) => void
  updateTicketConveyance: (conveyance: TravelTicketRequest, index: number) => void
  removeOwnVehicleConveyance: (conveyance: OwnVehicleRequest, index: number) => void
  removeCarRentalConveyance: (conveyance: CarRentalRequest, index: number) => void
  removeTicketConveyance: (conveyance: TravelTicketRequest, index: number) => void
}>((set, get) => ({
  ownVehicleConveyances: [],
  carRentalConveyances: [],
  ticketConveyances: [],

  addOwnVehicleConveyance: async conveyance => {
    // await fetch()
    set({
      ownVehicleConveyances: [...get().ownVehicleConveyances, conveyance]
    })
  },
  addCarRentalConveyance: async conveyance => {
    set({
      carRentalConveyances: [...get().carRentalConveyances, conveyance]
    })
  },
  addTicketConveyance: async conveyance => {
    set({
      ticketConveyances: [...get().ticketConveyances, conveyance]
    })
  },

  updateOwnVehicleConveyance: async (conveyance, index) => {
    // await fetch()

  },
  updateCarRentalConveyance: async (conveyance, index) => {
    // await fetch()

  },
  updateTicketConveyance: async (conveyance, index) => {
    // await fetch()

  },

  removeConveyance: async (conveyance, index) => {
    // await fetch()

  }
}))