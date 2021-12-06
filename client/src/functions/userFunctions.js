import axios from 'axios';

export const createUserCart = async (cart, authToken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/user/cart`,
    { cart },
    {
      headers: {
        authToken,
      },
    }
  );
};

export const getUserCart = async (authToken) => {
  return await axios.get(`${process.env.REACT_APP_API}/user/cart`, {
    headers: {
      authToken,
    },
  });
};

export const emptyUserCart = async (authToken) => {
  return await axios.delete(`${process.env.REACT_APP_API}/user/cart`, {
    headers: {
      authToken,
    },
  });
};

export const saveUserAddress = async (address, authToken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/user/address`,
    { address },
    {
      headers: {
        authToken,
      },
    }
  );
};

export const getUserAddress = async (authToken) => {
  return await axios.get(`${process.env.REACT_APP_API}/user/address`, {
    headers: {
      authToken,
    },
  });
};
