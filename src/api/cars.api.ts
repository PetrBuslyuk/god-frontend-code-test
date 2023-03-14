import {ICar} from "../interfaces/Car.interface";

export class CarsApi {
  private static baseUrl: string = 'http://localhost:3000/api/cars.json';

  /**
   * Retrieve all cars list from API
   *
   * @return Promise<ICar[]>
   */
  static getAll(): Promise<ICar[]> {
    return fetch(`${CarsApi.baseUrl}`)
      .then((data) => data.json());
  }
}
