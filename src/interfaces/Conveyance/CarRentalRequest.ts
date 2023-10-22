import {BaseConveyanceRequest} from "./BaseConveyanceRequest.ts";

export interface CarRentalRequest extends BaseConveyanceRequest {
  pickUp: Date,
  devolution: Date,
  place: string,
}