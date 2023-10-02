import {HousingTypes} from "../../types/booking/HousingTypes.ts";
import {PaymentOptions} from "../../types/booking/PaymentOptions.ts";

export interface BookingRequest {
  id: string,
  name: string,
  place: string,
  origin: string,
  checkIn: Date,
  checkOut: Date,
  housingType: HousingTypes,
  paymentOption: PaymentOptions,
  totalAmount: number,
  signedAmount?: number,
}