import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button';
import SignIn from '../SignIn';
import Portal from '../../components/Portal';
import {
  LogoSvg,
  SignInSvg,
  LoadingSvg,
  DropDownSvg,
  ManIconSvg,
  LogOutIconSvg,
  HomeSvg,
  ContactsSvg,
} from '../../assets/icons';
import welcomeUserSelector from '../../redux/selectors/getUserSelectors';
import { actionCreatorAuthUser } from '../../redux/actionCreator/actionCreatorAuthUser';
import st from './header.module.scss';

export default function Header() {
  const [isSignIn, setIsSignIn] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const user = useSelector(welcomeUserSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    window.addEventListener('resize', () => setWindowWidth(window.innerWidth));
  }, [windowWidth]);

  useEffect(() => {
    setIsAuth(Boolean(localStorage.getItem('auth')));

    if (isAuth) {
      dispatch(actionCreatorAuthUser(localStorage.getItem('auth')));
    }
  }, [isSignIn, isAuth]);

  const handleSignIn = () => setIsSignIn(!isSignIn);

  const logOutUser = () => {
    localStorage.removeItem('auth');
    setIsAuth(false);
  };

  const authUser = () => {
    if (isAuth) {
      const { title, first, last, large } = user;
      const welcomeUser = (
        <>
          <p className={st.greeting}>
            Hello! {title}, {first} {last}
          </p>
          <DropDownSvg className={st.dropDownSvg} />
          <img className={st.circleAvatar} src={large} />
          <div className={st.dropDownList}>
            <ul className={st.list}>
              <li className={st.listItem}>
                <ManIconSvg />
                <a href="#">Profile</a>
              </li>
              {windowWidth < 768 && (
                <>
                  <li className={st.listItem}>
                    <HomeSvg />
                    <span>Home</span>
                  </li>
                  <li className={st.listItem}>
                    <ContactsSvg />
                    <span>Contacts</span>
                  </li>
                </>
              )}
              <li className={st.listItem} onClick={logOutUser}>
                <LogOutIconSvg />
                <span>Log out</span>
              </li>
            </ul>
          </div>
        </>
      );

      return (
        <div className={st.welcomeUser}>
          {!Object.values(user)[0] ? <LoadingSvg /> : welcomeUser}
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
        {isAuth && windowWidth > 768 && (
          <ul className={st.menuNav}>
            <li className={st.menuNavItem}>Home</li>
            <li className={st.menuNavItem}>Contacts</li>
          </ul>
        )}
        {authUser()}
      </div>
      <div
        className={clsx(st.blurBlock, { [st.isBlur]: isSignIn })}
        onClick={handleSignIn}
      />
      <Portal>{isSignIn && <SignIn handleSignIn={handleSignIn} />}</Portal>
    </header>
  );
}
