import {ConveyanceFormProps} from "./ConveyanceForm.tsx";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {TextField} from "@mui/material";

export function CarRentalForm({register, errors}: ConveyanceFormProps) {
  return (
    <>
      <div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            defaultValue=""
            // value={dayjs(booking.checkIn)}
            label="Fecha Retiro"
            {...register('pickUp', { valueAsDate: true })}
          />
          <DateTimePicker
            defaultValue=""
            // value={dayjs(booking.checkOut)}
            label="Fecha Devolución"
            {...register('devolution', { valueAsDate: true })}
          />
        </LocalizationProvider>
      </div>
      <TextField
        id="outlined-multiline-flexible-2"
        placeholder="Gastos combustible"
        {...register('fuelCost')}
        error={!!errors.fuelCost}
      />

    </>
  );
}