import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { store } from '../store';
import { useDispatch } from 'react-redux';

interface Car {
  id: number;
  car: string;
  car_model: string;
  car_color: string;
  car_model_year: number | string;
  car_vin: string;
  price: string;
  availability: boolean;
}

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
const useAppDispatch: () => AppDispatch = useDispatch
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { useAppSelector, useAppDispatch };
export type {
  Car,
  RootState,
  AppDispatch,
};