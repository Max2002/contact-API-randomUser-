import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import clsx from 'clsx';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useDeviceWidth } from '../../hooks/useDeviceWidth';
import { Portal, Menu, Button } from '../../components';
import SignIn from '../SignIn';
import { HOME, CONTACTS, PROFILE } from '../../constans/routes';
import {
  LogoSvg,
  ManIconSvg,
  SignInSvg,
  LogOutSvg,
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

const welcomeUserSelector = createStructuredSelector({
  fullName: fullNameSelector,
  picture: avatarSelector,
  loading: loadingSelector,
  authKey: authSelector,
});

export default function Header() {
  const [isActiveModal, setIsActiveModal] = useState(false);
  const user = useSelector(welcomeUserSelector);
  const deviceWidth = useDeviceWidth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { fullName, picture, loading, authKey } = user;

  const notify = () => toast.success('Successfully logged out');

  const handleSignIn = () => setIsActiveModal(!isActiveModal);

  const logOutUser = () => {
    localStorage.removeItem('auth');
    dispatch(logOut());
    navigate(HOME);
    notify();
  };

  const options = [
    {
      title: 'Profile',
      icon: <ManIconSvg />,
      link: PROFILE,
    },
    {
      title: 'Home',
      icon: <HomeSvg />,
      link: HOME,
      hide: deviceWidth > 768,
    },
    {
      title: 'Contacts',
      icon: <ContactsSvg />,
      link: CONTACTS,
      hide: deviceWidth > 768,
    },
    {
      title: 'Log out',
      icon: <LogOutSvg />,
      onClick: logOutUser,
    },
  ];

  return (
    <header className={st.header}>
      <div className={clsx('container', st.containerHeader)}>
        <LogoSvg />
        <div className={clsx(st.menu, { [st.menuIsAuth]: !authKey })}>
          {authKey && deviceWidth > 768 && (
            <ul className={st.menuNav}>
              <Link to={HOME} className={st.menuNavItem}>
                Home
              </Link>
              <Link to={CONTACTS} className={st.menuNavItem}>
                Contacts
              </Link>
            </ul>
          )}
          {authKey ? (
            <Menu
              label={fullName}
              avatar={picture.thumbnail}
              loading={loading}
              options={options}
            />
          ) : (
            <Button
              type="button"
              className={st.signInBtn}
              onClick={handleSignIn}
            >
              <SignInSvg />
              <span>Sign In</span>
            </Button>
          )}
        </div>
        <div
          className={clsx(st.blurBlock, { [st.isBlur]: isActiveModal })}
          onClick={handleSignIn}
        />
        <Portal>
          {isActiveModal && <SignIn notify={notify} onSignIn={handleSignIn} />}
        </Portal>
      </div>
    </header>
  );
}
