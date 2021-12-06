import { notification } from 'antd';
import * as actionTypes from '../actions/types';

import {
  createUserCart,
  getUserCart,
  emptyUserCart,
  saveUserAddress,
} from '../../functions/userFunctions';

export const addToCart = (product) => ({
  type: actionTypes.ADD_TO_CART,
  payload: product,
});
export const removeFromCart = (id) => ({
  type: actionTypes.REMOVE_FROM_CART,
  payload: { id },
});
export const clearCart = () => ({ type: actionTypes.CLEAR_CART });
export const setItemQuantity = ({ quantity, id }) => ({
  type: actionTypes.SET_ITEM_QUANTITY,
  payload: { quantity, id },
});

// Create cart actions

const createCartRequest = () => ({ type: actionTypes.CREATE_CART_REQUEST });
const createCartSuccess = () => ({
  type: actionTypes.CREATE_CART_SUCCESS,
});
const createCartError = (e) => ({
  type: actionTypes.CREATE_CART_ERROR,
  payload: e,
});

export const createCartAction = (cart, token) => async (dispatch) => {
  try {
    dispatch(createCartRequest());
    // Request to DB
    const response = await createUserCart(cart, token);
    if (response.data.ok) {
      dispatch(createCartSuccess());
      notification.success({
        message: `Product cart saved to user history!`,
      });
    }
  } catch (error) {
    dispatch(createCartError(error));
    notification.error({
      message: `Product cart save error!`,
    });
    console.log('createCartAction error', error);
  }
};

// Get cart actions
const getCartRequest = () => ({ type: actionTypes.GET_CART_REQUEST });
const getCartSuccess = (cart) => ({
  type: actionTypes.GET_CART_SUCCESS,
  payload: cart,
});
const getCartError = (e) => ({
  type: actionTypes.GET_CART_ERROR,
  payload: e,
});

export const getCartAction = (token) => async (dispatch) => {
  try {
    dispatch(getCartRequest());

    // Request to DB
    const cart = await getUserCart(token);
    dispatch(getCartSuccess(cart.data));
  } catch (error) {
    dispatch(getCartError(error));
  }
};

// Empty user cart on DB actions
const emptyCartRequest = () => ({ type: actionTypes.EMPTY_CART_REQUEST });
const emptyCartSuccess = () => ({
  type: actionTypes.EMPTY_CART_SUCCESS,
});
const emptyCartError = (e) => ({
  type: actionTypes.EMPTY_CART_ERROR,
  payload: e,
});

export const emptyCartInDBAction = (token) => async (dispatch) => {
  try {
    dispatch(emptyCartRequest());

    // Request to DB
    await emptyUserCart(token);

    dispatch(emptyCartSuccess());
    notification.success({
      message: `Cart is empty now. You can continue shopping!`,
    });
  } catch (error) {
    dispatch(emptyCartError(error));
  }
};

// Save user address on Checkout page

const saveUserAddressRequest = () => ({
  type: actionTypes.SAVE_USER_ADDRESS_REQUEST,
});
const saveUserAddressSuccess = () => ({
  type: actionTypes.SAVE_USER_ADDRESS_SUCCESS,
});
const saveUserAddressError = (e) => ({
  type: actionTypes.SAVE_USER_ADDRESS_ERROR,
  payload: e,
});

export const saveUserAddressAction = (address, token) => async (dispatch) => {
  try {
    dispatch(saveUserAddressRequest());
    // Request to DB
    const response = await saveUserAddress(address, token);
    if (response.data.addressSaved) {
      dispatch(saveUserAddressSuccess());
      notification.success({
        message: `Shipping address saved!`,
      });
    }
  } catch (error) {
    dispatch(saveUserAddressError(error));
    notification.error({
      message: `Shipping address save error!`,
    });
    console.log('saveUserAddressAction error', error);
  }
};
