import PropTypes from 'prop-types';
import {
  ContactsSvg,
  DropDownSvg,
  HomeSvg,
  LoadingSvg,
  LogOutIconSvg,
  ManIconSvg,
  SignInSvg,
} from '../../assets/icons';
import { Button } from '../index';
import st from './styles.module.scss';

export default function Menu(props) {
  const { user, isAuth, windowWidth, logOutUser, handleSignIn } = props;

  if (isAuth) {
    const { fullName, large, status } = user;
    const welcomeUser = (
      <>
        <p className={st.greeting}>Hello! {fullName.fullName}</p>
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
        {status === 'loading' ? <LoadingSvg /> : welcomeUser}
      </div>
    );
  }

  return (
    <Button type="button" className={st.signInBtn} onClick={handleSignIn}>
      <SignInSvg />
      <span>Sign In</span>
    </Button>
  );
}

Menu.propTypes = {
  user: PropTypes.shape({
    fullName: PropTypes.shape({
      fullName: PropTypes.string.isRequired,
    }).isRequired,
    large: PropTypes.string.isRequired,
  }).isRequired,
  isAuth: PropTypes.bool.isRequired,
  windowWidth: PropTypes.number.isRequired,
  logOutUser: PropTypes.func.isRequired,
  handleSignIn: PropTypes.func.isRequired,
};
