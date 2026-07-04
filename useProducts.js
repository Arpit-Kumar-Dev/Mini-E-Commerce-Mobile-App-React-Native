import { useCallback, useEffect, useState } from 'react';
import { fetchProducts } from './productsApi';

export const STATUS = {
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

/**
 * Loads the product list and exposes refresh/retry handlers
 * along with a simple status machine for rendering.
 */
export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState(STATUS.LOADING);
  const [errorMessage, setErrorMessage] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async ({ silent = false } = {}) => {
    if (!silent) {
      setStatus(STATUS.LOADING);
    }

    try {
      const data = await fetchProducts();
      setProducts(data);
      setStatus(STATUS.SUCCESS);
      setErrorMessage('');
    } catch (error) {
      setStatus(STATUS.ERROR);
      setErrorMessage(error.message || 'Something went wrong.');
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const refresh = useCallback(async () => {
    setRefreshing(true);
    await load({ silent: true });
    setRefreshing(false);
  }, [load]);

  const retry = useCallback(() => {
    load();
  }, [load]);

  return {
    products,
    status,
    errorMessage,
    refreshing,
    refresh,
    retry,
  };
}
