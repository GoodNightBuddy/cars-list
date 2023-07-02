import React from 'react';
import { Button, ButtonGroup, Center, HStack } from '@chakra-ui/react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useAppSelector } from '../../store/types/types';

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
  const { loading } = useAppSelector(state => state.cars);
  if (loading) {
    return null;
  }

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <Center mt={4}>
      <HStack spacing={2}>
        <ButtonGroup size="sm">
          <Button
            onClick={() => handlePageClick(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <FaChevronLeft />
          </Button>

          <Button onClick={onSelectPage}>Current Page: {currentPage}</Button>

          <Button
            onClick={() => handlePageClick(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <FaChevronRight />
          </Button>
        </ButtonGroup>
      </HStack>
    </Center>
  );
};

export default CarTablePagination;
