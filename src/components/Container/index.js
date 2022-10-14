import PropTypes from 'prop-types';
import st from './styles.module.scss';

export default function Container({ children }) {
  return <div className={st.container}>{children}</div>;
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
};
