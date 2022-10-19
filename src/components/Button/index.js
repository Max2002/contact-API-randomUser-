import PropTypes from 'prop-types';
import { Button as ButtonRB } from 'react-bootstrap';

export default function Button({ type, className, children, onClick }) {
  return (
    <ButtonRB className={className} type={type} onClick={onClick}>
      {children}
    </ButtonRB>
  );
}

Button.defaultProps = {
  className: '',
};

Button.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  onClick: PropTypes.func,
};
