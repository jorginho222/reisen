import './App.css'
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel, InputAdornment,
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
          '& .MuiTextField-root': { m: 1, width: '50ch' },
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
            <DateTimePicker/>
            <DateTimePicker/>
          </LocalizationProvider>
        </div>
        <FormControl sx={{ m: 1, minWidth: 300 }}>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={housingType}
            onChange={handleHousingType}
            autoWidth
            label="Opción de Pago"
          >
            {housingTypes.map(type => (
                <MenuItem key={type.value} value={type.value}>{type.text}</MenuItem>
              )
            )}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 300 }}>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={paymentOption}
            onChange={handlePaymentOption}
            autoWidth
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
              <OutlinedInput
                id="outlined-adornment-amount"
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                label="Seña"
              />
            </FormControl>
          )}
          <FormControl sx={{ m: 1 }}>
            <OutlinedInput
              id="outlined-adornment-amount"
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              label={paymentOption === PaymentOptions.NoPaid ? 'Monto Aprox.' : 'Monto Total'}
            />
          </FormControl>
        </div>
        <Button color="success" variant="outlined">Guardar</Button>
      </Box>
    </>
  )
}

export default App
