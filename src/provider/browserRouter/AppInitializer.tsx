import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  initializeAuth,
  selectAuthLoading,
} from "../../store/slices/authSlice";
import AppRouter from "./router";

function AppInitializer() {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectAuthLoading);

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>; // Или ваш компонент загрузки
  }

  return <AppRouter />;
}
export default AppInitializer;
