import PropTypes from 'prop-types';
import st from './styles.module.scss';

export default function Hint({ children, label }) {
  return (
    <div className={st.hoverElement}>
      <div className={st.hint}>{label}</div>
      <span>{children}</span>
    </div>
  );
}

Hint.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
