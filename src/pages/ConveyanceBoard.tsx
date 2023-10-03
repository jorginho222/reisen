import {useState} from "react";
import {useForm} from "react-hook-form";
import {useConveyance} from "../store/conveyanceStore.tsx";
import * as Yup from 'yup'
import {yupResolver} from "@hookform/resolvers/yup";
import {ConveyanceTypes} from "../types/conveyance/ConveyanceTypes.ts";
import {ConveyanceRequest} from "../interfaces/Conveyance/ConveyanceRequest.ts";
import {Box, Button, Card} from "@mui/material";
import {ConveyanceForm} from "../components/Conveyance/ConveyanceForm.tsx";

export function ConveyanceBoard() {
  const [index, setIndex] = useState<number>(-1)
  const conveyanceList: ConveyanceRequest[] = useConveyance(state => state.conveyanceList)
  const [conveyanceType, setConveyanceType] = useState<ConveyanceTypes>()

  const baseValidationSchema = {
    type: Yup.string().required('El tipo de transporte es requerido'),
    totalAmount: Yup.number().required('El monto total es requerido')
  }
  const travelValidationSchema = {
    ...baseValidationSchema,
    media: Yup.string().required('El medio de transporte es requerido'),
    origin: Yup.string().required('El lugar de partida es requerido'),
    destiny: Yup.string().required('El lugar de llegada es requerido'),
    // pickUp: Yup.date().required(),
    // arrival: Yup.date().required(),
  }
  const carRentalValidationSchema = {
    ...baseValidationSchema,
    // pickUp: Yup.date().required(),
    // devolution: Yup.date().required(),
  }
  const ownVehicleValidationSchema = {
    ...baseValidationSchema,
    origin: Yup.string().required('El lugar de partida es requerido'),
    destiny: Yup.string().required('El lugar de llegada es requerido'),
    // departure: Yup.date().required(),
    // arrival: Yup.date().required(),
  }

  const validationResolver = () => {
    switch (conveyanceType) {
      case ConveyanceTypes.Ticket:
        return Yup.object().shape(travelValidationSchema)
      case ConveyanceTypes.OwnVehicle:
        return Yup.object().shape(ownVehicleValidationSchema)
      case ConveyanceTypes.CarRental:
        return Yup.object().shape(carRentalValidationSchema)
      default:
        return Yup.object().shape(baseValidationSchema)
    }
  }
  const {register, reset, setValue, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(validationResolver())
  })

  return (
    <>
      <Card  sx={{mt: 2}}>
        <form onSubmit={handleSubmit}>
          <ConveyanceForm register={register} errors={errors} />
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
  );
}