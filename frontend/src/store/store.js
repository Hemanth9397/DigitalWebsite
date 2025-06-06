import {configureStore} from '@reduxjs/toolkit';
import  modeReducer  from '../slicers/mode/modeSlice';
import  themeReducer from '../slicers/theme/themeSlice';
import  authReducer  from '../slicers/auth/authSlice';

export const store = configureStore({
    reducer : {
        mode: modeReducer,
        theme: themeReducer,
        auth: authReducer,
    },
});
