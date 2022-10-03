import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { useWindowWidth } from '../../hooks/useWindowWidth';
import { Portal, Menu } from '../../components';
import SignIn from '../SignIn';
import { LogoSvg } from '../../assets/icons';
import { getMyProfile } from '../../redux/actionCreator/getMyProfile';
import {
  fullNameSelector,
  getAvatar,
  getStatus,
} from '../../redux/selectors/getMyProfile';
import st from './styles.module.scss';

const welcomeUserSelector = createSelector(
  [fullNameSelector, getAvatar, getStatus],
  (fullName, large, status) => ({
    fullName,
    large,
    status,
  }),
);

export default function Header() {
  const [isSignIn, setIsSignIn] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const user = useSelector(welcomeUserSelector);
  const getWindowWidth = useWindowWidth();
  const dispatch = useDispatch();

  useEffect(() => {
    setIsAuth(Boolean(localStorage.getItem('auth')));

    if (isAuth) {
      dispatch(getMyProfile(localStorage.getItem('auth')));
    }
  }, [isSignIn, isAuth]);

  const handleSignIn = () => setIsSignIn(!isSignIn);

  const logOutUser = () => {
    localStorage.removeItem('auth');
    setIsAuth(false);
  };

  return (
    <header className={st.header}>
      <LogoSvg />
      <div className={clsx(st.menu, { [st.menuIsAuth]: !isAuth })}>
        {isAuth && getWindowWidth > 768 && (
          <ul className={st.menuNav}>
            <li className={st.menuNavItem}>Home</li>
            <li className={st.menuNavItem}>Contacts</li>
          </ul>
        )}
        <Menu
          handleSignIn={handleSignIn}
          logOutUser={logOutUser}
          user={user}
          windowWidth={getWindowWidth}
          isAuth={isAuth}
        />
      </div>
      <div
        className={clsx(st.blurBlock, { [st.isBlur]: isSignIn })}
        onClick={handleSignIn}
      />
      <Portal>{isSignIn && <SignIn handleSignIn={handleSignIn} />}</Portal>
    </header>
  );
}
