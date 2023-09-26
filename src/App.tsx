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
import {useEffect, useMemo, useState} from "react";
import {PaymentOptions} from "./types/PaymentOptions.ts";
import {HousingTypes} from "./types/HousingTypes.ts";
import {BookingRequest} from "./interfaces/BookingRequest.ts";
import {useBooking} from "./store.tsx";
import {Delete, Edit} from "@mui/icons-material";
import dayjs from "dayjs";
import {v4 as uuidV4} from 'uuid'
import {BookingBoard} from "./components/BookingBoard.tsx";

function App() {



  return (
    <>
      <BookingBoard />
    </>
  )
}

export default App
