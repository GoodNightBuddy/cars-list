import React, { useRef, useState } from 'react';
import {
  Tr,
  Td,
  useColorModeValue,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from '@chakra-ui/react';
import { FaEllipsisV, FaTrashAlt, FaEdit } from 'react-icons/fa';
import { Car, useAppDispatch } from '../../store/types/types';
import { carsActionCreator } from '../../store/action';
import CarEditModal from '../CarEditModal/CarEditModal';

interface CarTableRowProps {
  car: Car
}

const CarTableRow: React.FC<CarTableRowProps> = ({ car}) => {
  const rowBorderColor = useColorModeValue('gray.200', 'white');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const cancelRef = useRef<HTMLButtonElement | null>(null);

  const handleDeleteClick = () => {
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    dispatch(carsActionCreator.removeCar(car.id));
    setDeleteModalOpen(false);
  };

  const handleEditClick = () => {
    setEditModalOpen(true);
  };

  const handleSaveEdit = (editedCar: Car) => {
    setEditModalOpen(false);
    dispatch(carsActionCreator.editCar({ car: editedCar }));
  };

  const handleCancelEdit = () => {
    setEditModalOpen(false);
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
  };

  return (
    <>
      <Tr borderBottom="1px" borderColor={rowBorderColor}>
        <Td paddingY="0" paddingX="3" borderBottom="none">{car.car}</Td>
        <Td paddingY="0" paddingX="3" borderBottom="none">{car.car_model}</Td>
        <Td paddingY="0" paddingX="3" borderBottom="none">{car.car_vin}</Td>
        <Td paddingY="0" paddingX="3" borderBottom="none">{car.car_color}</Td>
        <Td paddingY="0" paddingX="3" borderBottom="none">{car.car_model_year}</Td>
        <Td paddingY="0" paddingX="3" borderBottom="none">{car.price}</Td>
        <Td paddingY="0" paddingX="3" borderBottom="none">
          {car.availability ? 'Available' : 'Unavailable'}
        </Td>
        <Td borderBottom="none">
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<FaEllipsisV />}
              variant="ghost"
              size="sm"
              aria-label="Actions"
            />
            <MenuList>
              <MenuItem icon={<FaEdit />} onClick={handleEditClick}>
                Edit
              </MenuItem>
              <MenuItem icon={<FaTrashAlt />} onClick={handleDeleteClick}>
                Delete
              </MenuItem>
            </MenuList>
          </Menu>
        </Td>
      </Tr>
      {editModalOpen && (
        <CarEditModal
          car={car}
          onSave={handleSaveEdit}
          onClose={handleCancelEdit}
        />
      )}
      <AlertDialog
        isOpen={deleteModalOpen}
        leastDestructiveRef={cancelRef}
        onClose={handleCancelDelete}
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Delete Confirmation</AlertDialogHeader>
          <AlertDialogBody>
            Are you sure you want to delete this car?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button onClick={handleCancelDelete} ref={cancelRef} >Cancel</Button>
            <Button colorScheme="red" onClick={handleDeleteConfirm} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CarTableRow;
