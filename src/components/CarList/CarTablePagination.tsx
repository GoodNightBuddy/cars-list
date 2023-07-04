import React from 'react';
import { Button, ButtonGroup, Center, HStack } from '@chakra-ui/react';
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
      <HStack spacing={2}>
        <ButtonGroup size="sm">
          <Button
            onClick={() => handlePageClick(currentPage - 1)}
            isDisabled={currentPage === 1}
          >
            <FaChevronLeft />
          </Button>

          <Button onClick={onSelectPage}>Current Page: {currentPage}</Button>

          <Button
            onClick={() => handlePageClick(currentPage + 1)}
            isDisabled={currentPage === totalPages}
          >
            <FaChevronRight />
          </Button>
        </ButtonGroup>
      </HStack>
    </Center>
  );
};

export default CarTablePagination;
