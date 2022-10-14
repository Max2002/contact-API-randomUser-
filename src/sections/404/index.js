import { Link } from 'react-router-dom';
import { HOME } from '../../constans/routes';
import st from './styles.module.scss';

export default function Page404() {
  return (
    <main className={st.page404}>
      <div className={st.code}>404</div>
      <div className={st.message}>Requested page not found!</div>
      <Link to={HOME} className={st.back}>
        Back to home
      </Link>
    </main>
  );
}
