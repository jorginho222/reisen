import './App.css'
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {
  Box,
  Button,
  Card,
  FormControl, Grid, IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField
} from "@mui/material";
import React, {useMemo, useState} from "react";
import {PaymentOptions} from "./types/PaymentOptions.ts";
import {HousingTypes} from "./types/HousingTypes.ts";
import {BookingRequest} from "./interfaces/BookingRequest.ts";
import {useBooking} from "./store.tsx";
import {Edit} from "@mui/icons-material";

function App() {
  const cleanBooking: BookingRequest = {
    name: '',
    place: '',
    origin: '',
    checkIn: '',
    checkOut: '',
    housingType: HousingTypes.Room,
    paymentOption: PaymentOptions.NoPaid,
    totalAmount: 0,
    signedAmount: 0
  }
  const [booking, setBooking] = useState<BookingRequest>(cleanBooking)
  const [index, setIndex] = useState(-1)

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
  const bookingList = useBooking(state => state.bookings)

  const getPaidTotal = useMemo(() => {
    let total = 0
    bookingList.forEach(booking => {
      if (booking.paymentOption === PaymentOptions.Paid)
        total += booking.totalAmount
      if (booking.paymentOption === PaymentOptions.Signed && booking.signedAmount)
        total += booking.signedAmount
    })
    return total
  }, [bookingList])
  
  const getNoPaidTotal = useMemo(() => {
    let total = 0
    bookingList.forEach(booking => {
      if (booking.paymentOption === PaymentOptions.NoPaid)
        total += booking.totalAmount
      if (booking.paymentOption === PaymentOptions.Signed && booking.signedAmount)
        total += (booking.totalAmount - booking.signedAmount)
    })
    return total
  }, [bookingList])

  const getTotal = useMemo(() => getPaidTotal + getNoPaidTotal, [getPaidTotal, getNoPaidTotal])

  const save = () => {
    index.valueOf() > -1
      ? updateBooking(booking, index)
      : addBooking(booking)
    setBooking(cleanBooking)
  }
  const addBooking = useBooking(state => state.addBooking)
  const updateBooking = useBooking(state => state.updateBooking)
  const editBooking = (booking: BookingRequest) => {
    setIndex(bookingList.indexOf(booking))
    setBooking(booking)
  }

  return (
    <>
      <Card>
        <Box sx={{ justifyContent: "center" }}>
          Mis reservas
        </Box>
        <Box sx={{mt: 2}}>
          <ul>
            {bookingList.map(booking =>
              (<li key={booking.name}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    {booking.checkIn} al {booking.checkOut}: {booking.name}
                  </Grid>
                  <Grid item xs={2}>
                    <IconButton
                      onClick={() => editBooking(booking)}
                    >
                      <Edit />
                    </IconButton>
                  </Grid>
                </Grid>
              </li>)
            )}
          </ul>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            Gasto total
            <p>$ {getTotal}</p>
          </Grid>
          <Grid item xs={2}>
            Se Pagó
            <p>$ {getPaidTotal}</p>
          </Grid>
          <Grid item xs={2}>
            Resta pagar
            <p>$ {getNoPaidTotal}</p>
          </Grid>
        </Grid>
      </Card>
      <Card  sx={{mt: 2}}>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '50ch', mt: 2 },
          }}
          autoComplete="off"
        >
          <TextField
            id="outlined-multiline-flexible"
            placeholder="Nombre Lugar"
            value={booking.name}
            onChange={(evt) => {
              setBooking({...booking, name: evt.target.value})
            }}
          />
          <TextField
            id="outlined-multiline-flexible-2"
            placeholder="¿Donde queda?"
            value={booking.place}
            onChange={(evt) => {
              setBooking({...booking, place: evt.target.value})
            }}
          />
          <TextField
            id="outlined-multiline-flexible-2"
            placeholder="Medio de Reserva"
            value={booking.origin}
            onChange={(evt) => {
              setBooking({...booking, origin: evt.target.value})
            }}
          />
          <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                value={booking.checkIn}
                label="Check In"
                onChange={(evt) => {
                  console.log()
                  setBooking({...booking, checkIn: evt.$d.toLocaleDateString() + ' ' + evt.$d.toLocaleTimeString()})
                }}
                format="DD/MM/YYYY h:m"
              />
              <DateTimePicker
                value={booking.checkOut}
                label="Check Out"
                onChange={(evt) => setBooking({...booking, checkOut: evt.$d.toLocaleDateString() + ' ' + evt.$d.toLocaleTimeString()})}
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
                  value={booking.signedAmount}
                  type="number"
                  startAdornment={<InputAdornment position="start">$</InputAdornment>}
                  label="Seña"
                  onChange={(e) => setBooking({...booking, signedAmount: Number(e.target.value)})}
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
          <Box sx={{my: 2}}>
            <Button
              color="success"
              variant="outlined"
              onClick={save}
            >
              Guardar
            </Button>
          </Box>
        </Box>
      </Card>
    </>
  )
}

export default App
