import {BaseConveyanceRequest} from "./BaseConveyanceRequest.ts";

export interface OwnVehicleRequest extends BaseConveyanceRequest {
  origin: string,
  destiny: string,
  departure: Date,
  arrival: Date,
}