import axios from 'axios';

const API_URL = 'https://fakestoreapi.com/products';

// Função para buscar produtos
export const fetchProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar os produtos:', error);
    return [];
  }
};
