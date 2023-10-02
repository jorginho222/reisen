import {ModuleTypes} from "../types/booking/ModuleTypes.ts";

export interface ModuleTotals {
  module: ModuleTypes,
  total: number,
  noPaid: number,
  paid: number
}