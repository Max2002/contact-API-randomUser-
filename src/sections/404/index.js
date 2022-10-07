import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import st from './styles.module.scss';

export default function Page404() {
  const navigate = useNavigate();

  const backHome = () => navigate('/');

  return (
    <div className={st.page404}>
      <div className={st.code}>404</div>
      <div className={st.message}>Requested page not found!</div>
      <div>
        <Button type="button" className={st.back} onClick={backHome}>
          Back to home
        </Button>
      </div>
    </div>
  );
}
