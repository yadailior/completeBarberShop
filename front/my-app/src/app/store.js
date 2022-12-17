import { configureStore } from '@reduxjs/toolkit';
import  bookReducer  from '../features/booking/BookNowSlice';
import galleryReducer from '../features/gallery/gallerySlice';
import  formReducer  from '../features/form/formSlice';


export const store = configureStore({
  reducer: {
    form:formReducer,
    book:bookReducer,
    gallery:galleryReducer,


  },
});
