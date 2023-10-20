import {Box, FormControl, InputLabel, MenuItem, Select, TextField, Typography} from "@mui/material";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {ConveyanceFormProps} from "./ConveyanceForm.tsx";
import {ConveyanceMediaTypes} from "../../types/conveyance/conveyanceMediaTypes.ts";
import {useState} from "react";
import dayjs from "dayjs";

export function TicketForm({register, errors, setConveyanceType}: ConveyanceFormProps) {
  const mediaTypes = [
    {text: 'Micro', value: ConveyanceMediaTypes.Bus},
    {text: 'Vuelo', value: ConveyanceMediaTypes.Flight},
    {text: 'Taxi', value: ConveyanceMediaTypes.Ship},
  ]
  const [selectedMediaType, setSelectedMediaType] = useState<ConveyanceMediaTypes>(ConveyanceMediaTypes.Flight)
  // const [pickUpDate, setPickUpDate] = useState<Date>(new Date())
  // const [arrivalDate, setArrivalDate] = useState<Date>(new Date())

  const pickUp = register('pickUp', { valueAsDate: true })
  const arrival = register('arrival', { valueAsDate: true })

  return (
    <>
      <Box
        sx={{
          '& .MuiTextField-root': { m: 1, width: '80ch', mt: 2 },
        }}
      >
        <div>
          <FormControl sx={{m: 1, minWidth: 300}}>
            <InputLabel id="demo-simple-select-label">Medio</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue=""
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
              label="Fecha Salida"
              {...pickUp}
              onChange={(date: Date) => {
                pickUp.onChange(date)
              }}
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
              {...register('arrival', { valueAsDate: true })}
              onChange={(date: Date) => setArrivalDate(date)}
            />
          </LocalizationProvider>
        </div>
      </Box>
    </>
  );
}