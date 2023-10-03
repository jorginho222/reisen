import {ConveyanceRequest} from "./ConveyanceRequest.ts";
import {ConveyanceMediaTypes} from "../../types/conveyance/conveyanceMediaTypes.ts";

export interface TravelTicketRequest extends ConveyanceRequest {
  media: ConveyanceMediaTypes,
  origin: string,
  destiny: string,
  pickUp: Date,
  arrival: Date,
}