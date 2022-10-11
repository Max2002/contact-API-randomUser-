import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default function Portal({ children }) {
  const nodeForPortal = document.getElementById('portals');

  return ReactDOM.createPortal(children, nodeForPortal);
}

Portal.propTypes = {
  children: PropTypes.node.isRequired,
};
