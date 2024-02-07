import React, { createContext, useState } from 'react';

type ColorTheme = {
  textColor: string;
  colorBg: string;
};

const lightTheme: ColorTheme = {
  textColor: 'black',
  colorBg: 'white',
};
const darkTheme: ColorTheme = {
  textColor: 'white',
  colorBg: 'black',
};

type ThemeContext = {
  isLight: boolean;
  colors: ColorTheme;
  setIsLight: (_: boolean) => void;
};

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLight, setIsLight] = useState(false);

  const Context = createContext<ThemeContext>({
    isLight,
    colors: isLight ? lightTheme : darkTheme,
    setIsLight,
  });

  return (
    <Context.Provider
      value={{ isLight, colors: isLight ? lightTheme : darkTheme, setIsLight }}
    >
      {children}
    </Context.Provider>
  );
};
export default ThemeProvider;
