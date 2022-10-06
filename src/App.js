import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './sections/Home';
import WrapperApp from './sections/WrapperApp';
import './assets/styles/general.scss';
import Profile from './sections/Profile/indxe';
import Contacts from './sections/Contacts';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={
            <WrapperApp>
              <Home />
            </WrapperApp>
          }
        />
        <Route
          path="Profile"
          element={
            <WrapperApp>
              <Profile />
            </WrapperApp>
          }
        />
        <Route
          path="Contacts"
          element={
            <WrapperApp>
              <Contacts />
            </WrapperApp>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
