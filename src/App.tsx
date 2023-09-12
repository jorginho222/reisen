import './App.css'
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel, MenuItem, OutlinedInput,
  Select,
  TextField
} from "@mui/material";
import React, {useState} from "react";

function App() {
  enum PaymentOptions {
    Paid = 'paid',
    NoPaid = 'noPaid',
    Signed = 'signed'
  }
  enum HousingTypes {
    Apartment = 'apartment',
    Room = 'room',
    Hostel = 'hostel'
  }
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

  const [paymentOption, setPaymentOption] = useState('')
  const [housingType, setHousingType] = useState('')
  const handlePaymentOption = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentOption((evt.target as HTMLInputElement).value)
  }
  const handleHousingType = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setHousingType((evt.target as HTMLInputElement).value)
  }

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
        />
        <TextField
          id="outlined-multiline-flexible"
          placeholder="¿Donde reservaste?"
          multiline
          maxRows={4}
        />
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker label="Check In"/>
            <DateTimePicker label="Check Out"/>
          </LocalizationProvider>
        </div>
        <FormControl sx={{ m: 1, minWidth: 300 }}>
          <InputLabel id="demo-simple-select-label">Tipo Alojamiento</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={housingType}
            onChange={handleHousingType}
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
            value={paymentOption}
            onChange={handlePaymentOption}
            label="Opción de Pago"
          >
            {paymentOptions.map(option => (
                <MenuItem key={option.value} value={option.value}>{option.text}</MenuItem>
              )
            )}
          </Select>
        </FormControl>
        <div>
          {paymentOption === PaymentOptions.Signed && (
            <FormControl sx={{ m: 1 }}>
              <InputLabel id="demo-simple-select-label">Seña</InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                label="Seña"
              />
            </FormControl>
          )}
          <FormControl sx={{ m: 1 }}>
            <InputLabel id="demo-simple-select-label">{paymentOption === PaymentOptions.NoPaid ? 'Monto Aprox.' : 'Monto Total'}</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              label={paymentOption === PaymentOptions.NoPaid ? 'Monto Aprox.' : 'Monto Total'}
            />
          </FormControl>
        </div>
        <Box sx={{mt: 2}}><Button color="success" variant="outlined">Guardar</Button></Box>
      </Box>
    </>
  )
}

export default App
