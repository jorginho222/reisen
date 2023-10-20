export interface BaseConveyanceRequest {
  id: string,
  type: string,
  totalAmount: number,
  partialAmount?: number
}