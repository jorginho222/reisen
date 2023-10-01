import {ModuleTypes} from "../types/ModuleTypes.ts";

export interface ModuleTotals {
  module: ModuleTypes,
  total: number,
  noPaid: number,
  paid: number
}