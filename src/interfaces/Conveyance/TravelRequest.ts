import {ConveyanceRequest} from "./ConveyanceRequest.ts";

export interface TravelRequest extends ConveyanceRequest {
  media: string,
  origin: string,
  destiny: string,
  pickUp: Date,
  arrival: Date,
}