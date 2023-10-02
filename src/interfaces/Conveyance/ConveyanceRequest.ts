export interface ConveyanceRequest {
  id: string,
  type: string,
  totalAmount: number,
  partialAmount?: number
}