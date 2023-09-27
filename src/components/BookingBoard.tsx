import {Box, Card, Grid, IconButton} from "@mui/material";
import {Delete, Edit} from "@mui/icons-material";
import {BookingRequest} from "../interfaces/BookingRequest.ts";
import {v4 as uuidV4} from "uuid";
import {HousingTypes} from "../types/HousingTypes.ts";
import {PaymentOptions} from "../types/PaymentOptions.ts";
import {useMemo, useState} from "react";
import {useBooking} from "../store.tsx";
import {BookingForm} from "./BookingForm.tsx";

export function BookingBoard() {
  const cleanBooking: BookingRequest = {
    id: uuidV4(),
    name: '',
    place: '',
    origin: '',
    checkIn: new Date(),
    checkOut: new Date(),
    housingType: HousingTypes.Room,
    paymentOption: PaymentOptions.NoPaid,
    totalAmount: 0,
    signedAmount: 0
  }
  const [booking, setBooking] = useState<BookingRequest>(cleanBooking)
  const [index, setIndex] = useState(-1)
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

  const editBooking = (booking: BookingRequest) => {
    setIndex(bookingList.indexOf(booking))
    setBooking(booking)
  }
  const deleteBooking = (booking: BookingRequest) => {
    setIndex(bookingList.indexOf(booking))
    removeBooking(booking, index)
  }
  const removeBooking = useBooking(state => state.removeBooking)

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
              (<li key={booking.id}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
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

      <BookingForm
        booking={booking} index={index}
        resetBooking={() => setBooking(cleanBooking)}
        resetIndex={() => setIndex(-1)}
        setBooking={setBooking}
      />
    </>
  )
}