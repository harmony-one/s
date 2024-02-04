import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AddConnection, SocialBond, ENS, Connections } from './Screens';
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Auth from './Screens/Auth';

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
            <Route path="/ens" element={<ENS />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
