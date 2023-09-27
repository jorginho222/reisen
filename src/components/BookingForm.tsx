import {
  Box,
  Button, Card,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField
} from "@mui/material";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, {name} from "dayjs";
import {PaymentOptions} from "../types/PaymentOptions.ts";
import {HousingTypes} from "../types/HousingTypes.ts";
import {useBooking} from "../store.tsx";
import {BookingRequest} from "../interfaces/BookingRequest.ts";
import {UseFormRegister, UseFormRegisterReturn} from "react-hook-form/dist/types/form";
import {FieldPath} from "react-hook-form";

interface BookingFormProps {
  register
}

export function BookingForm({ register }: BookingFormProps) {

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

  return (
    <>
      <Card  sx={{mt: 2}}>
        <Box
          sx={{
            '& .MuiTextField-root': { m: 1, width: '50ch', mt: 2 },
          }}
        >
          <TextField
            id="outlined-multiline-flexible"
            placeholder="Nombre Lugar"
            // onChange={(evt) => {
            //   setBooking({...booking, name: evt.target.value})
            // }}
            {...register('name')}
          />
          <TextField
            id="outlined-multiline-flexible-2"
            placeholder="¿Donde queda?"
            // onChange={(evt) => {
            //   setBooking({...booking, place: evt.target.value})
            // }}
            {...register('place')}
          />
          <TextField
            id="outlined-multiline-flexible-2"
            placeholder="Medio de Reserva"
            // value={booking.origin}
            // onChange={(evt) => {
            //   setBooking({...booking, origin: evt.target.value})
            // }}
            {...register('origin')}
          />
          <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                // value={dayjs(booking.checkIn)}
                label="Check In"
                // onChange={(evt) => {
                //   setBooking({...booking, checkIn: evt.$d})
                // }}
                {...register('checkIn', { valueAsDate: true})}
              />
              <DateTimePicker
                // value={dayjs(booking.checkOut)}
                label="Check Out"
                // onChange={(evt) => setBooking({...booking, checkOut: evt.$d})}
                {...register('checkOut', { valueAsDate: true})}
              />
            </LocalizationProvider>
          </div>
          <FormControl sx={{ m: 1, minWidth: 300 }}>
            <InputLabel id="demo-simple-select-label">Tipo Alojamiento</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={booking.housingType}
              // onChange={(e) => setBooking({...booking, housingType: e.target.value})}
              label="Tipo Alojamiento"
              {...register('housingType')}
            >
              {housingTypes.map(type => (
                  <MenuItem key={type.value} value={type.value}>{type.text}</MenuItem>
                )
              )}
            </Select>
          </FormControl>
          <FormControl sx={{m: 1, minWidth: 300}}>
            <InputLabel id="demo-simple-select-label">Opción de Pago</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={booking.paymentOption}
              // onChange={e => setBooking({...booking, paymentOption: e.target.value})}
              label="Opción de Pago"
              {...register('paymentOption')}
            >
              {paymentOptions.map(option => (
                  <MenuItem key={option.value} value={option.value}>{option.text}</MenuItem>
                )
              )}
            </Select>
          </FormControl>
          <div>
            {/*{booking.paymentOption === PaymentOptions.Signed && (*/}
            {/*  <FormControl sx={{ m: 1 }}>*/}
            {/*    <InputLabel id="demo-simple-select-label">Seña</InputLabel>*/}
            {/*    <OutlinedInput*/}
            {/*      id="outlined-adornment-amount"*/}
            {/*      // value={booking.signedAmount}*/}
            {/*      type="number"*/}
            {/*      startAdornment={<InputAdornment position="start">$</InputAdornment>}*/}
            {/*      label="Seña"*/}
            {/*      // onChange={(e) => setBooking({...booking, signedAmount: Number(e.target.value)})}*/}
            {/*      {...register('signedAmount')}*/}
            {/*    />*/}
            {/*  </FormControl>*/}
            {/*)}*/}
            <FormControl sx={{ m: 1 }}>
              {/*<InputLabel id="demo-simple-select-label">{booking.paymentOption === PaymentOptions.NoPaid ? 'Monto Aprox.' : 'Monto Total'}</InputLabel>*/}
              <OutlinedInput
                id="outlined-adornment-amount"
                // value={booking.totalAmount}
                type="number"
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                // label={booking.paymentOption === PaymentOptions.NoPaid ? 'Monto Aprox.' : 'Monto Total'}
                // onChange={(e) => setBooking({...booking, totalAmount: Number(e.target.value)})}
                {...register('totalAmount')}
              />
            </FormControl>
          </div>
        </Box>
      </Card>
    </>
  );
};