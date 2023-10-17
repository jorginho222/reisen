import {ConveyanceRequest} from "./ConveyanceRequest.ts";

export interface CarRentalRequest extends ConveyanceRequest {
  pickUp: Date,
  devolution: Date,
  place: string,
  fuelCost?: number,
}