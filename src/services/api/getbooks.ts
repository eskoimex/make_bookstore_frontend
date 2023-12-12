import { AxiosResponse } from 'axios'; 
import { apiClient } from '../index';
import paths from '../paths';

interface IPayload {
  query?: number;
}

export const getBooks = async (payload: IPayload  = {
  query: 1
}): Promise<any> => {
  try {
    const response: AxiosResponse = await apiClient.get(
      paths.GET_BOOKS(payload.query),
    );
    return  response;
  } catch (error) {
    console.error('Error fetching market prices:', error);
    throw error;
  }
};

export default getBooks;
