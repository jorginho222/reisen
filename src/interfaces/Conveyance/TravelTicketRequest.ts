import {BaseConveyanceRequest} from "./BaseConveyanceRequest.ts";
import {ConveyanceMediaTypes} from "../../types/conveyance/conveyanceMediaTypes.ts";

export interface TravelTicketRequest extends BaseConveyanceRequest {
  media: ConveyanceMediaTypes,
  origin: string,
  destiny: string,
  pickUp: Date,
  arrival: Date,
}