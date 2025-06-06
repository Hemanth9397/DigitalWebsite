import {createSlice} from '@reduxjs/toolkit';

const themeSlice = createSlice({
    name: 'theme',
    initialState: {currentTheme: 'dark'},
    reducers: {
        toggleTheme: (state) => {
            state.currentTheme = state.currentTheme === 'dark' ? 'dark' : 'light';
        },
    },
});

export const {toggleTheme} = themeSlice.actions;
export default themeSlice.reducer;