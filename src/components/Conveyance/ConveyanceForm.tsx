import {FormControl, InputLabel, MenuItem, Select, Typography} from "@mui/material";
import {ConveyanceTypes} from "../../types/conveyance/ConveyanceTypes.ts";
import {UseFormRegister} from "react-hook-form/dist/types/form";
import {FieldErrors} from "react-hook-form/dist/types/errors";
import {useState} from "react";
import {TicketForm} from "./TicketForm.tsx";
import {OwnVehicleForm} from "./OwnVehicleForm.tsx";
import {CarRentalForm} from "./CarRentalForm.tsx";

export interface ConveyanceFormProps {
  register: UseFormRegister<TFieldValues>,
  errors: FieldErrors<TFieldValues>,
  setConveyanceType: (conveyanceType: ConveyanceTypes) => void
}

export function ConveyanceForm({register, errors, setConveyanceType}: ConveyanceFormProps) {
  const conveyanceTypes = [
    {text: 'Pasaje', value: ConveyanceTypes.Ticket},
    {text: 'Alquiler de Auto', value: ConveyanceTypes.CarRental},
    {text: 'Vehiculo propio', value: ConveyanceTypes.OwnVehicle},
  ]
  const [selectedConveyanceType, setSelectedConveyanceType] = useState<ConveyanceTypes>()

  return (
    <>
        <FormControl sx={{m: 1, minWidth: 300}}>
          <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            defaultValue=""
            {...register('type')}
            onChange={(event) => {
              // @ts-ignore
              setSelectedConveyanceType(event.target.value)
              setConveyanceType(selectedConveyanceType)
            }}
            error={!!errors.type}
          >
            {conveyanceTypes.map(option => (
                <MenuItem key={option.value} value={option.value}>{option.text}</MenuItem>
              )
            )}
          </Select>
          <Typography variant="inherit" color="textSecondary">
            {errors.paymentOption?.message}
          </Typography>
        </FormControl>
        {
          (() => {
            switch (selectedConveyanceType) {
              case ConveyanceTypes.Ticket:
                return <TicketForm register={register} errors={errors} />

              case ConveyanceTypes.OwnVehicle:
                return <OwnVehicleForm register={register} errors={errors} />

              case ConveyanceTypes.CarRental:
                return <CarRentalForm register={register} errors={errors} />
            }
          })()
        }
    </>
  );
}