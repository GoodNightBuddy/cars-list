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
} from '@chakra-ui/react';
import { Car } from '../../store/types/types';
import { validateCar } from '../../utils/validation/validation';

interface CarEditModalProps {
  car: Car;
  index: number;
  onSave: (editedCar: Car) => void;
  onClose: () => void;
}

const CarEditModal: React.FC<CarEditModalProps> = ({
  car,
  onSave,
  onClose,
}) => {
  const [editedCar, setEditedCar] = useState<Car>(car);
  const [invalidFields, setInvalidFields] = useState<string[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'price') {
      if (!value.startsWith('$')) {
        setEditedCar((prevCar) => ({
          ...prevCar,
          [name]: `$${value}`,
        }));
      } else {
        setEditedCar((prevCar) => ({
          ...prevCar,
          [name]: value,
        }));
      }
    } else {
      setEditedCar((prevCar) => ({
        ...prevCar,
        [name]: value,
      }));
    }
  };
  

  const handleToggleAvailability = () => {
    setEditedCar(prevCar => ({
      ...prevCar,
      availability: !prevCar.availability,
    }));
  };

  const handleSaveEdit = () => {
    const invalidFields = validateCar(editedCar);
  
    if (invalidFields.length > 0) {
      setInvalidFields(invalidFields);
      return;
    }
  
    const year = parseInt(editedCar.car_model_year as string, 10);
    const updatedCar = {
      ...editedCar,
      car_model_year: year,
    };
  
    onSave(updatedCar);
  };
  

  const handleCancelEdit = () => {
    onClose();
  };

  const isFieldInvalid = (fieldName: string) => {
    return invalidFields.includes(fieldName);
  };

  return (
    <Modal isOpen={true} onClose={handleCancelEdit}>
      <ModalOverlay />
      <ModalContent fontSize="sm" lineHeight="shorter">
        <ModalHeader>Edit Car</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Company</FormLabel>
            <Input value={editedCar.car} isReadOnly mb="8"/>
          </FormControl>
          <FormControl isInvalid={isFieldInvalid('car_model')}>
            <FormLabel>Model</FormLabel>
            <Input value={editedCar.car_model} isReadOnly mb="8"/>
          </FormControl>
          <FormControl>
            <FormLabel>VIN</FormLabel>
            <Input value={editedCar.car_vin} isReadOnly mb="8"/>
          </FormControl>
          <FormControl isInvalid={isFieldInvalid('car_color')}>
            <FormLabel>Color</FormLabel>
            <Input
              name="car_color"
              value={editedCar.car_color}
              onChange={handleInputChange}
              isReadOnly={false}
              required
            />
            <Box h={4} pt={1} mb={4}>
              {isFieldInvalid('car_color') && (
                <FormErrorMessage>Please enter a valid color</FormErrorMessage>
              )}
            </Box>
          </FormControl>
          <FormControl isInvalid={isFieldInvalid('car_model_year')}>
            <FormLabel>Year</FormLabel>
            <Input
              name="car_model_year"
              type="number"
              value={editedCar.car_model_year}
              onChange={handleInputChange}
              isReadOnly={false}
              required
            />
            <Box h={4} pt={1} mb={4}>
              {isFieldInvalid('car_model_year') && (
                <FormErrorMessage>Please enter a valid year</FormErrorMessage>
              )}
            </Box>
          </FormControl>
          <FormControl isInvalid={isFieldInvalid('price')}>
            <FormLabel>Price</FormLabel>
            <Input
              name="price"
              value={editedCar.price}
              onChange={handleInputChange}
              isReadOnly={false}
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
          <FormControl mt="4">
            <FormLabel>Availability</FormLabel>
            <Switch
              name="availability"
              isChecked={editedCar.availability}
              onChange={handleToggleAvailability}
              isReadOnly={false}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSaveEdit}>
            Save
          </Button>
          <Button onClick={handleCancelEdit}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CarEditModal;
