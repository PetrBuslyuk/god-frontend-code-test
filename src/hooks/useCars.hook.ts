import { useEffect, useState } from "react";
import { ICar } from "../interfaces/Car.interface";
import { CarsApi } from "../api/cars.api";

/**
 * Hook for storing and processing data, related to Cars API
 */
export const useCars = () => {
  const [carsState, setCarsState] = useState<ICar[]>([]);
  const [carsFilteredState, setCarsFilteredState] = useState<ICar[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  /**
   * Retrieve all cars from BE
   */
  const fetchAll = async () => {
    const result = await CarsApi.getAll();
    setCarsState(result);
    setCarsFilteredState(result);
    setIsLoading(false);
  };

  /**
   * Filter cars by bodyType or modelName or modelType
   *
   * @param search {String} - search string
   */
  const searchCars = (search: string): void => {
    if (!search) {
      setCarsFilteredState(carsState);
      return;
    }
    const searchLc = search.toLowerCase();

    // Search by one of the properties
    const filtered: ICar[] = carsState!.filter((car: ICar) => {
      return car.bodyType.toLowerCase().includes(searchLc)
      || car.modelName.toLowerCase().includes(searchLc)
      || car.modelType.toLowerCase().includes(searchLc);
    });

    setCarsFilteredState(filtered);
  }

  useEffect(() => {
    fetchAll();
  }, []);

  return { cars: carsFilteredState, searchCars, isLoading };
};
