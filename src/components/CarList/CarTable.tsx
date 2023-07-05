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
        <AlertDescription>No cars have been found</AlertDescription>
      </Alert>
    );
  }

  return (
    <Table
      size="sm"
      h="600px"
      w="100%"
      borderWidth="1px"
      borderColor="gray.200"
      layout="fixed"
    >
      <Thead>
        <Tr>
          <Th borderColor={rowBorderColor} width="12%" paddingX="3">
            Company
          </Th>
          <Th borderColor={rowBorderColor} width="13%" paddingX="3">
            Model
          </Th>
          <Th borderColor={rowBorderColor} width="19%" paddingX="3">
            VIN
          </Th>
          <Th borderColor={rowBorderColor} width="11%" paddingX="3">
            Color
          </Th>
          <Th borderColor={rowBorderColor} width="7%" paddingX="3">
            Year
          </Th>
          <Th borderColor={rowBorderColor} width="13%" paddingX="3">
            Price
          </Th>
          <Th borderColor={rowBorderColor} width="15%" paddingX="3">
            Availability
          </Th>
          <Th borderColor={rowBorderColor} width="10%" paddingX="3">
            Actions
          </Th>
        </Tr>
      </Thead>
      <Tbody h="100%">
        {displayedCars.map((car) => (
          <CarTableRow key={car.id} car={car} />
        ))}
      </Tbody>
    </Table>
  );
};

export default CarTable;
