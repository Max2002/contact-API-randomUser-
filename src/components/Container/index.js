import PropTypes from 'prop-types';
import clsx from 'clsx';
import st from './styles.module.scss';

export default function Container({ children, className }) {
  return <div className={clsx(st.container, className)}>{children}</div>;
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired,
};
