import { useState, useEffect } from 'react';
import { Alert, AlertDescription, AlertIcon, Box, Grid, Spinner } from '@chakra-ui/react';
import { carsActionCreator } from '../../store/action';
import { useAppDispatch, useAppSelector } from '../../store/types/types';
import { saveCarsToStorage } from '../../utils/storage/cars';
import CarTable from './CarTable';
import CarTablePagination from './CarTablePagination';

export const CarList = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(carsActionCreator.getCars());
  }, [dispatch]);

  const { cars, loading, error } = useAppSelector(state => state.cars);
  useEffect(() => {
    saveCarsToStorage(cars);
  }, [cars]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Define the number of items per page here
  const totalPages = Math.ceil(cars.length / itemsPerPage);

  const handlePageChange = (selectedPage: number) => {
    setCurrentPage(selectedPage);
  };

  const handleSelectPage = () => {
    const selectedPageInput = prompt('Enter a page number:');
    if (selectedPageInput !== null) {
      const selectedPage = parseInt(selectedPageInput, 10);
      if (
        !isNaN(selectedPage) &&
        selectedPage >= 1 &&
        selectedPage <= totalPages
      ) {
        setCurrentPage(selectedPage);
      }
    }
  };

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

  return (
    <Box alignSelf="flex-start" w="100%" h="100%">
      <CarTable
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        cars={cars}
      />

      <CarTablePagination
        onPageChange={handlePageChange}
        currentPage={currentPage}
        totalPages={totalPages}
        onSelectPage={handleSelectPage}
      />
    </Box>
  );
};

export default CarList;
