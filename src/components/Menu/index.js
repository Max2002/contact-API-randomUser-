import PropTypes from 'prop-types';
import {
  ContactsSvg,
  HomeSvg,
  LogOutIconSvg,
  ManIconSvg,
} from '../../assets/icons';
import st from './styles.module.scss';

export default function Menu(props) {
  const { windowWidth, logOutUser } = props;

  return (
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
  );
}

Menu.propTypes = {
  windowWidth: PropTypes.number.isRequired,
  logOutUser: PropTypes.func.isRequired,
};
