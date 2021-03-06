import { notification } from 'antd';

import {
  createProduct,
  getAllProductsByCount,
  deleteProduct,
  getOneProduct,
  updateProduct,
  rateProduct,
} from '../../functions/productFunctions';
import { getAllSubCategoriesByParent } from '../../functions/categoryFunctions';

import * as actionTypes from '../actions/types';

// Create product actions

const createProductRequest = () => ({
  type: actionTypes.CREATE_PRODUCT_REQUEST,
});
const createProductSuccess = () => ({
  type: actionTypes.CREATE_PRODUCT_SUCCESS,
});
const createProductError = (e) => ({
  type: actionTypes.CREATE_PRODUCT_ERROR,
  payload: e,
});

export const createProductAction = (product, token) => async (dispatch) => {
  try {
    dispatch(createProductRequest());
    // Request to DB
    await createProduct(product, token);

    dispatch(createProductSuccess());

    notification.success({
      message: `Product ${product.title} successfully created!`,
    });
  } catch (error) {
    dispatch(createProductError(error));
    //here we grab error message from server productController error response with axios
    notification.error({
      message: `Create product ${product.title} failed!`,
      description: error.response.data.errormessage,
    });
  }
};

// Get all subcategories by parent category actions
const getAllSubCategoriesByParentRequest = () => ({
  type: actionTypes.GET_SUBCATEGORIES_BY_PARENT_PRODUCT_REQUEST,
});
const getAllSubCategoriesByParentSuccess = (subCategories) => ({
  type: actionTypes.GET_SUBCATEGORIES_BY_PARENT_PRODUCT_SUCCESS,
  payload: subCategories,
});
const getAllSubCategoriesByParentError = (e) => ({
  type: actionTypes.GET_SUBCATEGORIES_BY_PARENT_PRODUCT_ERROR,
  payload: e,
});

export const clearAllSubCategoriesByParent = () => ({
  type: actionTypes.CLEAR_SUBCATEGORIES_BY_PARENT_PRODUCT,
});

export const getAllSubCategoriesByParentAction =
  (parentCategoryId) => async (dispatch) => {
    try {
      dispatch(getAllSubCategoriesByParentRequest());

      const subCategoriesByParent = await getAllSubCategoriesByParent(
        parentCategoryId
      );

      dispatch(getAllSubCategoriesByParentSuccess(subCategoriesByParent.data));
    } catch (error) {
      dispatch(getAllSubCategoriesByParentError(error));
    }
  };

// Set and clear uploaded images state
export const setImgInUpload = (imgsArray) => ({
  type: actionTypes.SET_UPLOADED_IMAGES,
  payload: imgsArray,
});
export const clearImgInUpload = () => ({
  type: actionTypes.CLEAR_UPLOADED_IMAGES,
});

// Get all products actions

const getAllProductsRequest = () => ({
  type: actionTypes.GET_ALL_PRODUCTS_REQUEST,
});
const getAllProductsSuccess = (subCategories) => ({
  type: actionTypes.GET_ALL_PRODUCTS_SUCCESS,
  payload: subCategories,
});
const getAllProductsError = (e) => ({
  type: actionTypes.GET_ALL_PRODUCTS_ERROR,
  payload: e,
});

export const getAllProductsAction = (count) => async (dispatch) => {
  try {
    dispatch(getAllProductsRequest());
    // Request to DB
    const products = await getAllProductsByCount(count);

    dispatch(getAllProductsSuccess(products.data));
  } catch (error) {
    dispatch(getAllProductsError());
  }
};

export const clearAllProducts = () => ({
  type: actionTypes.CLEAR_ALL_PRODUCTS,
});
// Delete product actions

const deleteProductRequest = () => ({
  type: actionTypes.DELETE_PRODUCT_REQUEST,
});
const deleteProductSuccess = () => ({
  type: actionTypes.DELETE_PRODUCT_SUCCESS,
});
const deleteProductError = (e) => ({
  type: actionTypes.DELETE_PRODUCT_ERROR,
  payload: e,
});

export const deleteProductAction = (slug, token) => async (dispatch) => {
  try {
    dispatch(deleteProductRequest());

    // Request to DB
    await deleteProduct(slug, token);

    dispatch(deleteProductSuccess());
    notification.success({
      message: `Product successfully deleted!`,
    });
  } catch (error) {
    dispatch(deleteProductError(error));
    notification.error({
      message: `Create product failed!`,
      description: error.message,
    });
  }
};

// Get one product actions

const getOneProductRequest = () => ({
  type: actionTypes.GET_ONE_PRODUCT_REQUEST,
});
const getOneProductSuccess = (product) => ({
  type: actionTypes.GET_ONE_PRODUCT_SUCCESS,
  payload: product,
});
const getOneProductError = (e) => ({
  type: actionTypes.GET_ONE_PRODUCT_ERROR,
  payload: e,
});

export const getOneProductAction = (slug) => async (dispatch) => {
  try {
    dispatch(getOneProductRequest());

    // Request to DB
    const product = await getOneProduct(slug);

    dispatch(getOneProductSuccess(product.data));
  } catch (error) {
    dispatch(getOneProductError(error));
  }
};

export const clearOneProduct = () => ({ type: actionTypes.CLAER_ONE_PRODUCT });

// Update product actions

const updateProductRequest = () => ({
  type: actionTypes.UPDATE_PRODUCT_REQUEST,
});
const updateProductSuccess = () => ({
  type: actionTypes.UPDATE_PRODUCT_SUCCESS,
});
const updateProductError = (e) => ({
  type: actionTypes.UPDATE_PRODUCT_ERROR,
  payload: e,
});

export const updateProductAction =
  (slug, updatedProduct, token) => async (dispatch) => {
    try {
      dispatch(updateProductRequest());

      // Request to DB
      const response = await updateProduct(slug, updatedProduct, token);

      dispatch(updateProductSuccess());

      notification.success({
        message: `${response.data.title} product is updated!`,
      });
    } catch (error) {
      dispatch(updateProductError(error));
      notification.error({
        message: `Update product failed!`,
        description: error.message,
      });
    }
  };

// Rate product actions

const rateProductRequest = () => ({ type: actionTypes.RATE_PRODUCT_REQUEST });
const rateProductSuccess = () => ({
  type: actionTypes.RATE_PRODUCT_SUCCESS,
});
const rateProductError = (e) => ({
  type: actionTypes.RATE_PRODUCT_ERROR,
  payload: e,
});

export const rateProductAction =
  (productId, rating, token) => async (dispatch) => {
    try {
      dispatch(rateProductRequest());

      // Request to DB
      await rateProduct(productId, rating, token);

      dispatch(rateProductSuccess());

      notification.success({
        message: `Product get rate. Thanks!`,
      });
    } catch (error) {
      dispatch(rateProductError(error));
      notification.error({
        message: `Rate product failed!`,
        description: error.message,
      });
    }
  };
