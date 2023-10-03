import {Box, FormControl, InputLabel, MenuItem, Select, TextField, Typography} from "@mui/material";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {ConveyanceFormProps} from "./ConveyanceForm.tsx";
import {ConveyanceMediaTypes} from "../../types/conveyance/conveyanceMediaTypes.ts";
import {useState} from "react";

export function TicketForm({register, errors}: ConveyanceFormProps) {
  const mediaTypes = [
    {text: 'Micro', value: ConveyanceMediaTypes.Bus},
    {text: 'Vuelo', value: ConveyanceMediaTypes.Flight},
    {text: 'Barco', value: ConveyanceMediaTypes.Ship},
  ]
  const [selectedMediaType, setSelectedMediaType] = useState<ConveyanceMediaTypes>()

  return (
    <>
      <Box
        sx={{
          '& .MuiTextField-root': { m: 1, width: '80ch', mt: 2 },
        }}
      >
        <div>
          <FormControl sx={{m: 1, minWidth: 300}}>
            <InputLabel id="demo-simple-select-label">Medio</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue=""
              {...register('media')}
              onChange={(event) => {
                // @ts-ignore
                setSelectedMediaType(event.target.value)
              }}
              error={!!errors.media}
            >
              {mediaTypes.map(option => (
                  <MenuItem key={option.value} value={option.value}>{option.text}</MenuItem>
                )
              )}
            </Select>
            <Typography variant="inherit" color="textSecondary">
              {errors.media?.message}
            </Typography>
          </FormControl>
        </div>

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
              {...register('pickUp', { valueAsDate: true })}
            />
            <DateTimePicker
              defaultValue=""
              // value={dayjs(booking.checkOut)}
              label="Fecha Llegada"
              {...register('arrival', { valueAsDate: true })}
            />
          </LocalizationProvider>
        </div>
      </Box>
    </>
  );
}