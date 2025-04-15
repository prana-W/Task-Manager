import { createContext, useContext } from "react";

export const ThemeContext = createContext({
    themeMode: 'light',
    toLightTheme: () => {},
    toDarkTheme: () => {}
})

export const ThemeProvider = ThemeContext.Provider

export const useTheme = () => {
    return useContext(ThemeContext)
}