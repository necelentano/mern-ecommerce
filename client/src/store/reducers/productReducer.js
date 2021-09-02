import {
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_ERROR,
} from '../actions/types';

const initialState = {
  createProductInProgress: false,
  createProductError: null,

  getProductsInProgress: false,
  getProductsError: null,

  deleteProductInProgress: false,
  deleteProductError: null,

  updateProductInProgress: false,
  updateProductError: null,

  getOneProductInProgress: false,
  getOneProductError: null,

  allProducts: [],

  oneProduct: null,
};

export const productReducer = (state = initialState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case CREATE_PRODUCT_REQUEST:
      return {
        ...state,
        createProductInProgress: true,
        createProductError: null,
      };
    case CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        createProductInProgress: false,
        createProductError: null,
      };
    case CREATE_PRODUCT_ERROR:
      return {
        ...state,
        createProductInProgress: false,
        createProductError: payload,
      };

    default:
      return state;
  }
};

export default productReducer;
