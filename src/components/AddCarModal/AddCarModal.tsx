import React, { useState } from 'react';
import {
  Modal,
  Button,
  FormControl,
  FormLabel,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Switch,
  ModalFooter,
  FormErrorMessage,
  Box,
  useToast,
} from '@chakra-ui/react';
import { Car, useAppDispatch, useAppSelector } from '../../store/types/types';
import { validateCar } from '../../utils/validation/validation';
import { carsActionCreator } from '../../store/action';

interface AddCarModalProps {
  onClose: () => void;
}

const AddCarModal: React.FC<AddCarModalProps> = ({ onClose }) => {
  const cars = useAppSelector(state => state.cars.cars);
  const dispatch = useAppDispatch();
  const toast = useToast();

  const initialState: Car = {
    id: cars.length,
    car: '',
    car_model: '',
    car_vin: '',
    car_color: '',
    car_model_year: '',
    price: '',
    availability: true,
  };

  const [car, setCar] = useState<Car>(initialState);
  const [invalidFields, setInvalidFields] = useState<string[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'price') {
      if (!value.startsWith('$')) {
        setCar(prevCar => ({
          ...prevCar,
          [name]: `$${value}`,
        }));
      } else {
        setCar(prevCar => ({
          ...prevCar,
          [name]: value,
        }));
      }
    } else {
      setCar(prevCar => ({
        ...prevCar,
        [name]: value,
      }));
    }
  };

  const handleToggleAvailability = () => {
    setCar(prevCar => ({
      ...prevCar,
      availability: !prevCar.availability,
    }));
  };

  const handleAddCar = () => {
    const invalidFields: string[] = validateCar(car);
    if (invalidFields.length > 0) {
      setInvalidFields(invalidFields);
      return;
    }

    dispatch(carsActionCreator.addCar({ car }));

    toast({
      title: 'Car Added',
      description: 'The car has been successfully added.',
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top'
    });

    handleClose();
  };

  const handleClose = () => {
    setCar(initialState);
    setInvalidFields([]);
    onClose();
  };

  const isFieldInvalid = (fieldName: string) => {
    return invalidFields.includes(fieldName);
  };

  return (
    <Modal isOpen={true} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent fontSize="sm" lineHeight="shorter">
        <ModalHeader>Add Car</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isInvalid={isFieldInvalid('car')} isRequired>
            <FormLabel>Company</FormLabel>
            <Input
              name="car"
              value={car.car}
              onChange={handleInputChange}
              required
            />
            <Box h={4} pt={1} mb={4}>
              {isFieldInvalid('car') && (
                <FormErrorMessage>This field is required</FormErrorMessage>
              )}
            </Box>
          </FormControl>
          <FormControl isInvalid={isFieldInvalid('car_model')} isRequired>
            <FormLabel>Model</FormLabel>
            <Input
              name="car_model"
              value={car.car_model}
              onChange={handleInputChange}
              required
            />
            <Box h={4} pt={1} mb={4}>
              {isFieldInvalid('car_model') && (
                <FormErrorMessage>This field is required</FormErrorMessage>
              )}
            </Box>
          </FormControl>
          <FormControl isInvalid={isFieldInvalid('car_vin')} isRequired>
            <FormLabel>VIN</FormLabel>
            <Input
              name="car_vin"
              value={car.car_vin}
              onChange={handleInputChange}
              required
            />
             <Box h={4} pt={1} mb={4}>
              {isFieldInvalid('car_vin') && (
                <FormErrorMessage>This field is required</FormErrorMessage>
              )}
            </Box>
          </FormControl>
          <FormControl isInvalid={isFieldInvalid('car_color')} isRequired>
            <FormLabel>Color</FormLabel>
            <Input
              name="car_color"
              value={car.car_color}
              onChange={handleInputChange}
              required
            />
            <Box h={4} pt={1} mb={4}>
              {isFieldInvalid('car_color') && (
                <FormErrorMessage>Please enter a valid color</FormErrorMessage>
              )}
            </Box>
          </FormControl>
          <FormControl isInvalid={isFieldInvalid('car_model_year')} isRequired>
            <FormLabel>Model Year</FormLabel>
            <Input
              name="car_model_year"
              value={car.car_model_year}
              onChange={handleInputChange}
              required
            />
             <Box h={4} pt={1} mb={4}>
              {isFieldInvalid('car_model_year') && (
                <FormErrorMessage>Please enter a valid year</FormErrorMessage>
              )}
            </Box>
          </FormControl>
          <FormControl isInvalid={isFieldInvalid('price')} isRequired>
            <FormLabel>Price</FormLabel>
            <Input
              name="price"
              value={car.price}
              onChange={handleInputChange}
              required
            />
            <Box h={4} pt={1} mb={4}>
              {isFieldInvalid('price') && (
                <FormErrorMessage>
                  Please enter a valid price (e.g., 1000 or 5678.24)
                </FormErrorMessage>
              )}
            </Box>
          </FormControl>
          <FormControl display="flex" alignItems="center" mt={4}>
            <FormLabel htmlFor="availability" mb="0">
              Availability
            </FormLabel>
            <Switch
              id="availability"
              colorScheme="teal"
              isChecked={car.availability}
              onChange={handleToggleAvailability}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" mr={3} onClick={handleAddCar}>
            Add
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddCarModal;
