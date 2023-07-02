import React from 'react';
import { Tr, Td, useColorModeValue } from '@chakra-ui/react';

interface CarTableRowProps {
  car: {
    id: number;
    car: string;
    car_model: string;
    car_color: string;
    car_model_year: number;
    car_vin: string;
    price: string;
    availability: boolean;
  };
  isLastRow: boolean;
}

const CarTableRow: React.FC<CarTableRowProps> = ({ car, isLastRow }) => {
  const rowBorderColor = useColorModeValue('gray.200', 'white');
  return (
    <Tr borderBottom="1px" borderColor={rowBorderColor}>
      <Td borderBottom="none">{car.car}</Td>
      <Td borderBottom="none">{car.car_model}</Td>
      <Td borderBottom="none">{car.car_vin}</Td>
      <Td borderBottom="none">{car.car_color}</Td>
      <Td borderBottom="none">{car.car_model_year}</Td>
      <Td borderBottom="none">{car.price}</Td>
      <Td borderBottom="none">{car.availability ? 'Available' : 'Unavailable'}</Td>
      <Td borderBottom="none">Actions</Td>
    </Tr>
  );
};

export default CarTableRow;
