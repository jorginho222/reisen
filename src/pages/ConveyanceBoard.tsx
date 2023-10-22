import React, {useCallback, useState} from "react";
import {useForm} from "react-hook-form";
import {useConveyance} from "../store/conveyanceStore.tsx";
import * as Yup from 'yup'
import {yupResolver} from "@hookform/resolvers/yup";
import {ConveyanceTypes} from "../types/conveyance/ConveyanceTypes.ts";
import {BaseConveyanceRequest} from "../interfaces/Conveyance/BaseConveyanceRequest.ts";
import {Box, Button, Card, Grid, Typography} from "@mui/material";
import {ConveyanceForm} from "../components/Conveyance/ConveyanceForm.tsx";
import {v4 as uuidV4} from "uuid";
import {TravelTicketRequest} from "../interfaces/Conveyance/TravelTicketRequest.ts";
import {OwnVehicleRequest} from "../interfaces/Conveyance/OwnVehicleRequest.ts";
import {CarRentalRequest} from "../interfaces/Conveyance/CarRentalRequest.ts";
import {ConveyanceRequest} from "../interfaces/Conveyance/ConveyanceRequest.ts";

export function ConveyanceBoard() {
  const [index, setIndex] = useState<number>(-1)
  const conveyanceList: ConveyanceRequest[] = useConveyance(state => state.ownVehicleConveyances)
  const ownVehicleConveyances: () => OwnVehicleRequest[] = useCallback(() => {
    return conveyanceList.filter(conveyance => conveyance.type === ConveyanceTypes.OwnVehicle)
  }, [conveyanceList])
  const ticketConveyances: () => TravelTicketRequest[] = useCallback(() => {
    return conveyanceList.filter(conveyance => conveyance.type === ConveyanceTypes.Ticket)
  }, [conveyanceList])
  const carRentalConveyances: () => CarRentalRequest[] = useCallback(() => {
    return conveyanceList.filter(conveyance => conveyance.type === ConveyanceTypes.CarRental)
  }, [conveyanceList])

  const baseValidationSchema = {
    type: Yup.string().required('El tipo de transporte es requerido'),
    totalAmount: Yup.number().required('El monto total es requerido').min(1),
    media: Yup.string().required('El medio de transporte es requerido'),
    origin: Yup.string().required('El lugar de salida es requerido'),
    destiny: Yup.string().required('El lugar de llegada es requerido'),
    // pickUp: Yup.date().required(),
    // departure: Yup.date().required(),
    // arrival: Yup.date().required(),
    // devolution: Yup.date().required(),
  }

  const {register, reset, setValue, handleSubmit, formState: {errors}} = useForm<ConveyanceRequest>({
    resolver: yupResolver()
  })

  const createConveyance = (conveyance: ConveyanceRequest) => {
    conveyance.id = uuidV4()
    console.log(conveyance)
    index.valueOf() > -1
      ? updateConveyance(conveyance, index)
      : addConveyance(conveyance)

    reset()
    setIndex(-1)
  }

  const editConveyance = (conveyance: ConveyanceRequest) => {
    setIndex(conveyanceList.indexOf(conveyance))
    setValue('type', conveyance.type)

    switch (conveyance.type) {
      case ConveyanceTypes.Ticket:
        editTicketConveyance(conveyance)
        break
      case ConveyanceTypes.OwnVehicle:
        editOwnVehicleConveyance(conveyance)
        break
      case ConveyanceTypes.CarRental:
        editCarRentalConveyance(conveyance)
        break
    }
  }
  const editTicketConveyance = (conveyance: TravelTicketRequest) => {
    setValue('media', conveyance.media)
    setValue('origin', conveyance.origin)
    setValue('destiny', conveyance.destiny)
    setValue('pickUp', conveyance.pickUp)
    setValue('arrival', conveyance.arrival)
  }
  const editOwnVehicleConveyance = (conveyance: OwnVehicleRequest) => {
    setValue('origin', conveyance.origin)
    setValue('destiny', conveyance.destiny)
    setValue('departure', conveyance.departure)
    setValue('arrival', conveyance.arrival)
  }
  const editCarRentalConveyance = (conveyance: CarRentalRequest) => {
    setValue('pickUp', conveyance.pickUp)
    setValue('devolution', conveyance.devolution)
    setValue('place', conveyance.place)
    setValue('fuelCost', conveyance.fuelCost)
  }

  const deleteConveyance = (conveyance: ConveyanceRequest) => {
    setIndex(conveyanceList.indexOf(conveyance))
    removeConveyance(conveyance, index)
    setIndex(-1)
  }

  const addConveyance = useConveyance(state => state.addConveyance)
  const updateConveyance = useConveyance(state => state.updateConveyance)
  const removeConveyance = useConveyance(state => state.removeConveyance)

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Card sx={{mt: 2}}>
            <Typography variant="h5" component="div">
              Vehiculo propio
            </Typography>
            <Box sx={{mt: 2}}>
              <ul>
                {ownVehicleConveyances().map(conveyance => (
                  <li key={conveyance.id}>
                    {conveyance.origin}
                  </li>
                ))}
              </ul>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card sx={{mt: 2}}>
            <Typography variant="h5" component="div">
              Pasaje
            </Typography>
            <Box sx={{mt: 2}}>
              <ul>
                {ticketConveyances().map(conveyance => (
                  <li key={conveyance.id}>
                    {conveyance.origin}
                  </li>
                ))}
              </ul>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card sx={{mt: 2}}>
            <Typography variant="h5" component="div">
              Alquiler
            </Typography>
            <Box sx={{mt: 2}}>
              <ul>
                {carRentalConveyances().map(conveyance => (
                  <li key={conveyance.id}>
                    {conveyance.place}
                  </li>
                ))}
              </ul>
            </Box>
          </Card>
        </Grid>
      </Grid>
      <Card  sx={{mt: 2}}>
        <form onSubmit={handleSubmit(createConveyance)}>
          <ConveyanceForm resetIndex={() => setIndex(-1)} index={index} />
        </form>
      </Card>
    </>
  )
}