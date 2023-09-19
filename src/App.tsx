import './App.css'
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField
} from "@mui/material";
import React, {useState} from "react";
import {PaymentOptions} from "./types/PaymentOptions.ts";
import {HousingTypes} from "./types/HousingTypes.ts";
import {BookingRequest} from "./interfaces/BookingRequest.ts";
import {useBooking} from "./store.tsx";

function App() {
  const [booking, setBooking] = useState<BookingRequest>({
    name: '',
    origin: '',
    checkIn: '',
    checkOut: '',
    housingType: HousingTypes.Room,
    paymentOption: PaymentOptions.NoPaid,
    totalAmount: 0,
    partialAmount: 0
  })
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
  const addBooking = useBooking(state => state.addBooking)
  const bookingList = useBooking(state => state.bookings)

  return (
    <>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '70ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-multiline-flexible"
          placeholder="Nombre Lugar"
          multiline
          maxRows={4}
          value={booking.name}
          onChange={(evt) => {
            setBooking({...booking, name: evt.target.value})
          }}
        />
        <TextField
          id="outlined-multiline-flexible-2"
          placeholder="¿Donde reservaste?"
          multiline
          maxRows={4}
          value={booking.origin}
          onChange={(evt) => setBooking({...booking, origin: evt.target.value})}
        />
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              value={booking.checkIn}
              label="Check In"
              onChange={(evt) => {
                setBooking({...booking, checkIn: evt.$d.toString()})
              }}
            />
            <DateTimePicker
              value={booking.checkOut}
              label="Check Out"
              onChange={(evt) => setBooking({...booking, checkOut: evt.$d.toString()})}
            />
          </LocalizationProvider>
        </div>
        <FormControl sx={{ m: 1, minWidth: 300 }}>
          <InputLabel id="demo-simple-select-label">Tipo Alojamiento</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={booking.housingType}
            onChange={(e) => setBooking({...booking, housingType: e.target.value})}
            label="Tipo Alojamiento"
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
            value={booking.paymentOption}
            onChange={e => setBooking({...booking, paymentOption: e.target.value})}
            label="Opción de Pago"
          >
            {paymentOptions.map(option => (
                <MenuItem key={option.value} value={option.value}>{option.text}</MenuItem>
              )
            )}
          </Select>
        </FormControl>
        <div>
          {booking.paymentOption === PaymentOptions.Signed && (
            <FormControl sx={{ m: 1 }}>
              <InputLabel id="demo-simple-select-label">Seña</InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                value={booking.partialAmount}
                type="number"
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                label="Seña"
                onChange={(e) => setBooking({...booking, partialAmount: Number(e.target.value)})}
              />
            </FormControl>
          )}
          <FormControl sx={{ m: 1 }}>
            <InputLabel id="demo-simple-select-label">{booking.paymentOption === PaymentOptions.NoPaid ? 'Monto Aprox.' : 'Monto Total'}</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              value={booking.totalAmount}
              type="number"
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              label={booking.paymentOption === PaymentOptions.NoPaid ? 'Monto Aprox.' : 'Monto Total'}
              onChange={(e) => setBooking({...booking, totalAmount: Number(e.target.value)})}
            />
          </FormControl>
        </div>
        <Box sx={{mt: 2}}>
          <Button
            color="success"
            variant="outlined"
            onClick={() => addBooking(booking)}
          >
            Guardar
          </Button>
        </Box>
      </Box>
      <Box sx={{mt: 2}}>
        <ul>
          {bookingList.map(booking =>
            (<li key={booking.name}>{booking.name}</li>)
          )}
        </ul>
      </Box>
    </>
  )
}

export default App
