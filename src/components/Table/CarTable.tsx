import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Spinner,
  Alert,
  AlertIcon,
  AlertDescription,
  Grid,
  useColorModeValue,
} from '@chakra-ui/react';
import CarTableRow from './CarTableRow';
import { Car, useAppSelector } from '../../store/types/types';

interface CarTableProps {
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  onPageChange: (selectedPage: number) => void;
}

const CarTable: React.FC<CarTableProps> = ({
  currentPage,
  itemsPerPage,
}) => {
  const rowBorderColor = useColorModeValue('gray.200', 'white');
  const {cars, error, loading} = useAppSelector(state => state.cars);

  if (loading) {
    return (
      <Grid placeItems="center" h="100%">
        <Spinner size="xl" />
      </Grid>
    );
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    );
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedCars = cars.slice(startIndex, endIndex);

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
          <Th borderColor={rowBorderColor} width="15%">Company</Th>
          <Th borderColor={rowBorderColor} width="15%">Model</Th>
          <Th borderColor={rowBorderColor} width="10%">VIN</Th>
          <Th borderColor={rowBorderColor} width="10%">Color</Th>
          <Th borderColor={rowBorderColor} width="10%">Year</Th>
          <Th borderColor={rowBorderColor} width="15%">Price</Th>
          <Th borderColor={rowBorderColor} width="15%">Availability</Th>
          <Th borderColor={rowBorderColor} width="10%">Actions</Th>
        </Tr>
      </Thead>
      <Tbody h="100%">
        {displayedCars.map((car, index) => (
          <CarTableRow
            key={car.id}
            car={car}
            isLastRow={index === displayedCars.length - 1}
          />
        ))}
      </Tbody>
    </Table>
  );
};

export default CarTable;
