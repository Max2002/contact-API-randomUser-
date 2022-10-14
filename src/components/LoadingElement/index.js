import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import st from '../../sections/Profile/styles.module.scss';

export default function LoadingElement({ children, loading, width, height }) {
  return loading ? (
    children
  ) : (
    <Skeleton className={st.skeleton} width={width} height={height} />
  );
}

LoadingElement.defaultProps = {
  width: 375,
  height: 15,
  loading: false,
};

LoadingElement.propTypes = {
  children: PropTypes.node.isRequired,
  loading: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.number,
  ]),
  width: PropTypes.number,
  height: PropTypes.number,
};
