import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import st from './styles.module.scss';

export default function Page404({ link }) {
  return (
    <main className={st.page404}>
      <div className={st.code}>404</div>
      <div className={st.message}>Requested page not found!</div>
      <Link to={link} className={st.back}>
        Back to {link === '/' ? 'home' : 'profile'}
      </Link>
    </main>
  );
}

Page404.propTypes = {
  link: PropTypes.string.isRequired,
};
