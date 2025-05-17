// Coding Test API Service

const API_URL = 'http://localhost:8080/api/coding-tests';

export const fetchAllCodingTests = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching coding tests:', error);
    throw error;
  }
};

export const fetchCodingTest = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching coding test with ID ${id}:`, error);
    throw error;
  }
};

export const createCodingTest = async (codingTest) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(codingTest),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating coding test:', error);
    throw error;
  }
};

export const updateCodingTest = async (id, codingTest) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(codingTest),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error updating coding test with ID ${id}:`, error);
    throw error;
  }
};

export const deleteCodingTest = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    
    return true;
  } catch (error) {
    console.error(`Error deleting coding test with ID ${id}:`, error);
    throw error;
  }
};