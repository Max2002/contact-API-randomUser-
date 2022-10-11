import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { getMyProfile } from './redux/actionCreator/getMyProfile';
import Header from './sections/Header';
import Home from './sections/Home';
import Profile from './sections/Profile/indxe';
import Contacts from './sections/Contacts';
import Page404 from './sections/404';
import { authSelector } from './redux/selectors/getMyProfile';
import { CONTACTS, PROFILE, ERROR } from './constans/routes';
import st from './app.module.scss';
import './assets/styles/general.scss';

export default function App() {
  const dispatch = useDispatch();
  const authKey = useSelector(authSelector);

  useEffect(() => {
    if (authKey) {
      dispatch(getMyProfile(authKey));
    }
  }, [authKey]);

  return (
    <div className={st.wrapperApp}>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        {authKey && <Route path={PROFILE} element={<Profile />} />}
        <Route path={CONTACTS} element={<Contacts />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
      <Footer />
    </div>
  );
}
