const API_URL = 'https://fakestoreapi.com/products';

/**
 * Fetches the product catalog.
 * Throws an Error with a user-friendly message on failure.
 */
export async function fetchProducts() {
  let response;

  try {
    response = await fetch(API_URL);
  } catch (networkError) {
    throw new Error('Unable to reach the server. Check your connection.');
  }

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}
