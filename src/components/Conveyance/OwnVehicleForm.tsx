import {Box, Button, InputAdornment, InputLabel, OutlinedInput, TextField, Typography} from "@mui/material";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {v4 as uuidV4} from "uuid";
import {useConveyance} from "../../store/conveyanceStore.tsx";
import {OwnVehicleRequest} from "../../interfaces/Conveyance/OwnVehicleRequest.ts";
import {ConveyanceTypes} from "../../types/conveyance/ConveyanceTypes.ts";
interface OwnVehicleFormProps {
  resetIndex: (index: number) => void,
  index: number,
}

export function OwnVehicleForm({resetIndex, index}: OwnVehicleFormProps) {
  const validationSchema = {
    origin: Yup.string().required('El lugar de salida es requerido'),
    destiny: Yup.string().required('El lugar de llegada es requerido'),
    totalAmount: Yup.number().required('El monto total es requerido').min(1, 'El monto debe ser mayor a 0'),
    // departure: Yup.date().required(),
    // arrival: Yup.date().required(),
  }

  const {register, reset, setValue, handleSubmit, formState: {errors}} = useForm<OwnVehicleRequest|any>({
    resolver: yupResolver(Yup.object().shape(validationSchema))
  })

  const createConveyance = (conveyance: OwnVehicleRequest) => {
    conveyance.id = uuidV4()
    conveyance.type = ConveyanceTypes.OwnVehicle
    console.log(conveyance)
    index.valueOf() > -1
      ? updateConveyance(conveyance, index)
      : addConveyance(conveyance)

    reset()
    resetIndex(-1)
  }
  const addConveyance = useConveyance(state => state.addOwnVehicleConveyance)
  const updateConveyance = useConveyance(state => state.updateOwnVehicleConveyance)

  return (
    <>
      <form onSubmit={handleSubmit(createConveyance)}>
        <Box
          sx={{
            '& .MuiTextField-root': {m: 1, width: '80ch', mt: 2},
          }}
        >
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
                // value={dayjs(booking.checkIn)}
                label="Fecha Salida"
                {...register('departure', {valueAsDate: true})}
              />
              <DateTimePicker
                // value={dayjs(booking.checkOut)}
                label="Fecha Llegada"
                {...register('arrival', {valueAsDate: true})}
              />
            </LocalizationProvider>
          </div>

          <InputLabel id="demo-simple-select-label">Total</InputLabel>
          <OutlinedInput
            id="outlined-multiline-flexible-2"
            type="number"
            defaultValue={0}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            {...register('totalAmount')}
            error={!!errors.totalAmount}
          />
          <Typography variant="inherit" color="textSecondary">
            {errors.totalAmount?.message}
          </Typography>
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
      </form>
    </>
  );
}