import { combineReducers } from 'redux';

import authReducer from './authReducer';
import categoryReducer from './categoryReducer';
import subCategoryReducer from './subCategoryReducer';
import productReducer from './productReducer';
import searchReducer from './searchReducer';
import cartReducer from './cartReducer';
import drawerReducer from './drawerReducer';

export default combineReducers({
  auth: authReducer,
  category: categoryReducer,
  sub: subCategoryReducer,
  product: productReducer,
  search: searchReducer,
  cart: cartReducer,
  drawer: drawerReducer,
});
