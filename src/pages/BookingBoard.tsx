import {Box, Button, Card, Grid, IconButton} from "@mui/material";
import {Delete, Edit} from "@mui/icons-material";
import {BookingRequest} from "../interfaces/Booking/BookingRequest.ts";
import {v4 as uuidV4} from "uuid";
import {PaymentOptions} from "../types/booking/PaymentOptions.ts";
import {useMemo, useState} from "react";
import {useBooking} from "../store/bookingStore.tsx";
import {BookingForm} from "../components/BookingForm.tsx";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {useFinance} from "../store/financeStore.tsx";
import {ModuleTypes} from "../types/booking/ModuleTypes.ts";
import {ModuleTotals} from "../interfaces/ModuleTotals.ts";

export function BookingBoard() {
  const [index, setIndex] = useState(-1)
  const bookingList = useBooking(state => state.bookings)

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('El nombre es requerido'),
    place: Yup.string().required('El lugar es requerido'),
    origin: Yup.string().required('El medio de reserva es requerido'),
    // checkIn: Yup.date().required('La fecha de Check In es requerida'),
    // checkOut: Yup.date().required('La fecha de Check Out es requerida'),
    housingType: Yup.string().required('El tipo de alojamiento es requerido'),
    paymentOption: Yup.string().required('El tipo de pago es requerido'),
    totalAmount: Yup.number().required('El monto total es requerido'),
  })
  const  { register, handleSubmit, setValue, reset, formState: {errors} } = useForm<BookingRequest|any>({
    resolver: yupResolver(validationSchema),
  })

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

  const bookingTotals: ModuleTotals = {
    module: ModuleTypes.Booking,
    noPaid: getNoPaidTotal,
    paid: getPaidTotal,
    total: getTotal
  }

  const createBooking = (booking: BookingRequest) => {
    booking.id = uuidV4()
    index.valueOf() > -1
      ? updateBooking(booking, index)
      : addBooking(booking)

    reset()
    setIndex(-1)
    updateTotals(bookingTotals)
  }
  const editBooking = (booking: BookingRequest) => {
    setIndex(bookingList.indexOf(booking))
    setValue('name', booking.name)
    setValue('place', booking.place)
    setValue('origin', booking.origin)
    // setValue('checkIn', booking.checkIn)
    // setValue('checkOut', booking.checkOut)
    setValue('housingType', booking.housingType)
    setValue('paymentOption', booking.paymentOption.valueOf())
    setValue('totalAmount', booking.totalAmount)
    setValue('signedAmount', booking.signedAmount)
  }
  const deleteBooking = (booking: BookingRequest) => {
    setIndex(bookingList.indexOf(booking))
    removeBooking(booking, index)
    updateTotals(bookingTotals)
    setIndex(-1)
  }
  const addBooking = useBooking(state => state.addBooking)
  const updateBooking = useBooking(state => state.updateBooking)
  const removeBooking = useBooking(state => state.removeBooking)
  const updateTotals = useFinance(state => state.updateTotals)

  return (
    <>
      <Card>
        <Box sx={{ justifyContent: "center" }}>
          Mis reservas
        </Box>
        { bookingList.length === 0 &&
          <p>No tenés ninguna reserva.</p>
        }
        <Box sx={{mt: 2}}>
          <ul>
            {bookingList.map(booking =>
              (<li>
                <Grid container spacing={2}>
                  <Grid item xs={6} key={booking.id}>
                    {booking.checkIn.toLocaleDateString('es-AR')} al {booking.checkOut.toLocaleDateString('es-AR')}: {booking.name}
                  </Grid>
                  <Grid item xs={2}>
                    <IconButton
                      onClick={() => editBooking(booking)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => deleteBooking(booking)}>
                      <Delete />
                    </IconButton>
                  </Grid>
                </Grid>
              </li>)
            )}
          </ul>
        </Box>
        { bookingList.length > 0 &&
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
        }
      </Card>
      <Card  sx={{mt: 2}}>
        <form onSubmit={handleSubmit(createBooking)}>
          <BookingForm
            register={register}
            errors={errors}
          />
          <Box sx={{my: 2}}>
            <Button
              type="submit"
              color="success"
              variant="outlined"
            >
              Guardar
            </Button>
          </Box>
        </form>
      </Card>
    </>
  )
}