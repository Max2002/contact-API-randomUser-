import PropTypes from 'prop-types';
import clsx from 'clsx';
import st from './styles.module.scss';

export default function Hint({ children, className }) {
  return <div className={clsx(st.hint, className)}>{children}</div>;
}

Hint.defaultProps = {
  className: '',
};

Hint.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
};
