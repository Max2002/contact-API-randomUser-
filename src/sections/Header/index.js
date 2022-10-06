import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import clsx from 'clsx';
import { useDeviceWidth } from '../../hooks/useWindowWidth';
import { Portal, Menu, Button } from '../../components';
import SignIn from '../SignIn';
import Message from '../../components/Message';
import {
  DropDownSvg,
  LoadingSvg,
  LogoSvg,
  ManIconSvg,
  SignInSvg,
  LogOutIconSvg,
  HomeSvg,
  ContactsSvg,
  SuccessSvg,
} from '../../assets/icons';
import {
  fullNameSelector,
  avatarSelector,
  loadingSelector,
  authSelector,
} from '../../redux/selectors/getMyProfile';
import st from './styles.module.scss';
import { logOut } from '../../redux/actionCreator/getMyProfile';

const welcomeUserSelector = createSelector(
  [fullNameSelector, avatarSelector, loadingSelector, authSelector],
  (fullName, picture, loading, authKey) => ({
    fullName,
    picture,
    loading,
    authKey,
  }),
);

export default function Header() {
  const [isSignIn, setIsSignIn] = useState(false);
  const [isActiveMessage, setIsActiveMessage] = useState(false);
  const user = useSelector(welcomeUserSelector);
  const deviceWidth = useDeviceWidth();
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => setIsActiveMessage(false), 3000);

    if (isActiveMessage) {
      interval;
    }

    return () => {
      clearInterval(interval);
    };
  }, [isActiveMessage]);

  const handleSignIn = () => setIsSignIn(!isSignIn);
  const handleActiveMessage = () => setIsActiveMessage(false);

  const logOutUser = () => {
    dispatch(logOut());
    setIsActiveMessage(true);
  };

  const renderAuthBlock = () => {
    const options = [
      {
        title: 'Profile',
        icon: <ManIconSvg />,
        link: true,
      },
      {
        title: 'Home',
        icon: <HomeSvg />,
        link: true,
        hide: deviceWidth > 768,
      },
      {
        title: 'Contact',
        icon: <ContactsSvg />,
        link: true,
        hide: deviceWidth > 768,
      },
      {
        title: 'Log out',
        icon: <LogOutIconSvg />,
        link: false,
        onClick: logOutUser,
      },
    ];
    const { fullName, picture, loading, authKey } = user;

    const welcomeUser = (
      <Menu
        label={fullName}
        svg={<DropDownSvg className={st.dropDownSvg} />}
        avatar={picture.thumbnail}
        options={options}
        classNameList={st.dropDownList}
      />
    );

    if (authKey) {
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
      <div className={clsx(st.menu, { [st.menuIsAuth]: !user.authKey })}>
        {user.authKey && deviceWidth > 768 && (
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
      <Message
        prefix={<SuccessSvg className={st.successSvg} />}
        message="Successfully logged out"
        isActive={isActiveMessage}
        handleActiveMessage={handleActiveMessage}
      />
    </header>
  );
}
