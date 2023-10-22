import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Box, Button, InputAdornment, InputLabel, TextField, Typography} from "@mui/material";
import React from "react";
interface CarRentalFormProps {
  resetIndex: (index: number) => void,
  index: number,
}

export function CarRentalForm({resetIndex, index}: CarRentalFormProps) {
  return (
    <>
      <Box
        sx={{
          '& .MuiTextField-root': { m: 1, width: '80ch', mt: 2 },
        }}
      >
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
          placeholder="Lugar retiro"
          {...register('place')}
          error={!!errors.place}
        />
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
      </Box>

      <Box sx={{my: 2}}>
        <Button
          type="submit"
          color="success"
          variant="outlined"
        >
          Guardar
        </Button>
      </Box>
    </>
  );
}