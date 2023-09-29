import {
  Box,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField, Typography
} from "@mui/material";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {PaymentOptions} from "../types/PaymentOptions.ts";
import {HousingTypes} from "../types/HousingTypes.ts";
import {useState} from "react";

interface BookingFormProps {
  register,
  errors,
}

export function BookingForm({ register, errors }: BookingFormProps) {

  const paymentOptions = [
    {text: 'Está Pago', value: PaymentOptions.Paid},
    {text: 'Pago en Hotel', value: PaymentOptions.NoPaid},
    {text: 'Con Seña', value: PaymentOptions.Signed}
  ]
  const housingTypes = [
    {text: 'Departamento', value: HousingTypes.Apartment},
    {text: 'Habitación', value: HousingTypes.Room},
    {text: 'Hostel', value: HousingTypes.Hostel}
  ]
  const [selectedPaymentOption, setSelectedPaymentOption] = useState<PaymentOptions>()

  return (
    <>
      <Box
        sx={{
          '& .MuiTextField-root': { m: 1, width: '80ch', mt: 2 },
        }}
      >
        <TextField
          id="outlined-multiline-flexible"
          placeholder="Nombre Lugar"
          {...register('name')}
          error={!!errors.name}
        />
        <Typography variant="inherit" color="textSecondary">
          {errors.name?.message}
        </Typography>
        <TextField
          id="outlined-multiline-flexible-2"
          placeholder="¿Donde queda?"
          {...register('place')}
          error={!!errors.place}
        />
        <Typography variant="inherit" color="textSecondary">
          {errors.place?.message}
        </Typography>
        <TextField
          id="outlined-multiline-flexible-2"
          placeholder="Medio de Reserva"
          {...register('origin')}
          error={!!errors.origin}
        />
        <Typography variant="inherit" color="textSecondary">
          {errors.origin?.message}
        </Typography>
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              defaultValue=""
              // value={dayjs(booking.checkIn)}
              label="Check In"
              {...register('checkIn', { valueAsDate: true })}
            />
            <DateTimePicker
              defaultValue=""
              // value={dayjs(booking.checkOut)}
              label="Check Out"
              {...register('checkOut', { valueAsDate: true })}
            />
          </LocalizationProvider>
        </div>
        <FormControl sx={{ m: 1, minWidth: 300 }}>
          <InputLabel id="demo-simple-select-label">Tipo Alojamiento</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            defaultValue=""
            label="Tipo Alojamiento"
            {...register('housingType')}
            error={!!errors.housingType}
          >
            {housingTypes.map(type => (
                <MenuItem key={type.value} value={type.value}>{type.text}</MenuItem>
              )
            )}
          </Select>
          <Typography variant="inherit" color="textSecondary">
            {errors.housingType?.message}
          </Typography>
        </FormControl>
        <FormControl sx={{m: 1, minWidth: 300}}>
          <InputLabel id="demo-simple-select-label">Opción de Pago</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Opción de Pago"
            defaultValue=""
            {...register('paymentOption')}
            onChange={(event) => {
              // @ts-ignore
              setSelectedPaymentOption(event.target.value)
            }}
            error={!!errors.paymentOption}
          >
            {paymentOptions.map(option => (
                <MenuItem key={option.value} value={option.value}>{option.text}</MenuItem>
              )
            )}
          </Select>
          <Typography variant="inherit" color="textSecondary">
            {errors.paymentOption?.message}
          </Typography>
        </FormControl>
        <div>
          {selectedPaymentOption === PaymentOptions.Signed && (
            <FormControl sx={{ m: 1 }}>
              <InputLabel id="demo-simple-select-label">Seña</InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                type="number"
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                label="Seña"
                {...register('signedAmount')}
              />
            </FormControl>
          )}
          <FormControl sx={{ m: 1 }}>
            <InputLabel id="demo-simple-select-label">{selectedPaymentOption === PaymentOptions.NoPaid ? 'Monto Aprox.' : 'Monto Total'}</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              type="number"
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              {...register('totalAmount')}
              error={!!errors.totalAmount}
            />
            <Typography variant="inherit" color="textSecondary">
              {errors.totalAmount?.message}
            </Typography>
          </FormControl>
        </div>
      </Box>
    </>
  );
};