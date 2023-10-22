import {Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography} from "@mui/material";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";
import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {ConveyanceRequest} from "../../interfaces/Conveyance/ConveyanceRequest.ts";
import {yupResolver} from "@hookform/resolvers/yup";
import {object} from "yup";
import {v4 as uuidV4} from "uuid";
import {useConveyance} from "../../store/conveyanceStore.tsx";
import {OwnVehicleRequest} from "../../interfaces/Conveyance/OwnVehicleRequest.ts";
interface OwnVehicleFormProps {
  resetIndex: (index: number) => void,
  index: number,
}

export function OwnVehicleForm({resetIndex, index}: OwnVehicleFormProps) {
  const validationSchema = {
    origin: Yup.string().required('El lugar de salida es requerido'),
    destiny: Yup.string().required('El lugar de llegada es requerido'),
    totalAmount: Yup.number().required('El monto total es requerido').min(1),
    // departure: Yup.date().required(),
    // arrival: Yup.date().required(),
  }

  const {register, reset, setValue, handleSubmit, formState: {errors}} = useForm<OwnVehicleRequest>({
    resolver: yupResolver(Yup.object().shape(validationSchema))
  })

  const createConveyance = (conveyance: OwnVehicleRequest) => {
    conveyance.id = uuidV4()
    console.log(conveyance)
    index.valueOf() > -1
      ? updateConveyance(conveyance, index)
      : addConveyance(conveyance)

    reset()
    resetIndex(-1)
  }
  const addConveyance = useConveyance(state => state.addConveyance)
  const updateConveyance = useConveyance(state => state.updateConveyance)

  return (
    <>
      <Box
        sx={{
          '& .MuiTextField-root': { m: 1, width: '80ch', mt: 2 },
        }}
      >
        <form onSubmit={handleSubmit(createConveyance)}>
          <TextField
            id="outlined-multiline-flexible-2"
            placeholder="Lugar salida"
            {...register('origin')}
            error={!!errors.origin}
          />
          <Typography variant="inherit" color="textSecondary">
            {errors.origin?.message}
          </Typography>

          <TextField
            id="outlined-multiline-flexible-2"
            placeholder="Lugar llegada"
            {...register('destiny')}
            error={!!errors.destiny}
          />
          <Typography variant="inherit" color="textSecondary">
            {errors.destiny?.message}
          </Typography>
          <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                defaultValue=""
                // value={dayjs(booking.checkIn)}
                label="Fecha Salida"
                {...register('departure', {valueAsDate: true})}
              />
              <DateTimePicker
                defaultValue=""
                // value={dayjs(booking.checkOut)}
                label="Fecha Llegada"
                {...register('arrival', {valueAsDate: true})}
              />
            </LocalizationProvider>
          </div>

          <TextField
            id="outlined-multiline-flexible-2"
            placeholder="Gastos combustible"
            {...register('totalAmount')}
            error={!!errors.totalAmount}
          />
          <Typography variant="inherit" color="textSecondary">
            {errors.totalAmount?.message}
          </Typography>
        </form>
      </Box>

      <Box sx={{my: 2}}>
        <Button
          type="submit"
          color="success"
          variant="outlined"
        >
          Guardar
        </Button>
      </Box>
    </>
  );
}