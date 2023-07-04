import React, { useState, useRef } from 'react';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../store/types/types';
import { carsActionCreator } from '../../store/action';

const Search: React.FC = () => {
  const dispatch = useAppDispatch();
  const { cars } = useAppSelector(state => state.cars);
  const [searchQuery, setSearchQuery] = useState('');
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  const handleSearch = (query: string) => {
    if (query === '') {
      dispatch(carsActionCreator.removeSearchResult());
      return;
    }

    const filteredCars = cars.filter(car => {
      const lowercaseQuery = query.toLowerCase();
      const carValues = Object.values(car).map(value => {
        if (typeof value === 'number') {
          return value.toString();
        }
        return value;
      });

      const combinedValues = carValues.join(' ').toLowerCase();

      return combinedValues.includes(lowercaseQuery);
    });

    dispatch(carsActionCreator.setSearchResult({ search: filteredCars }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }

    timeoutIdRef.current = setTimeout(() => {
      handleSearch(query);
    }, 700);
  };

  return (
    <InputGroup>
      <Input
        placeholder="Search..."
        value={searchQuery}
        onChange={handleInputChange}
        disabled={false}
        mb="4"
      />
      <InputRightElement>
        <FaSearch />
      </InputRightElement>
    </InputGroup>
  );
};

export default Search;
