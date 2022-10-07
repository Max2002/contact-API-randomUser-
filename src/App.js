import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './sections/Home';
import WrapperApp from './sections/WrapperApp';
import Profile from './sections/Profile/indxe';
import Contacts from './sections/Contacts';
import Page404 from './sections/404';
import './assets/styles/general.scss';

export default function App() {
  const renderWrapper = (element) => <WrapperApp>{element}</WrapperApp>;

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={renderWrapper(<Home />)} />
        <Route path="Profile" element={renderWrapper(<Profile />)} />
        <Route path="Contacts" element={renderWrapper(<Contacts />)} />
        <Route path="*" element={renderWrapper(<Page404 />)} />
      </Routes>
    </BrowserRouter>
  );
}
