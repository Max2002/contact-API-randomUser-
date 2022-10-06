import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from './sections/Header';
import { getMyProfile } from './redux/actionCreator/getMyProfile';
import { authSelector } from './redux/selectors/getMyProfile';
import './assets/styles/general.scss';
import st from './app.module.scss';

export default function App() {
  const dispatch = useDispatch();
  const authKey = useSelector(authSelector);

  useEffect(() => {
    if (authKey) {
      dispatch(getMyProfile(localStorage.getItem('auth')));
    }
  }, []);

  return (
    <div className={st.wrapperApp}>
      <Header />
    </div>
  );
}
