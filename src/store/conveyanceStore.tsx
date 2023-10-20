import {create} from "zustand";
import {ConveyanceRequest} from "../interfaces/Conveyance/ConveyanceRequest.ts";

export const useConveyance = create<{
  conveyanceList: ConveyanceRequest[],
  addConveyance: (conveyance: ConveyanceRequest) => void,
  updateConveyance: (conveyance: ConveyanceRequest, index: number) => void
  removeConveyance: (conveyance: ConveyanceRequest, index: number) => void
}>((set, get) => ({
  conveyanceList: [],
  addConveyance: async conveyance => {
    // await fetch()
    set({
      conveyanceList: [...get().conveyanceList, conveyance]
    })
  },
  updateConveyance: async (conveyance, index) => {

  },
  removeConveyance: async (conveyance, index) => {

  }
}))