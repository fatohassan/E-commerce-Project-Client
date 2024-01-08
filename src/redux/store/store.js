import {configureStore} from '@reduxjs/toolkit'
import usersReducer from '../slices/users/usersSlice'
import productReducer from '../slices/products/productsSlice';
import categoryReducer from '../slices/categories/categoriesSlice';
import brandsReducer from '../slices/categories/brandsSlice';
import colorsReducer from '../slices/categories/colorsSlice';
import couponsReducer from '../slices/coupons/couponsSlice';
import cartReducer from '../slices/carts/cartsSlice';

const store = configureStore({
    reducer: {
        users: usersReducer,
        products: productReducer,
        categories: categoryReducer,
        brands: brandsReducer,
        colors: colorsReducer,
        carts: cartReducer,
        coupons: couponsReducer,
    }
});

export default store;