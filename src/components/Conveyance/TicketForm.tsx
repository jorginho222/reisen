import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem, OutlinedInput,
  Select,
  TextField,
  Typography
} from "@mui/material";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {ConveyanceMediaTypes} from "../../types/conveyance/conveyanceMediaTypes.ts";
import {useState} from "react";
import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {TravelTicketRequest} from "../../interfaces/Conveyance/TravelTicketRequest.ts";
import {v4 as uuidV4} from "uuid";
import {useConveyance} from "../../store/conveyanceStore.tsx";

interface TicketFormProps {
  resetIndex: (index: number) => void,
  index: number,
}

export function TicketForm({resetIndex, index}: TicketFormProps) {
  const mediaTypes = [
    {text: 'Micro', value: ConveyanceMediaTypes.Bus},
    {text: 'Vuelo', value: ConveyanceMediaTypes.Flight},
    {text: 'Taxi', value: ConveyanceMediaTypes.Ship},
  ]
  const [selectedMediaType, setSelectedMediaType] = useState<ConveyanceMediaTypes>(ConveyanceMediaTypes.Flight)
  // const [pickUpDate, setPickUpDate] = useState<Date>(new Date())
  // const [arrivalDate, setArrivalDate] = useState<Date>(new Date())

  const validationSchema = {
    totalAmount: Yup.number().required('El monto total es requerido').min(1),
    media: Yup.string().required('El medio de transporte es requerido'),
    origin: Yup.string().required('El lugar de salida es requerido'),
    destiny: Yup.string().required('El lugar de llegada es requerido'),
    // pickUp: Yup.date().required(),
    // arrival: Yup.date().required(),
  }

  const {register, reset, setValue, handleSubmit, formState: {errors}} = useForm<TravelTicketRequest|any>({
    resolver: yupResolver(Yup.object().shape(validationSchema))
  })

  const createConveyance = (conveyance: TravelTicketRequest) => {
    conveyance.id = uuidV4()
    console.log(conveyance)
    index.valueOf() > -1
      ? updateConveyance(conveyance, index)
      : addConveyance(conveyance)

    reset()
    resetIndex(-1)
  }
  const addConveyance = useConveyance(state => state.addTicketConveyance)
  const updateConveyance = useConveyance(state => state.updateTicketConveyance)

  return (
    <>
      <Box
        sx={{
          '& .MuiTextField-root': { m: 1, width: '80ch', mt: 2 },
        }}
      >
        <form onSubmit={handleSubmit(createConveyance)}>
          <div>
            <FormControl sx={{m: 1, minWidth: 300}}>
              <InputLabel id="demo-simple-select-label">Medio</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                defaultValue={selectedMediaType}
                {...register('media')}
                onChange={(event) => {
                  // @ts-ignore
                  setSelectedMediaType(event.target.value)
                }}
                error={!!errors.media}
              >
                {mediaTypes.map(option => (
                    <MenuItem key={option.value} value={option.value}>{option.text}</MenuItem>
                  )
                )}
              </Select>
              <Typography variant="inherit" color="textSecondary">
                {errors.media?.message}
              </Typography>
            </FormControl>
          </div>

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
                defaultValue={null}
                label="Fecha Salida"
                {...register('pickUp', {valueAsDate: true})}
              />
              {/*<Controller*/}
              {/*  control={control}*/}
              {/*  name="DOB"*/}
              {/*  defaultValue={new Date()}*/}
              {/*  render={({ field: { onChange, value }} }) => (*/}
              {/*    <LocalizationProvider dateAdapter={AdapterDayjs}>*/}
              {/*      <DateTimePicker*/}
              {/*        value={value ? new Date(value) : null}*/}
              {/*        onChange={(value) => {*/}
              {/*          field.onChange(value);*/}
              {/*          setDobvalue(value);*/}
              {/*        }}*/}
              {/*        id="DOB"*/}
              {/*        format="YYYY-MM-DD"*/}
              {/*        label={"Date of Bearth"}*/}
              {/*      />*/}
              {/*    </LocalizationProvider>*/}
              {/*  )}*/}
              {/*/>*/}
              <DateTimePicker
                defaultValue={null}
                label="Fecha Llegada"
                {...register('arrival', {valueAsDate: true})}
              />
            </LocalizationProvider>
          </div>

          <div>
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
          </div>
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