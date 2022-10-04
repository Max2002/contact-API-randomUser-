import { IconHomeSvg } from '../../assets/icons';
import st from './styles.module.scss';

export default function Home() {
  return (
    <main className={st.main}>
      <div className={st.blockSvg}>
        <IconHomeSvg alt="React logo" />
      </div>
    </main>
  );
}
