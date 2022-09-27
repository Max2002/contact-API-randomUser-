import PropTypes from 'prop-types';

export default function Button({ type, className, children, onClick }) {
  return (
    <button className={className} type={type} onClick={onClick}>
      {children}
    </button>
  );
}

Button.defaultProps = {
  className: '',
};

Button.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.array.isRequired,
  onClick: PropTypes.func,
};
