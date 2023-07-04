import { useState, useEffect } from 'react';
import { Alert, AlertDescription, AlertIcon, Box, Grid, Spinner, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, FormControl, FormLabel, Input } from '@chakra-ui/react';
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

  const { cars, loading, error, search } = useAppSelector(state => state.cars);
  useEffect(() => {
    if (cars.length) {
      saveCarsToStorage(cars);
    }
  }, [cars]);

  const currentCars = search ? search : cars;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Define the number of items per page here
  const totalPages = Math.ceil(currentCars.length / itemsPerPage);

  const handlePageChange = (selectedPage: number) => {
    setCurrentPage(selectedPage);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPageInput, setSelectedPageInput] = useState('');

  const handleSelectPage = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalConfirm = () => {
    const selectedPage = parseInt(selectedPageInput, 10);
    if (
      !isNaN(selectedPage) &&
      selectedPage >= 1 &&
      selectedPage <= totalPages
    ) {
      setCurrentPage(selectedPage);
    }
    setIsModalOpen(false);
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
        cars={currentCars}
      />

      <CarTablePagination
        onPageChange={handlePageChange}
        currentPage={currentPage}
        totalPages={totalPages}
        onSelectPage={handleSelectPage}
      />

      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enter a page number</ModalHeader>
          <ModalBody>
            <FormControl>
              <FormLabel>Page Number:</FormLabel>
              <Input
                type="number"
                value={selectedPageInput}
                onChange={(e) => setSelectedPageInput(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleModalConfirm}>
              Confirm
            </Button>
            <Button variant="ghost" ml={3} onClick={handleModalClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CarList;
