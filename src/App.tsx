import { useState, useEffect } from 'react';
import { Box, VStack, Grid } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import Search from './components/Search/Search';
import CarTable from './components/Table/CarTable';
import CarTablePagination from './components/Table/CarTablePagination';
import { useAppDispatch, useAppSelector } from './store/types/types';
import { carsActionCreator } from './store/action';

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('init dispatch');

    dispatch(carsActionCreator.getCars());
  }, [dispatch]);

  const { cars, loading } = useAppSelector(state => state.cars);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Define the number of items per page here
  // const [showAll, setShowAll] = useState(false);
  const totalPages = Math.ceil(cars.length / itemsPerPage);

  const handlePageChange = (selectedPage: number) => {
    setCurrentPage(selectedPage);
  };

  // const handleShowAll = () => {
  //   setShowAll(true);
  // };

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

  return (
    <Box textAlign="center" fontSize="md">
      <Grid minH="100vh" p={3} templateRows="auto 1fr">
        <ColorModeSwitcher justifySelf="flex-start" />
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
