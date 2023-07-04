import React from 'react';
import { Input, useColorModeValue } from '@chakra-ui/react';
import { useAppSelector } from '../../store/types/types';

const Search: React.FC = () => {
  const inputBgColor = useColorModeValue('white', 'gray.800');
  const inputColor = useColorModeValue('gray.800', 'white');
  const { loading } = useAppSelector(state => state.cars);

  return (
    <Input
      placeholder="Search..."
      disabled={loading}
      bg={inputBgColor}
      color={inputColor}
      mb="4"
    />
  );
};

export default Search;
