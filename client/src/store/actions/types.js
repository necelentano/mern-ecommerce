// AUTH TYPES
export const AUTH_INFO_REQUEST = 'AUTH_INFO_REQUEST';
export const AUTH_INFO_SUCCESS = 'AUTH_INFO_SUCCESS';
export const AUTH_INFO_ERROR = 'AUTH_INFO_ERROR';

export const SEND_EMAIL_REQUEST = 'SEND_EMAIL_REQUEST';
export const SEND_EMAIL_SUCCESS = 'SEND_EMAIL_SUCCESS';
export const SEND_EMAIL_ERROR = 'SEND_EMAIL_ERROR';

export const SEND_FORGOT_PASSWORD_EMAIL_REQUEST =
  'SEND_FORGOT_PASSWORD_EMAIL_REQUEST';
export const SEND_FORGOT_PASSWORD_EMAIL_SUCCESS =
  'SEND_FORGOT_PASSWORD_EMAIL_SUCCESS';
export const SEND_FORGOT_PASSWORD_EMAIL_ERROR =
  'SEND_FORGOT_PASSWORD_EMAIL_ERROR';

export const UPDATE_PASSWORD_REQUEST = 'UPDATE_PASSWORD_REQUEST';
export const UPDATE_PASSWORD_SUCCESS = 'UPDATE_PASSWORD_SUCCESS';
export const UPDATE_PASSWORD_ERROR = 'UPDATE_PASSWORD_ERROR';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const LOGIN_GOOGLE_REQUEST = 'LOGIN_GOOGLE_REQUEST';
export const LOGIN_GOOGLE_SUCCESS = 'LOGIN_GOOGLE_SUCCESS';
export const LOGIN_GOOGLE_ERROR = 'LOGIN_GOOGLE_ERROR';

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_ERROR = 'SIGNUP_ERROR';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_ERROR = 'LOGOUT_ERROR';

// CATEGORY TYPES
export const CREATE_CATEGORY_REQUEST = 'CREATE_CATEGORY_REQUEST';
export const CREATE_CATEGORY_SUCCESS = 'CREATE_CATEGORY_SUCCESS';
export const CREATE_CATEGORY_ERROR = 'CREATE_CATEGORY_ERROR';

export const GET_CATEGORIES_REQUEST = 'GET_CATEGORIES_REQUEST';
export const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS';
export const GET_CATEGORIES_ERROR = 'GET_CATEGORIES_ERROR';

export const DELETE_CATEGORY_REQUEST = 'DELETE_CATEGORY_REQUEST';
export const DELETE_CATEGORY_SUCCESS = 'DELETE_CATEGORY_SUCCESS';
export const DELETE_CATEGORY_ERROR = 'DELETE_CATEGORY_ERROR';

export const GET_ONE_CATEGORY_REQUEST = 'GET_ONE_CATEGORY_REQUEST';
export const GET_ONE_CATEGORY_SUCCESS = 'GET_ONE_CATEGORY_SUCCESS';
export const GET_ONE_CATEGORY_ERROR = 'GET_ONE_CATEGORY_ERROR';

export const UPDATE_CATEGORY_REQUEST = 'UPDATE_CATEGORY_REQUEST';
export const UPDATE_CATEGORY_SUCCESS = 'UPDATE_CATEGORY_SUCCESS';
export const UPDATE_CATEGORY_ERROR = 'UPDATE_CATEGORY_ERROR';

// SUB CATEGORY TYPES
export const CREATE_SUB_CATEGORY_REQUEST = 'CREATE_SUB_CATEGORY_REQUEST';
export const CREATE_SUB_CATEGORY_SUCCESS = 'CREATE_SUB_CATEGORY_SUCCESS';
export const CREATE_SUB_CATEGORY_ERROR = 'CREATE_SUB_CATEGORY_ERROR';

export const GET_SUB_CATEGORIES_REQUEST = 'GET_SUB_CATEGORIES_REQUEST';
export const GET_SUB_CATEGORIES_SUCCESS = 'GET_SUB_CATEGORIES_SUCCESS';
export const GET_SUB_CATEGORIES_ERROR = 'GET_SUB_CATEGORIES_ERROR';

export const DELETE_SUB_CATEGORY_REQUEST = 'DELETE_SUB_CATEGORY_REQUEST';
export const DELETE_SUB_CATEGORY_SUCCESS = 'DELETE_SUB_CATEGORY_SUCCESS';
export const DELETE_SUB_CATEGORY_ERROR = 'DELETE_SUB_CATEGORY_ERROR';

export const GET_ONE_SUB_CATEGORY_REQUEST = 'GET_ONE_SUB_CATEGORY_REQUEST';
export const GET_ONE_SUB_CATEGORY_SUCCESS = 'GET_ONE_SUB_CATEGORY_SUCCESS';
export const GET_ONE_SUB_CATEGORY_ERROR = 'GET_ONE_SUB_CATEGORY_ERROR';

export const UPDATE_SUB_CATEGORY_REQUEST = 'UPDATE_SUB_CATEGORY_REQUEST';
export const UPDATE_SUB_CATEGORY_SUCCESS = 'UPDATE_SUB_CATEGORY_SUCCESS';
export const UPDATE_SUB_CATEGORY_ERROR = 'UPDATE_SUB_CATEGORY_ERROR';

export const SET_PARENT_CATEGORY = 'SET_PARENT_CATEGORY';
export const CLEAR_PARENT_CATEGORY = 'CLEAR_PARENT_CATEGORY';

// PRODUCT TYPES
export const CREATE_PRODUCT_REQUEST = 'CREATE_PRODUCT_REQUEST';
export const CREATE_PRODUCT_SUCCESS = 'CREATE_PRODUCT_SUCCESS';
export const CREATE_PRODUCT_ERROR = 'CREATE_PRODUCT_ERROR';

export const GET_SUBCATEGORIES_BY_PARENT_PRODUCT_REQUEST =
  'GET_SUBCATEGORIES_BY_PARENT_PRODUCT_REQUEST';
export const GET_SUBCATEGORIES_BY_PARENT_PRODUCT_SUCCESS =
  'GET_SUBCATEGORIES_BY_PARENT_PRODUCT_SUCCESS';
export const GET_SUBCATEGORIES_BY_PARENT_PRODUCT_ERROR =
  'GET_SUBCATEGORIES_BY_PARENT_PRODUCT_ERROR';
export const CLEAR_SUBCATEGORIES_BY_PARENT_PRODUCT =
  'CLEAR_SUBCATEGORIES_BY_PARENT_PRODUCT';

export const SET_UPLOADED_IMAGES = 'SET_UPLOADED_IMAGES';
export const CLEAR_UPLOADED_IMAGES = 'CLEAR_UPLOADED_IMAGES';

export const GET_ALL_PRODUCTS_REQUEST = 'GET_ALL_PRODUCTS_REQUEST';
export const GET_ALL_PRODUCTS_SUCCESS = 'GET_ALL_PRODUCTS_SUCCESS';
export const GET_ALL_PRODUCTS_ERROR = 'GET_ALL_PRODUCTS_ERROR';
export const CLEAR_ALL_PRODUCTS = 'CLEAR_ALL_PRODUCTS';

export const DELETE_PRODUCT_REQUEST = 'DELETE_PRODUCT_REQUEST';
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';
export const DELETE_PRODUCT_ERROR = 'DELETE_PRODUCT_ERROR';

export const GET_ONE_PRODUCT_REQUEST = 'GET_ONE_PRODUCT_REQUEST';
export const GET_ONE_PRODUCT_SUCCESS = 'GET_ONE_PRODUCT_SUCCESS';
export const GET_ONE_PRODUCT_ERROR = 'GET_ONE_PRODUCT_ERROR';
export const CLAER_ONE_PRODUCT = 'CLAER_ONE_PRODUCT';

export const UPDATE_PRODUCT_REQUEST = 'UPDATE_PRODUCT_REQUEST';
export const UPDATE_PRODUCT_SUCCESS = 'UPDATE_PRODUCT_SUCCESS';
export const UPDATE_PRODUCT_ERROR = 'UPDATE_PRODUCT_ERROR';

export const RATE_PRODUCT_REQUEST = 'RATE_PRODUCT_REQUEST';
export const RATE_PRODUCT_SUCCESS = 'RATE_PRODUCT_SUCCESS';
export const RATE_PRODUCT_ERROR = 'RATE_PRODUCT_ERROR';

// SEARCH TYPES
export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';
export const CLEAR_SEARCH_QUERY = 'CLEAR_SEARCH_QUERY';

// CART AND CHECKOUT TYPES
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const CLEAR_CART = 'CLEAR_CART';
export const SET_ITEM_QUANTITY = 'SET_ITEM_QUANTITY';

export const CREATE_CART_REQUEST = 'CREATE_CART_REQUEST';
export const CREATE_CART_SUCCESS = 'CREATE_CART_SUCCESS';
export const CREATE_CART_ERROR = 'CREATE_CART_ERROR';

export const GET_CART_REQUEST = 'GET_CART_REQUEST';
export const GET_CART_SUCCESS = 'GET_CART_SUCCESS';
export const GET_CART_ERROR = 'GET_CART_ERROR';

export const EMPTY_CART_REQUEST = 'EMPTY_CART_REQUEST';
export const EMPTY_CART_SUCCESS = 'EMPTY_CART_SUCCESS';
export const EMPTY_CART_ERROR = 'EMPTY_CART_ERROR';

export const SAVE_USER_ADDRESS_REQUEST = 'SAVE_USER_ADDRESS_REQUEST';
export const SAVE_USER_ADDRESS_SUCCESS = 'SAVE_USER_ADDRESS_SUCCESS';
export const SAVE_USER_ADDRESS_ERROR = 'SAVE_USER_ADDRESS_ERROR';

export const GET_USER_ADDRESS_REQUEST = 'GET_USER_ADDRESS_REQUEST';
export const GET_USER_ADDRESS_SUCCESS = 'GET_USER_ADDRESS_SUCCESS';
export const GET_USER_ADDRESS_ERROR = 'GET_USER_ADDRESS_ERROR';

export const APPLY_COUPON_TO_CART_REQUEST = 'APPLY_COUPON_TO_CART_REQUEST';
export const APPLY_COUPON_TO_CART_SUCCESS = 'APPLY_COUPON_TO_CART_SUCCESS';
export const APPLY_COUPON_TO_CART_FAILURE = 'APPLY_COUPON_TO_CART_FAILURE';
export const APPLY_COUPON_TO_CART_ERROR = 'APPLY_COUPON_TO_CART_ERROR';

// DRAWER VISABILITY
export const SET_CART_DRAWER_VISABILITY = 'SET_CART_DRAWER_VISABILITY';
export const SET_MOBILE_DRAWER_VISABILITY = 'SET_MOBILE_DRAWER_VISABILITY';

// COUPON TYPES
export const GET_ALL_COUPONS_REQUEST = 'GET_ALL_COUPONS_REQUEST';
export const GET_ALL_COUPONS_SUCCESS = 'GET_ALL_COUPONS_SUCCESS';
export const GET_ALL_COUPONS_ERROR = 'GET_ALL_COUPONS_ERROR';

export const CREATE_COUPON_REQUEST = 'CREATE_COUPON_REQUEST';
export const CREATE_COUPON_SUCCESS = 'CREATE_COUPON_SUCCESS';
export const CREATE_COUPON_ERROR = 'CREATE_COUPON_ERROR';

export const DELETE_COUPON_REQUEST = 'DELETE_COUPON_REQUEST';
export const DELETE_COUPON_SUCCESS = 'DELETE_COUPON_SUCCESS';
export const DELETE_COUPON_ERROR = 'DELETE_COUPON_ERROR';

// ORDER TYPES
export const GET_ALL_ORDERS_BY_ADMIN_REQUEST =
  'GET_ALL_ORDERS_BY_ADMIN_REQUEST';
export const GET_ALL_ORDERS_BY_ADMIN_SUCCESS =
  'GET_ALL_ORDERS_BY_ADMIN_SUCCESS';
export const GET_ALL_ORDERS_BY_ADMIN_ERROR = 'GET_ALL_ORDERS_BY_ADMIN_ERROR';

export const GET_ALL_ORDERS_BY_USER_REQUEST = 'GET_ALL_ORDERS_BY_USER_REQUEST';
export const GET_ALL_ORDERS_BY_USER_SUCCESS = 'GET_ALL_ORDERS_BY_USER_SUCCESS';
export const GET_ALL_ORDERS_BY_USER_ERROR = 'GET_ALL_ORDERS_BY_USER_ERROR';

export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_ERROR = 'CREATE_ORDER_ERROR';

export const CREATE_ORDER_CASH_PAYMENT_REQUEST =
  'CREATE_ORDER_CASH_PAYMENT_REQUEST';
export const CREATE_ORDER_CASH_PAYMENT_SUCCESS =
  'CREATE_ORDER_CASH_PAYMENT_SUCCESS';
export const CREATE_ORDER_CASH_PAYMENT_ERROR =
  'CREATE_ORDER_CASH_PAYMENT_ERROR';

export const DELETE_ORDER_REQUEST = 'DELETE_ORDER_REQUEST';
export const DELETE_ORDER_SUCCESS = 'DELETE_ORDER_SUCCESS';
export const DELETE_ORDER_ERROR = 'DELETE_ORDER_ERROR';

export const UPDATE_ORDER_STATUS_REQUEST = 'UPDATE_ORDER_STATUS_REQUEST';
export const UPDATE_ORDER_STATUS_SUCCESS = 'UPDATE_ORDER_STATUS_SUCCESS';
export const UPDATE_ORDER_STATUS_ERROR = 'UPDATE_ORDER_STATUS_ERROR';

// WISHLIST TYPES

export const GET_WISHLIST_REQUEST = 'GET_WISHLIST_REQUEST';
export const GET_WISHLIST_SUCCESS = 'GET_WISHLIST_SUCCESS';
export const GET_WISHLIST_ERROR = 'GET_WISHLIST_ERROR';

export const ADD_TO_WISHLIST_REQUEST = 'ADD_TO_WISHLIST_REQUEST';
export const ADD_TO_WISHLIST_SUCCESS = 'ADD_TO_WISHLIST_SUCCESS';
export const ADD_TO_WISHLIST_ERROR = 'ADD_TO_WISHLIST_ERROR';

export const DELETE_FROM_WISHLIST_REQUEST = 'DELETE_FROM_WISHLIST_REQUEST';
export const DELETE_FROM_WISHLIST_SUCCESS = 'DELETE_FROM_WISHLIST_SUCCESS';
export const DELETE_FROM_WISHLIST_ERROR = 'DELETE_FROM_WISHLIST_ERROR';

// CASH ON DELIVERY TYPES
export const SET_CASH_ON_DELIVERY = 'SET_CASH_ON_DELIVERY';
