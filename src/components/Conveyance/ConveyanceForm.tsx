import {FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography} from "@mui/material";
import {ConveyanceTypes} from "../../types/conveyance/ConveyanceTypes.ts";
import {UseFormRegister} from "react-hook-form/dist/types/form";
import {FieldErrors} from "react-hook-form/dist/types/errors";
import {useState} from "react";
import {TicketForm} from "./TicketForm.tsx";
import {OwnVehicleForm} from "./OwnVehicleForm.tsx";
import {CarRentalForm} from "./CarRentalForm.tsx";
interface ConveyanceFormProps {
  resetIndex: (index: number) => void,
  index: number,
}

export function ConveyanceForm({resetIndex, index}: ConveyanceFormProps) {
  const conveyanceTypes = [
    {text: 'Pasaje', value: ConveyanceTypes.Ticket},
    {text: 'Alquiler de Auto', value: ConveyanceTypes.CarRental},
    {text: 'Vehiculo propio', value: ConveyanceTypes.OwnVehicle},
  ]
  const [selectedConveyanceType, setSelectedConveyanceType] = useState<ConveyanceTypes>(ConveyanceTypes.Ticket)

  return (
    <>
      <FormControl sx={{m: 1, minWidth: 300}}>
        <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultValue=""
          label="Tipo"
          onChange={(event) => {
            // @ts-ignore
            setSelectedConveyanceType(event.target.value)
          }}
          error={!!errors.type}
        >
          {conveyanceTypes.map(option => (
              <MenuItem key={option.value} value={option.value}>{option.text}</MenuItem>
            )
          )}
        </Select>
        <Typography variant="inherit" color="textSecondary">
          {errors.type?.message}
        </Typography>
      </FormControl>
      {
        (() => {
          switch (selectedConveyanceType) {
            case ConveyanceTypes.Ticket:
              return <TicketForm register={register} errors={errors} />

            case ConveyanceTypes.OwnVehicle:
              return <OwnVehicleForm resetIndex={resetIndex} index={index} />

            case ConveyanceTypes.CarRental:
              return <CarRentalForm register={register} errors={errors} />
          }
        })()
      }
    </>
  );
}