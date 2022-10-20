import PropTypes from 'prop-types';
import { Button as ButtonRB } from 'react-bootstrap';

export default function Button(props) {
  const { type, className, children, onClick, disabled } = props;

  return (
    <ButtonRB
      className={className}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </ButtonRB>
  );
}

Button.defaultProps = {
  className: '',
  disabled: false,
};

Button.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};
