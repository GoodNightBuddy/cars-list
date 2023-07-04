import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Alert,
  AlertIcon,
  AlertDescription,
  useColorModeValue,
} from '@chakra-ui/react';
import CarTableRow from './CarTableRow';
import { Car } from '../../store/types/types';

interface CarTableProps {
  cars: Car[];
  currentPage: number;
  itemsPerPage: number;
}

const CarTable: React.FC<CarTableProps> = ({
  currentPage,
  itemsPerPage,
  cars,
}) => {
  const rowBorderColor = useColorModeValue('gray.200', 'white');

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedCars = cars.slice(startIndex, endIndex);

  
  if (!cars.length) {
    return (
      <Alert status="info">
        <AlertIcon />
        <AlertDescription>There are no cars yet</AlertDescription>
      </Alert>
    );
  }

  return (
    <Table
      size="md"
      h="600px"
      w="100%"
      borderWidth="1px"
      borderColor="gray.200"
    >
      <Thead>
        <Tr>
          <Th borderColor={rowBorderColor} width="15%">
            Company
          </Th>
          <Th borderColor={rowBorderColor} width="15%">
            Model
          </Th>
          <Th borderColor={rowBorderColor} width="10%">
            VIN
          </Th>
          <Th borderColor={rowBorderColor} width="10%">
            Color
          </Th>
          <Th borderColor={rowBorderColor} width="10%">
            Year
          </Th>
          <Th borderColor={rowBorderColor} width="15%">
            Price
          </Th>
          <Th borderColor={rowBorderColor} width="15%">
            Availability
          </Th>
          <Th borderColor={rowBorderColor} width="10%">
            Actions
          </Th>
        </Tr>
      </Thead>
      <Tbody h="100%">
        {displayedCars.map((car, index) => (
          <CarTableRow key={car.id} car={car} index={index} />
        ))}
      </Tbody>
    </Table>
  );
};

export default CarTable;
