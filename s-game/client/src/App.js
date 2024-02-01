import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AddConnection, SocialBond } from './Screens';
import { ThemeProvider, createTheme } from '@mui/material/styles'

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
            <Route path="/" element={<AddConnection />} />
            <Route path="/socialbond" element={<SocialBond />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
