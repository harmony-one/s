import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './Screens';
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { MetaMaskProvider } from '@metamask/sdk-react';

function App() {

  const theme = createTheme({
    palette: {
      primary: {
        main: '#00ace8'
      },
      success: {
        main: '#66f9ba'
      },
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div className="App">
        <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
