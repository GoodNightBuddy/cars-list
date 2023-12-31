import React from 'react';
import { Button, ButtonGroup, Center, HStack, Text } from '@chakra-ui/react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface CarTablePaginationProps {
  onPageChange: (selectedPage: number) => void;
  currentPage: number;
  totalPages: number;
  onSelectPage: () => void;
}

const CarTablePagination: React.FC<CarTablePaginationProps> = ({
  onPageChange,
  currentPage,
  totalPages,
  onSelectPage,
}) => {
  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  if (!totalPages) return null;

  return (
    <Center mt={4}>
        <ButtonGroup size="sm">
          <Button
            onClick={() => handlePageClick(currentPage - 1)}
            isDisabled={currentPage === 1}
          >
            <FaChevronLeft />
          </Button>

          <Button onClick={onSelectPage} w="40" >
            <Text w="10" textAlign="start">Page:</Text>
            <Text w="6" textAlign="center" marginRight="1">{currentPage}</Text>
            <Text w="6" textAlign="start">of: </Text>
            <Text w="6" textAlign="center">{totalPages}</Text>
          </Button>

          <Button
            onClick={() => handlePageClick(currentPage + 1)}
            isDisabled={currentPage === totalPages}
          >
            <FaChevronRight />
          </Button>
        </ButtonGroup>
    </Center>
  );
};

export default CarTablePagination;
