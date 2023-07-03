import { useState, useEffect } from 'react';
import { Box, VStack, Grid, Button } from '@chakra-ui/react';
import { ColorModeSwitcher } from './components/ColorModeSwitcher/ColorModeSwitcher';
import Search from './components/Search/Search';
import CarTable from './components/Table/CarTable';
import CarTablePagination from './components/Table/CarTablePagination';
import { useAppDispatch, useAppSelector } from './store/types/types';
import { carsActionCreator } from './store/action';
import { saveCarsToStorage } from './utils/storage/cars';
import AddCarModal from './components/AddCarModal/AddCarModal';

export const App = () => {
  const dispatch = useAppDispatch();
  const [showAddCarModal, setShowAddCarModal] = useState(false);

  useEffect(() => {
    dispatch(carsActionCreator.getCars());
  }, [dispatch]);

  const { cars, loading } = useAppSelector((state) => state.cars);
  useEffect(() => {
    saveCarsToStorage(cars);
  }, [cars]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Define the number of items per page here
  const totalPages = Math.ceil(cars.length / itemsPerPage);

  const handlePageChange = (selectedPage: number) => {
    setCurrentPage(selectedPage);
  };

  const handleAddCar = () => {
    setShowAddCarModal(true);
  };

  const handleCloseModal = () => {
    setShowAddCarModal(false);
  };

  const handleSelectPage = () => {
    const selectedPageInput = prompt('Enter a page number:');
    if (selectedPageInput !== null) {
      const selectedPage = parseInt(selectedPageInput, 10);
      if (!isNaN(selectedPage) && selectedPage >= 1 && selectedPage <= totalPages) {
        setCurrentPage(selectedPage);
      }
    }
  };

  return (
    <Box textAlign="center" fontSize="md">
      <Grid minH="100vh" p={3} templateRows="auto 1fr">
        <ColorModeSwitcher justifySelf="flex-start" />
        <Button onClick={handleAddCar} mb="4">Add car</Button>
        {showAddCarModal && <AddCarModal onClose={handleCloseModal} />}
        <VStack spacing={2} align="stretch">
          <Search loading={loading} />
          <Box alignSelf="flex-start" w="100%" h="100%">
            <CarTable
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />

            <CarTablePagination
              onPageChange={handlePageChange}
              currentPage={currentPage}
              totalPages={totalPages}
              onSelectPage={handleSelectPage}
            />
          </Box>
        </VStack>
      </Grid>
    </Box>
  );
};

export default App;
