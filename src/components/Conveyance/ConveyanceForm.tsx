import {FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography} from "@mui/material";
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
          {errors.type?.message}
        </Typography>
      </FormControl>
      {
        (() => {
          switch (selectedConveyanceType) {
            case ConveyanceTypes.Ticket:
              return <TicketForm register={register} errors={errors}  setConveyanceType={conveyanceType => {
                setConveyanceType(conveyanceType)
              }}/>

            case ConveyanceTypes.OwnVehicle:
              return <OwnVehicleForm register={register} errors={errors} setConveyanceType={conveyanceType => {
                setConveyanceType(conveyanceType)
              }} />

            case ConveyanceTypes.CarRental:
              return <CarRentalForm register={register} errors={errors} setConveyanceType={conveyanceType => {
                setConveyanceType(conveyanceType)
              }} />
          }
        })()
      }
      {selectedConveyanceType !== ConveyanceTypes.OwnVehicle && (
        <div>
          <InputLabel id="demo-simple-select-label">Total</InputLabel>
          <TextField
            id="outlined-multiline-flexible-2"
            type="number"
            defaultValue={0}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            {...register('totalAmount')}
            error={!!errors.totalAmount}
          />
          <Typography variant="inherit" color="textSecondary">
            {errors.totalAmount?.message}
          </Typography>
        </div>
      )}
    </>
  );
}