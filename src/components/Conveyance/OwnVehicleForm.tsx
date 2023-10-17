import {ConveyanceFormProps} from "./ConveyanceForm.tsx";
import {Box, FormControl, InputLabel, MenuItem, Select, TextField, Typography} from "@mui/material";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

export function OwnVehicleForm({register, errors}: ConveyanceFormProps) {

  return (
    <>
      <Box
        sx={{
          '& .MuiTextField-root': { m: 1, width: '80ch', mt: 2 },
        }}
      >
        <TextField
          id="outlined-multiline-flexible-2"
          placeholder="Lugar salida"
          {...register('origin')}
          error={!!errors.origin}
        />
        <TextField
          id="outlined-multiline-flexible-2"
          placeholder="Lugar llegada"
          {...register('destiny')}
          error={!!errors.origin}
        />
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              defaultValue=""
              // value={dayjs(booking.checkIn)}
              label="Fecha Salida"
              {...register('departure', { valueAsDate: true })}
            />
            <DateTimePicker
              defaultValue=""
              // value={dayjs(booking.checkOut)}
              label="Fecha Llegada"
              {...register('arrival', { valueAsDate: true })}
            />
          </LocalizationProvider>
        </div>
        <TextField
          id="outlined-multiline-flexible-2"
          placeholder="Gastos combustible"
          {...register('totalAmount')}
          error={!!errors.totalAmount}
        />
      </Box>
    </>
  );
}