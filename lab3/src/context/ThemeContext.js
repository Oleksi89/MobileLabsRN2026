import React, { createContext, useState } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components/native';
import { lightTheme, darkTheme } from '../theme/colors';

export const ThemeContext = createContext();

export const CustomThemeProvider = ({ children }) => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const theme = isDarkTheme ? darkTheme : lightTheme;

    const toggleTheme = () => setIsDarkTheme(prev => !prev);

    return (
        <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
            <StyledThemeProvider theme={theme}>
                {children}
            </StyledThemeProvider>
        </ThemeContext.Provider>
    );
};