import PropTypes from 'prop-types';

export default function Image({ src, className }) {
  return <img className={className} src={src} alt={src} />;
}

Image.defaultProps = {
  className: '',
};

Image.propTypes = {
  src: PropTypes.string.isRequired,
  className: PropTypes.string,
};
