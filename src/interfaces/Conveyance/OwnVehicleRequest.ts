import {ConveyanceRequest} from "./ConveyanceRequest.ts";

export interface OwnVehicleRequest extends ConveyanceRequest {
  origin: string,
  destiny: string,
  departure: Date,
  arrival: Date,
}