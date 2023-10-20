import {CarRentalRequest} from "./CarRentalRequest.ts";
import {OwnVehicleRequest} from "./OwnVehicleRequest.ts";
import {TravelTicketRequest} from "./TravelTicketRequest.ts";

export type ConveyanceRequest = CarRentalRequest & OwnVehicleRequest & TravelTicketRequest