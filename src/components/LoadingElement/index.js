import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import st from '../../sections/Profile/styles.module.scss';

export default function LoadingElement({ element, flag, width, height }) {
  return flag ? (
    element
  ) : (
    <Skeleton variant className={st.skeleton} width={width} height={height} />
  );
}

LoadingElement.defaultProps = {
  width: 375,
  height: 15,
  flag: undefined,
};

LoadingElement.propTypes = {
  element: PropTypes.node.isRequired,
  flag: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.number,
  ]),
  width: PropTypes.number,
  height: PropTypes.number,
};
