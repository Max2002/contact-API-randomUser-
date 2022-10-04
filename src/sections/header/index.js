import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { useWindowWidth } from '../../hooks/useWindowWidth';
import { Portal, Menu, Button } from '../../components';
import SignIn from '../SignIn';
import {
  DropDownSvg,
  LoadingSvg,
  LogoSvg,
  SignInSvg,
} from '../../assets/icons';
import { getMyProfile } from '../../redux/actionCreator/getMyProfile';
import {
  fullNameSelector,
  getAvatar,
  getStatus,
} from '../../redux/selectors/getMyProfile';
import st from './styles.module.scss';

const welcomeUserSelector = createSelector(
  [fullNameSelector, getAvatar, getStatus],
  (fullName, large, loading) => ({
    fullName,
    large,
    loading,
  }),
);

export default function Header() {
  const [isSignIn, setIsSignIn] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const { fullName, large, loading } = useSelector(welcomeUserSelector);
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

  const renderAuthBlock = () => {
    const welcomeUser = (
      <>
        <p className={st.greeting}>Hello! {fullName}</p>
        <DropDownSvg className={st.dropDownSvg} />
        <img className={st.circleAvatar} src={large} />
        <div className={st.dropDownList}>
          <Menu windowWidth={getWindowWidth} logOutUser={logOutUser} />
        </div>
      </>
    );

    if (isAuth) {
      return (
        <div className={st.welcomeUser}>
          {loading ? <LoadingSvg /> : welcomeUser}
        </div>
      );
    }

    return (
      <Button type="button" className={st.signInBtn} onClick={handleSignIn}>
        <SignInSvg />
        <span>Sign In</span>
      </Button>
    );
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
        {renderAuthBlock()}
      </div>
      <div
        className={clsx(st.blurBlock, { [st.isBlur]: isSignIn })}
        onClick={handleSignIn}
      />
      <Portal>{isSignIn && <SignIn handleSignIn={handleSignIn} />}</Portal>
    </header>
  );
}
