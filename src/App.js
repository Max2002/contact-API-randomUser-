import Header from './sections/Header';
import './assets/styles/general.scss';
import st from './app.module.scss';

export default function App() {
  return (
    <div className={st.wrapperApp}>
      <Header />
    </div>
  );
}
