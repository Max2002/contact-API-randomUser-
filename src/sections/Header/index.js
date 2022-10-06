import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import clsx from 'clsx';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useDeviceWidth } from '../../hooks/useDeviceWidth';
import { Portal, Menu, Button } from '../../components';
import SignIn from '../SignIn';
import {
  DropDownSvg,
  LoadingSvg,
  LogoSvg,
  ManIconSvg,
  SignInSvg,
  LogOutIconSvg,
  HomeSvg,
  ContactsSvg,
} from '../../assets/icons';
import {
  fullNameSelector,
  avatarSelector,
  loadingSelector,
  authSelector,
} from '../../redux/selectors/getMyProfile';
import { logOut } from '../../redux/actionCreator/getMyProfile';
import st from './styles.module.scss';
import 'react-toastify/dist/ReactToastify.css';

const welcomeUserSelector = createStructuredSelector({
  fullName: fullNameSelector,
  picture: avatarSelector,
  loading: loadingSelector,
  authKey: authSelector,
});

export default function Header() {
  const [isSignIn, setIsSignIn] = useState(false);
  const user = useSelector(welcomeUserSelector);
  const deviceWidth = useDeviceWidth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notify = () =>
    toast.success('Successfully logged out', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const handleSignIn = () => setIsSignIn(!isSignIn);

  const logOutUser = () => {
    localStorage.removeItem('auth');
    dispatch(logOut());
    navigate('/');
    notify();
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
        title: 'Contacts',
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
      />
    );

    if (authKey) {
      return loading ? (
        <div>
          <LoadingSvg />
        </div>
      ) : (
        welcomeUser
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
            <Link to="/" className={st.menuNavItem}>
              Home
            </Link>
            <Link to="../Contacts" className={st.menuNavItem}>
              Contacts
            </Link>
          </ul>
        )}
        {renderAuthBlock()}
      </div>
      <div
        className={clsx(st.blurBlock, { [st.isBlur]: isSignIn })}
        onClick={handleSignIn}
      />
      <Portal>
        {isSignIn && <SignIn notify={notify} onSignIn={handleSignIn} />}
      </Portal>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </header>
  );
}
