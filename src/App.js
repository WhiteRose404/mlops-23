import React from 'react';
import { ChakraProvider, extendTheme, useColorModeValue } from '@chakra-ui/react';
import MainEntery from './pages/Main';

function App() {
  const styles = {
    global: {
      body: {
        bg: useColorModeValue("#2C2C2C", "#2C2C2C"),
      },
    },
  };
  const config = {
    initialColorMode: 'light',
    useSystemColorMode: false,
  };

  const theme = extendTheme({
    styles, config,
  });

  return (
    <ChakraProvider theme={theme}>
      <MainEntery />
    </ChakraProvider>
  );
}

export default App;
