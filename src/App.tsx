import { useState } from 'react';
import { Box, Button, Flex } from '@chakra-ui/react';
import { ColorModeSwitcher } from './components/ColorModeSwitcher/ColorModeSwitcher';
import Search from './components/Search/Search';
import AddCarModal from './components/AddCarModal/AddCarModal';
import CarList from './components/CarList/CarList';

export const App = () => {
  const [showAddCarModal, setShowAddCarModal] = useState(false);

  const handleAddCar = () => {
    setShowAddCarModal(true);
  };

  const handleCloseModal = () => {
    setShowAddCarModal(false);
  };

  return (
    <Box textAlign="center" fontSize="md">
      <Flex direction="column" minH="100vh" p={3}>
        <ColorModeSwitcher alignSelf="flex-start" />
        <Button onClick={handleAddCar} mb="4">
          Add car
        </Button>
        {showAddCarModal && <AddCarModal onClose={handleCloseModal} />}
        <Search />
        <Box flex={1}>
          <CarList />
        </Box>
      </Flex>
    </Box>
  );
};

export default App;
