import {HousingTypes} from "../types/HousingTypes.ts";
import {PaymentOptions} from "../types/PaymentOptions.ts";

export interface BookingRequest {
  name: string,
  place: string,
  origin: string,
  checkIn: string,
  checkOut: string,
  housingType: HousingTypes,
  paymentOption: PaymentOptions,
  totalAmount: number,
  signedAmount?: number
}