import Header from './sections/Header';
import './assets/styles/general.scss';
import Footer from './sections/Footer';
import Home from './sections/Home';
import st from './app.module.scss';

export default function App() {
  return (
    <div className={st.wrapperApp}>
      <Header />
      <Home />
      <Footer />
    </div>
  );
}
