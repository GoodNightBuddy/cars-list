import React from 'react';
import { Input, useColorModeValue } from '@chakra-ui/react';

interface SearchProps {
  loading: boolean;
}

const Search: React.FC<SearchProps> = ({ loading }) => {
  const inputBgColor = useColorModeValue('white', 'gray.800');
  const inputColor = useColorModeValue('gray.800', 'white');

  return (
    <Input
      placeholder="Search..."
      disabled={loading}
      bg={inputBgColor}
      color={inputColor}
      mb="2"
    />
  );
};

export default Search;
